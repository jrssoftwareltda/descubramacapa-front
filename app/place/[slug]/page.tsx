"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import {
  Camera,
  Clock3,
  MapPin,
  Phone,
  Wallet,
  MessageCircle,
  Globe,
} from "lucide-react";
import { Header } from "@/components/internal/Header";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { FriendlyErrorState } from "@/components/FriendlyErrorState";
import {
  DetailsCategoryTabs,
  DetailsHero,
  DetailsInfoBar,
  DetailsPrimaryActions,
  DetailsTagChips,
  DetailsRecommendationRow,
} from "@/components/details";
import { PlacePhotoGallery } from "@/components/details/PlacePhotoGallery";
import { placeDetailsService } from "@/services/placeDetailsService";
import {
  DetailsCategoryItem,
  DetailsPlaceRecommendation,
  DetailsTagItem,
  PlaceCardResponse,
  PlaceDetailsResponse,
} from "@/types/types";

type TabKey = "pratos" | "ambiente" | "vista" | "instagram";

function buildSubtitle(place?: PlaceDetailsResponse | null) {
  if (!place) return "";

  const primaryCategory = place.categories?.[0]?.name;
  const location = [place.neighborhood, place.city].filter(Boolean).join(", ");

  if (primaryCategory && location) return `${primaryCategory} • ${location}`;
  if (primaryCategory) return primaryCategory;
  if (location) return location;

  return "";
}

function buildCategoryItems(activeTab: TabKey): DetailsCategoryItem[] {
  return [
    { id: 1, label: "Pratos", icon: "dish", active: activeTab === "pratos" },
    {
      id: 2,
      label: "Ambiente",
      icon: "chair",
      active: activeTab === "ambiente",
    },
    { id: 3, label: "Vista", icon: "sunset", active: activeTab === "vista" },
    {
      id: 4,
      label: "Instagram",
      icon: "camera",
      active: activeTab === "instagram",
    },
  ];
}

function buildTabDescription(place: PlaceDetailsResponse | null, tab: TabKey) {
  if (!place) return "";

  switch (tab) {
    case "pratos":
      return (
        place.editorialSummary?.trim() ||
        place.shortDescription?.trim() ||
        "Descubra os pratos deste lugar."
      );

    case "ambiente":
      return "Conheça o ambiente e a experiência do local.";

    case "vista":
      return "Veja o que torna a vista especial.";

    case "instagram":
      return "Descubra os melhores registros deste lugar.";
  }
}

function buildTagItems(
  place: PlaceDetailsResponse | null,
  tab: TabKey
): DetailsTagItem[] {
  if (!place?.tags?.length) return [];

  const filtered =
    tab === "pratos"
      ? place.tags.filter((t) => ["dish", "drink"].includes(t.type ?? ""))
      : tab === "ambiente"
      ? place.tags.filter((t) => t.type === "environment")
      : tab === "vista"
      ? place.tags.filter((t) => t.type === "view")
      : place.tags;

  if (!filtered.length) return [];

  return [
    { id: 1, label: "Destaques:", icon: "flame", highlight: true },
    ...filtered.slice(0, 4).map((tag, i) => ({
      id: i + 2,
      label: tag.name,
      icon: "plate" as const,
    })),
  ];
}

function formatTodayOpeningHours(place?: PlaceDetailsResponse | null) {
  if (!place?.openingHours?.length) return "Horários indisponíveis";

  const today = new Date().getDay();

  const todayHour = place.openingHours.find(
    (item) => item.dayOfWeek === today && !item.isClosed
  );

  if (todayHour?.openTime && todayHour?.closeTime) {
    return `${todayHour.openTime.slice(0, 5)} - ${todayHour.closeTime.slice(0, 5)}`;
  }

  const firstOpen = place.openingHours.find(
    (item) => !item.isClosed && item.openTime && item.closeTime
  );

  if (firstOpen?.openTime && firstOpen?.closeTime) {
    return `${firstOpen.openTime.slice(0, 5)} - ${firstOpen.closeTime.slice(0, 5)}`;
  }

  return "Horários indisponíveis";
}

