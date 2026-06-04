"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Clock3,
  MapPin,
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Check,
  ChevronDown,
  X,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { TrendingGrid } from "@/components/TrendingGrid";
import { RecommendedRow } from "@/components/RecommendedRow";
import { Footer } from "@/components/Footer";
import { FriendlyErrorState } from "@/components/FriendlyErrorState";
import { PlaceBadgeResponse, PlaceCardResponse, RecommendedShowcase, TrendingPlace } from "@/types/types";
import { placeSearchService } from "@/services/placeSearchService";
import { placeStatsService } from "@/services/placeStatsService";

const PAGE_SIZE = 6;

const SHOWCASE_CONFIG: Array<{
  key: string;
  title: string;
  icon: RecommendedShowcase["icon"];
}> = [
  { key: "environment", title: "Ambiente", icon: "camera" },
  { key: "dish", title: "Pratos", icon: "chef" },
  { key: "drinks-seaside", title: "Drinks à Beira-Mar", icon: "drink" },
  { key: "sushi", title: "Sushi Puro", icon: "fish" },
];

const CATEGORY_OPTIONS = [
  { label: "Todos", value: undefined },
  { label: "Restaurantes", value: "restaurant" },
  { label: "Bares", value: "bar" },
  { label: "Cafés", value: "cafe" },
  { label: "Beach Clubs", value: "beach-club" },
] as const;

const PRICE_OPTIONS = [
  { label: "Todos", value: undefined },
  { label: "R$", value: 1 },
  { label: "R$$", value: 2 },
  { label: "R$$$", value: 3 },
  { label: "R$$$$", value: 4 },
] as const;

const ADVANCED_FILTERS = {
  environments: [
    { label: "Família", value: "familia" },
    { label: "Romântico", value: "romantico" },
    { label: "Aconchegante", value: "aconchegante" },
    { label: "Ao ar livre", value: "ao-ar-livre" },
    { label: "Agitado", value: "agitado" },
  ],
  views: [
    { label: "Vista para o mar", value: "vista-mar" },
    { label: "Pôr do sol", value: "por-do-sol" },
    { label: "Beira-mar", value: "beira-mar" },
  ],
  specialties: [
    { label: "Frutos do mar", value: "frutos-do-mar" },
    { label: "Hambúrguer", value: "hamburguer" },
    { label: "Massas", value: "massas" },
    { label: "Sushi", value: "sushi" },
    { label: "Petiscos", value: "petiscos" },
    { label: "Drinks", value: "drinks" },
  ],
  regions: [
    { label: "Centro", value: "centro" },
    { label: "Santo Antônio", value: "santo-antonio" },
    { label: "Jurerê", value: "jurere" },
    { label: "Ribeirão", value: "ribeirao" },
    { label: "Lagoa", value: "lagoa" },
  ],
} as const;

type AdvancedFiltersState = {
  environmentSlugs: string[];
  viewSlugs: string[];
  specialtySlugs: string[];
  regionSlugs: string[];
  openNow: boolean;
};

const INITIAL_ADVANCED_FILTERS: AdvancedFiltersState = {
  environmentSlugs: [],
  viewSlugs: [],
  specialtySlugs: [],
  regionSlugs: [],
  openNow: false,
};

function buildAdvancedTagSlugs(filters: AdvancedFiltersState): string[] {
  return [
    ...filters.environmentSlugs,
    ...filters.viewSlugs,
    ...filters.specialtySlugs,
  ];
}

function mapBadgeToneFromType(type?: string): "warm" | "gold" | "blue" {
  switch (type) {
    case "commercial":
      return "warm";
    case "category":
      return "blue";
    case "experience":
      return "gold";
    case "status":
      return "blue";
    default:
      return "warm";
  }
}

function findPrimaryBadge(
  badges?: PlaceBadgeResponse[]
): PlaceBadgeResponse | undefined {
  if (!badges?.length) return undefined;

  return (
    badges.find((badge) => badge.type === "commercial") ||
    badges.find((badge) => badge.type === "category") ||
    badges[0]
  );
}