function mapToRecommendation(
  item: PlaceCardResponse
): DetailsPlaceRecommendation {
  return {
    id: item.id,
    slug: item.slug,
    title: item.name,
    subtitle: item.subtitle,
    distance: item.distanceLabel || "",
    price: item.priceLabel || "",
    image:
      item.primaryImageUrl ||
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1400&auto=format&fit=crop",
  };
}

function normalizeInstagramUrl(handle?: string | null) {
  if (!handle) return null;

  const value = handle.trim();
  if (!value) return null;

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  const cleanHandle = value.replace(/^@/, "");
  return `https://instagram.com/${cleanHandle}`;
}

function normalizeWebsiteUrl(url?: string | null) {
  if (!url) return null;

  const value = url.trim();
  if (!value) return null;

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  return `https://${value}`;
}

function normalizeWhatsAppUrl(phone?: string | null) {
  if (!phone) return null;

  const digits = phone.replace(/\D/g, "");
  if (!digits) return null;

  return `https://wa.me/${digits}`;
}

export default function EstablishmentDetailsPage() {
  const params = useParams<{ slug: string }>();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;

  const [place, setPlace] = useState<PlaceDetailsResponse | null>(null);
  const [relatedPlaces, setRelatedPlaces] = useState<
    DetailsPlaceRecommendation[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [placeError, setPlaceError] = useState<string | null>(null);
  const [relatedError, setRelatedError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("pratos");

  const resetDetailsState = useCallback(() => {
    setPlace(null);
    setRelatedPlaces([]);
    setActiveTab("pratos");
  }, []);

  const loadPlaceDetails = useCallback(async () => {
    if (!slug) {
      setPlaceError("Identificador do lugar não informado.");
      resetDetailsState();
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setPlaceError(null);
      setRelatedError(null);

      const [placeResponse, relatedResponse] = await Promise.all([
        placeDetailsService.getPlaceBySlug(slug),
        placeDetailsService.getRelatedPlaces(slug, 4),
      ]);

      setPlace(placeResponse);
      setRelatedPlaces(relatedResponse.map(mapToRecommendation));
      setActiveTab("pratos");
    } catch (error) {
      console.error("Erro ao carregar detalhes do place:", error);
      setPlaceError(
        "Não foi possível carregar os detalhes deste lugar no momento."
      );
      resetDetailsState();
    } finally {
      setLoading(false);
    }
  }, [slug, resetDetailsState]);

  const loadRelatedPlaces = useCallback(async () => {
    if (!slug || !place) return;

    try {
      setRelatedError(null);

      const relatedResponse = await placeDetailsService.getRelatedPlaces(slug, 4);
      setRelatedPlaces(relatedResponse.map(mapToRecommendation));
    } catch (error) {
      console.error("Erro ao carregar relacionados:", error);
      setRelatedError("Não foi possível carregar os lugares relacionados.");
      setRelatedPlaces([]);
    }
  }, [slug, place]);

  useEffect(() => {
    loadPlaceDetails();
  }, [loadPlaceDetails]);

  const categoryItems = useMemo(
    () => buildCategoryItems(activeTab),
    [activeTab]
  );

  const tagItems = useMemo(
    () => buildTagItems(place, activeTab),
    [place, activeTab]
  );

  const photoGalleryItems = useMemo(
    () =>
      (place?.photos ?? []).map((photo, index) => ({
        id: index + 1,
        url: photo.imageUrl,
      })),
    [place]
  );

  const backgroundImage =
    place?.photos?.find((photo) => photo.isPrimary)?.imageUrl ||
    place?.photos?.[0]?.imageUrl ||
    "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2200&auto=format&fit=crop";

  const subtitle = buildSubtitle(place);
  const description = buildTabDescription(place, activeTab);
  const openingHoursLabel = formatTodayOpeningHours(place);

  const whatsappUrl = normalizeWhatsAppUrl(place?.whatsappNumber);
  const instagramUrl = normalizeInstagramUrl(place?.instagramHandle);
  const websiteUrl = normalizeWebsiteUrl(place?.websiteUrl);

  if (loading) {
    return (
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_22%),linear-gradient(180deg,#020617_0%,#081225_30%,#07101d_100%)] text-white">
        <Header />
        <section className="px-4 pb-8 pt-4 md:px-8">
          <div className="mx-auto max-w-7xl space-y-8">
            <div className="h-[540px] animate-pulse rounded-[32px] border border-white/10 bg-white/10" />
            <div className="h-16 animate-pulse rounded-[24px] bg-white/10" />
            <div className="h-48 animate-pulse rounded-[24px] bg-white/10" />
            <div className="grid gap-4 md:grid-cols-3">
              <div className="h-72 animate-pulse rounded-[24px] bg-white/10 md:col-span-2" />
              <div className="grid gap-4">
                <div className="h-32 animate-pulse rounded-[24px] bg-white/10" />
                <div className="h-32 animate-pulse rounded-[24px] bg-white/10" />
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  if (placeError || !place) {
    return (
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_22%),linear-gradient(180deg,#020617_0%,#081225_30%,#07101d_100%)] text-white">
        <Header />
        <section className="px-4 pb-16 pt-8 md:px-8">
          <div className="mx-auto max-w-4xl">
            <FriendlyErrorState
              title="Não foi possível carregar este lugar"
              message={
                placeError ||
                "Houve um problema ao buscar os detalhes deste estabelecimento."
              }
              details="Os dados da página foram resetados para evitar informações confusas na tela."
              onAction={loadPlaceDetails}
              actionLabel="Tentar novamente"
            />
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_22%),linear-gradient(180deg,#020617_0%,#081225_30%,#07101d_100%)] text-white">
      <Header />

      <DetailsHero
        title={place.name}
        subtitle={subtitle}
        price={place.priceLabel || "—"}
        status={place.statusLabel || "Status indisponível"}
        backgroundImage={backgroundImage}
      >
        <DetailsPrimaryActions
          actions={[
            ...(whatsappUrl
              ? [
                  {
                    label: "WhatsApp",
                    icon: <MessageCircle className="h-5 w-5" />,
                    href: whatsappUrl,
                  },
                ]
              : []),
            ...(instagramUrl
              ? [
                  {
                    label: "Instagram",
                    icon: <Camera className="h-5 w-5" />,
                    href: instagramUrl,
                  },
                ]
              : []),
            ...(websiteUrl
              ? [
                  {
                    label: "Site",
                    icon: <Globe className="h-5 w-5" />,
                    href: websiteUrl,
                  },
                ]
              : []),
          ]}
        />
      </DetailsHero>

      <section className="px-4 pb-8 md:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <DetailsCategoryTabs
            items={categoryItems}
            onSelect={(item) => {
              if (item.id === 1) setActiveTab("pratos");
              if (item.id === 2) setActiveTab("ambiente");
              if (item.id === 3) setActiveTab("vista");
              if (item.id === 4) setActiveTab("instagram");
            }}
          />

          <div className="max-w-4xl space-y-5">
            <p className="text-2xl leading-10 text-slate-200 md:text-3xl md:leading-[3.25rem]">
              {description}
            </p>

            {tagItems.length > 0 && <DetailsTagChips items={tagItems} />}
          </div>

          {photoGalleryItems.length > 0 && (
            <div>
              <SectionHeader title="Fotos do estabelecimento" />
              <PlacePhotoGallery photos={photoGalleryItems} />
            </div>
          )}

          <DetailsInfoBar
            items={[
              {
                label:
                  place.neighborhood ||
                  place.formattedAddress ||
                  place.city ||
                  "Endereço indisponível",
                icon: <MapPin className="h-5 w-5" />,
              },
              {
                label: openingHoursLabel,
                icon: <Clock3 className="h-5 w-5" />,
              },
              {
                label: place.priceLabel || "—",
                icon: <Wallet className="h-5 w-5" />,
              },
              {
                label:
                  place.nationalPhoneNumber ||
                  place.internationalPhoneNumber ||
                  place.whatsappNumber ||
                  "Contato indisponível",
                icon: <Phone className="h-5 w-5" />,
              },
            ]}
          />

          {relatedPlaces.length > 0 ? (
            <div>
              <SectionHeader title="Relacionados" />
              <DetailsRecommendationRow items={relatedPlaces} />
            </div>
          ) : relatedError ? (
            <FriendlyErrorState
              compact
              title="Erro ao carregar relacionados"
              message={relatedError}
              onAction={loadRelatedPlaces}
              actionLabel="Tentar novamente"
            />
          ) : null}
        </div>
      </section>

      <Footer />
    </main>
  );
}