function mapToTrending(place: PlaceCardResponse): TrendingPlace {
  const primaryBadge = findPrimaryBadge(place.badges);

  return {
    id: place.id,
    slug: place.slug,
    title: place.name,
    subtitle: place.subtitle,
    image: place.primaryImageUrl,
    badge: primaryBadge?.label,
    badgeTone: mapBadgeToneFromType(primaryBadge?.type),
    rating: 0,
    reviews: 0,
    distance: place.distanceLabel || "",
    price: place.priceLabel,
    badges: place.badges ?? [],
  };
}

function mapToRecommendedShowcase(
  key: string,
  title: string,
  icon: RecommendedShowcase["icon"],
  places: PlaceCardResponse[]
): RecommendedShowcase {
  return {
    key,
    title,
    icon,
    places: places.map((place) => ({
      id: place.id,
      slug: place.slug,
      name: place.name,
      subtitle: place.subtitle,
      primaryImageUrl: place.primaryImageUrl,
      priceLabel: place.priceLabel,
    })),
  };
}

function formatDate(date?: string | null) {
  if (!date) return "—";

  const d = new Date(date);

  if (Number.isNaN(d.getTime())) {
    return "—";
  }

  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function FilterChip({
  label,
  icon,
  onClick,
  active = false,
  rightIcon,
}: {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  rightIcon?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium backdrop-blur-md transition ${
        active
          ? "border-sky-400/40 bg-sky-400/10 text-white"
          : "border-white/10 bg-white/10 text-white/90 hover:bg-white/15"
      }`}
    >
      {icon}
      <span>{label}</span>
      {rightIcon}
    </button>
  );
}

function FilterDropdown({
  label,
  icon,
  options,
  selectedValue,
  onSelect,
}: {
  label: string;
  icon?: React.ReactNode;
  options: readonly { label: string; value: string | number | undefined }[];
  selectedValue: string | number | undefined;
  onSelect: (value: string | number | undefined) => void;
}) {
  const [open, setOpen] = useState(false);

  const selectedOption =
    options.find((option) => option.value === selectedValue) ?? options[0];

  return (
    <div className="relative overflow-visible">
      <FilterChip
        label={`${label}: ${selectedOption.label}`}
        icon={icon}
        active={open}
        onClick={() => setOpen((prev) => !prev)}
        rightIcon={
          <ChevronDown
            className={`h-4 w-4 transition duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        }
      />

      <div
        className={`absolute left-0 top-[calc(100%+10px)] z-[999] min-w-[240px] overflow-hidden rounded-2xl border border-white/10 bg-slate-950/95 shadow-2xl backdrop-blur-xl transition-all duration-200 ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        <div className="p-2">
          {options.map((option) => {
            const selected = option.value === selectedValue;

            return (
              <button
                key={`${label}-${String(option.value)}`}
                type="button"
                onClick={() => {
                  onSelect(option.value);
                  setOpen(false);
                }}
                className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-4 py-3 text-left text-sm transition ${
                  selected
                    ? "bg-sky-400/15 text-sky-200"
                    : "text-white/90 hover:bg-white/10"
                }`}
              >
                <span>{option.label}</span>
                {selected && <Check className="h-4 w-4" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function FilterSection({
  title,
  options,
  selectedValues,
  onToggle,
}: {
  title: string;
  options: readonly { label: string; value: string }[];
  selectedValues: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-white/90">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = selectedValues.includes(option.value);

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onToggle(option.value)}
              className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition ${
                selected
                  ? "border-sky-400/40 bg-sky-400/15 text-sky-200"
                  : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function AdvancedFiltersPanel({
  open,
  value,
  onChange,
  onClose,
  onClear,
}: {
  open: boolean;
  value: AdvancedFiltersState;
  onChange: (next: AdvancedFiltersState) => void;
  onClose: () => void;
  onClear: () => void;
}) {
  if (!open) return null;

  const toggleValue = (
    key:
      | "environmentSlugs"
      | "viewSlugs"
      | "specialtySlugs"
      | "regionSlugs",
    item: string
  ) => {
    const current = value[key];
    const exists = current.includes(item);

    onChange({
      ...value,
      [key]: exists
        ? current.filter((v) => v !== item)
        : [...current, item],
    });
  };

  return (
    <div className="absolute left-0 top-[calc(100%+12px)] z-[999] w-full rounded-[28px] border border-white/10 bg-slate-950/95 p-6 shadow-2xl backdrop-blur-xl">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">Filtros avançados</h3>
          <p className="text-sm text-white/60">
            Refine sua busca de forma rápida
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <FilterSection
          title="Ambiente"
          options={ADVANCED_FILTERS.environments}
          selectedValues={value.environmentSlugs}
          onToggle={(item) => toggleValue("environmentSlugs", item)}
        />

        <FilterSection
          title="Vista"
          options={ADVANCED_FILTERS.views}
          selectedValues={value.viewSlugs}
          onToggle={(item) => toggleValue("viewSlugs", item)}
        />

        <FilterSection
          title="Especialidade"
          options={ADVANCED_FILTERS.specialties}
          selectedValues={value.specialtySlugs}
          onToggle={(item) => toggleValue("specialtySlugs", item)}
        />

        <FilterSection
          title="Região"
          options={ADVANCED_FILTERS.regions}
          selectedValues={value.regionSlugs}
          onToggle={(item) => toggleValue("regionSlugs", item)}
        />
      </div>

      <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 md:flex-row md:items-center md:justify-between">
        <label className="flex items-center gap-3 text-sm text-white/90">
          <input
            type="checkbox"
            checked={value.openNow}
            onChange={(e) =>
              onChange({ ...value, openNow: e.target.checked })
            }
            className="h-4 w-4 rounded border-white/20 bg-transparent"
          />
          Apenas lugares abertos agora
        </label>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClear}
            className="cursor-pointer rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:bg-white/10"
          >
            Limpar
          </button>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-sky-400"
          >
            Aplicar
          </button>
        </div>
      </div>
    </div>
  );
}

function FiltersBar({
  selectedCategory,
  selectedPrice,
  advancedFilters,
  onCategoryChange,
  onPriceChange,
  onAdvancedFiltersChange,
}: {
  selectedCategory: string | undefined;
  selectedPrice: number | undefined;
  advancedFilters: AdvancedFiltersState;
  onCategoryChange: (value: string | undefined) => void;
  onPriceChange: (value: number | undefined) => void;
  onAdvancedFiltersChange: (value: AdvancedFiltersState) => void;
}) {
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const advancedCount =
    advancedFilters.environmentSlugs.length +
    advancedFilters.viewSlugs.length +
    advancedFilters.specialtySlugs.length +
    advancedFilters.regionSlugs.length +
    (advancedFilters.openNow ? 1 : 0);

  return (
    <div className="relative overflow-visible">
      <div className="relative z-20 flex flex-wrap items-center gap-3 rounded-[24px] border border-white/10 bg-slate-950/45 p-4 shadow-xl backdrop-blur-xl">
        <FilterChip
          label="Florianópolis"
          icon={<MapPin className="h-4 w-4 text-sky-400" />}
        />

        <FilterDropdown
          label="Tipo"
          options={CATEGORY_OPTIONS}
          selectedValue={selectedCategory}
          onSelect={(value) => onCategoryChange(value as string | undefined)}
        />

        <FilterDropdown
          label="Preço"
          icon={<Search className="h-4 w-4 text-slate-400" />}
          options={PRICE_OPTIONS}
          selectedValue={selectedPrice}
          onSelect={(value) => onPriceChange(value as number | undefined)}
        />

        <FilterChip
          label={
            advancedCount > 0
              ? `Filtros avançados (${advancedCount})`
              : "Filtros avançados"
          }
          icon={<SlidersHorizontal className="h-4 w-4 text-slate-300" />}
          active={advancedOpen}
          onClick={() => setAdvancedOpen((prev) => !prev)}
        />
      </div>

      <AdvancedFiltersPanel
        open={advancedOpen}
        value={advancedFilters}
        onChange={onAdvancedFiltersChange}
        onClose={() => setAdvancedOpen(false)}
        onClear={() => onAdvancedFiltersChange(INITIAL_ADVANCED_FILTERS)}
      />
    </div>
  );
}

function HeroMeta({ latestCreatedAt }: { latestCreatedAt?: string | null }) {
  return (
    <div className="flex flex-wrap items-center gap-6 text-sm text-slate-200/80 md:text-base">
      <div className="flex items-center gap-2">
        <Clock3 className="h-4 w-4 text-emerald-400" />
        Última atualização: {formatDate(latestCreatedAt)}
      </div>
    </div>
  );
}

function TrendingGridSkeleton() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-[24px] border border-white/10 bg-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl"
        >
          <div className="h-56 animate-pulse bg-white/10" />
          <div className="space-y-3 p-5">
            <div className="h-6 w-32 animate-pulse rounded-full bg-white/10" />
            <div className="h-4 w-24 animate-pulse rounded-full bg-white/10" />
            <div className="flex gap-2 pt-2">
              <div className="h-4 w-16 animate-pulse rounded-full bg-white/10" />
              <div className="h-4 w-14 animate-pulse rounded-full bg-white/10" />
              <div className="h-4 w-20 animate-pulse rounded-full bg-white/10" />
            </div>
            <div className="h-6 w-12 animate-pulse rounded-full bg-white/10" />
          </div>
        </div>
      ))}
    </div>
  );
}

function RecommendedRowSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-[24px] border border-white/10 bg-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl"
        >
          <div className="h-52 animate-pulse bg-white/10" />
        </div>
      ))}
    </div>
  );
}

export default function FoodFloripaHomePage() {
  const [trendingPlaces, setTrendingPlaces] = useState<TrendingPlace[]>([]);
  const [recommendedShowcases, setRecommendedShowcases] = useState<
    RecommendedShowcase[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [loadingShowcases, setLoadingShowcases] = useState(true);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFiltersState>(
    INITIAL_ADVANCED_FILTERS
  );
  const [activePlacesCount, setActivePlacesCount] = useState<number | null>(
    null
  );
  const [latestCreatedAt, setLatestCreatedAt] = useState<string | null>(null);
  const [placesError, setPlacesError] = useState<string | null>(null);
  const [showcasesError, setShowcasesError] = useState<string | null>(null);
  const [statsError, setStatsError] = useState<string | null>(null);

  const resetPlacesState = useCallback(() => {
    setTrendingPlaces([]);
    setPage(0);
    setHasMore(true);
  }, []);

  const resetShowcasesState = useCallback(() => {
    setRecommendedShowcases([]);
  }, []);

  const resetFilterState = useCallback(() => {
    setSelectedCategory(undefined);
    setSelectedPrice(undefined);
    setAdvancedFilters(INITIAL_ADVANCED_FILTERS);
  }, []);

  const activeFilterLabel = useMemo(() => {
    const categoryLabel =
      CATEGORY_OPTIONS.find((item) => item.value === selectedCategory)?.label ??
      "Todos";

    const priceLabel =
      PRICE_OPTIONS.find((item) => item.value === selectedPrice)?.label ??
      "Todos";

    const advancedCount =
      advancedFilters.environmentSlugs.length +
      advancedFilters.viewSlugs.length +
      advancedFilters.specialtySlugs.length +
      advancedFilters.regionSlugs.length +
      (advancedFilters.openNow ? 1 : 0);

    return { categoryLabel, priceLabel, advancedCount };
  }, [selectedCategory, selectedPrice, advancedFilters]);

  const loadPlaces = useCallback(
    async (targetPage: number) => {
      try {
        setLoading(true);
        setPlacesError(null);

        const res = await placeSearchService.searchCards({
          query: query.trim() || undefined,
          city: "Florianópolis",
          page: targetPage,
          size: PAGE_SIZE,
          categorySlugs: selectedCategory ? [selectedCategory] : undefined,
          priceLevel: selectedPrice,
          tagSlugs: buildAdvancedTagSlugs(advancedFilters),
          openNow: advancedFilters.openNow,
          neighborhoodSlugs:
            advancedFilters.regionSlugs.length > 0
              ? advancedFilters.regionSlugs
              : undefined,
        });

        setTrendingPlaces(res.content.map(mapToTrending));
        setPage(targetPage);
        setHasMore(!res.last);
      } catch (err) {
        console.error("Erro ao buscar lugares:", err);
        setPlacesError("Não conseguimos carregar os lugares agora.");
        setTrendingPlaces([]);
        setPage(0);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    },
    [query, selectedCategory, selectedPrice, advancedFilters]
  );

  const loadShowcases = useCallback(async () => {
    try {
      setLoadingShowcases(true);
      setShowcasesError(null);

      const responses = await Promise.all(
        SHOWCASE_CONFIG.map(async (showcase) => {
          const places = await placeSearchService.searchShowcasePlaces({
            key: showcase.key,
            city: "Florianópolis",
            limit: 4,
          });

          return mapToRecommendedShowcase(
            showcase.key,
            showcase.title,
            showcase.icon,
            places
          );
        })
      );

      setRecommendedShowcases(
        responses.filter((showcase: { places: string | unknown[]; }) => showcase.places.length > 0)
      );
    } catch (err) {
      console.error("Erro ao buscar vitrines recomendadas:", err);
      setShowcasesError("Não conseguimos carregar as recomendações agora.");
      setRecommendedShowcases([]);
    } finally {
      setLoadingShowcases(false);
    }
  }, []);

  const loadStats = useCallback(async () => {
    try {
      setStatsError(null);

      const [countRes, latestRes] = await Promise.all([
        placeStatsService.getActivePlacesCount(),
        placeStatsService.getLatestCreatedAt(),
      ]);

      setActivePlacesCount(countRes.activePlacesCount);
      setLatestCreatedAt(latestRes.latestCreatedAt);
    } catch (err) {
      console.error("Erro ao carregar stats:", err);
      setStatsError(
        "Algumas informações da página estão temporariamente indisponíveis."
      );
      setActivePlacesCount(null);
      setLatestCreatedAt(null);
    }
  }, []);

  useEffect(() => {
    loadPlaces(0);
  }, [loadPlaces]);

  useEffect(() => {
    loadShowcases();
  }, [loadShowcases]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  const handleSearch = useCallback((value: string) => {
    setPage(0);
    setHasMore(true);
    setQuery(value);
  }, []);

  const handleCategoryChange = useCallback((value: string | undefined) => {
    setPage(0);
    setHasMore(true);
    setSelectedCategory(value);
  }, []);

  const handlePriceChange = useCallback((value: number | undefined) => {
    setPage(0);
    setHasMore(true);
    setSelectedPrice(value);
  }, []);

  const handleAdvancedFiltersChange = useCallback(
    (value: AdvancedFiltersState) => {
      setPage(0);
      setHasMore(true);
      setAdvancedFilters(value);
    },
    []
  );

  const handleNextPage = useCallback(() => {
    if (!hasMore || loading) return;
    loadPlaces(page + 1);
  }, [hasMore, loading, loadPlaces, page]);

  const handlePrevPage = useCallback(() => {
    if (page === 0 || loading) return;
    loadPlaces(page - 1);
  }, [page, loading, loadPlaces]);

  const handleRetryPlacesWithReset = useCallback(() => {
    resetFilterState();
    resetPlacesState();
    loadPlaces(0);
  }, [loadPlaces, resetFilterState, resetPlacesState]);

  const handleRetryShowcases = useCallback(() => {
    resetShowcasesState();
    loadShowcases();
  }, [loadShowcases, resetShowcasesState]);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_22%),linear-gradient(180deg,#020617_0%,#081225_30%,#07101d_100%)] text-white">
      <Header onSearch={handleSearch} initialQuery={query} allowEmptySearch />

      <Hero
        title="Descubra o melhor de Floripa hoje"
        subtitle={`${
          activePlacesCount ?? "—"
        } lugares incríveis perto de você.`}
        eyebrow="Descubra os melhores lugares de Floripa"
        backgroundImage="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=2200&auto=format&fit=crop"
        filters={
          <FiltersBar
            selectedCategory={selectedCategory}
            selectedPrice={selectedPrice}
            advancedFilters={advancedFilters}
            onCategoryChange={handleCategoryChange}
            onPriceChange={handlePriceChange}
            onAdvancedFiltersChange={handleAdvancedFiltersChange}
          />
        }
        meta={<HeroMeta latestCreatedAt={latestCreatedAt} />}
      />

      <section className="px-4 pb-8 md:px-8">
        <div className="mx-auto max-w-7xl space-y-10">
          {statsError ? (
            <FriendlyErrorState
              compact
              title="Algumas informações não puderam ser carregadas"
              message={statsError}
              onAction={loadStats}
              actionLabel="Tentar novamente"
            />
          ) : null}

          <div>
            <SectionHeader
              title={
                query.trim()
                  ? `Resultados para "${query}"`
                  : "Em alta hoje em Florianópolis"
              }
              subtitle={
                query.trim()
                  ? `Lugares encontrados · Tipo: ${activeFilterLabel.categoryLabel} · Preço: ${activeFilterLabel.priceLabel} · Filtros avançados: ${activeFilterLabel.advancedCount}`
                  : `Descubra os lugares que estão bombando agora · Tipo: ${activeFilterLabel.categoryLabel} · Preço: ${activeFilterLabel.priceLabel} · Filtros avançados: ${activeFilterLabel.advancedCount}`
              }
            />

            {loading ? (
              <TrendingGridSkeleton />
            ) : trendingPlaces.length > 0 ? (
              <>
                <TrendingGrid items={trendingPlaces} />

                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handlePrevPage}
                    disabled={page === 0 || loading}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Voltar
                  </button>

                  <div className="rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-3 text-sm font-medium text-sky-200">
                    Página {page + 1}
                  </div>

                  <button
                    type="button"
                    onClick={handleNextPage}
                    disabled={!hasMore || loading}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Ver mais
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </>
            ) : placesError ? (
              <FriendlyErrorState
                compact
                title="Erro ao carregar lugares"
                message={placesError}
                details="Os filtros foram resetados para evitar informações confusas na tela."
                onAction={handleRetryPlacesWithReset}
                actionLabel="Limpar filtros e tentar novamente"
              />
            ) : (
              <p className="text-slate-400">
                Nenhum lugar encontrado para os filtros selecionados.
              </p>
            )}
          </div>

          <div>
            <SectionHeader title="Recomendados para você" />

            {loadingShowcases ? (
              <RecommendedRowSkeleton />
            ) : recommendedShowcases.length > 0 ? (
              <RecommendedRow items={recommendedShowcases} />
            ) : showcasesError ? (
              <FriendlyErrorState
                compact
                title="Erro ao carregar recomendações"
                message={showcasesError}
                onAction={handleRetryShowcases}
                actionLabel="Tentar novamente"
              />
            ) : (
              <p className="text-slate-400">
                Nenhuma recomendação disponível no momento.
              </p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}