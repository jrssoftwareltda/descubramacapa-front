export type PageResponse<T> = {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
};

export type PlaceBadge = {
  label: string;
  slug: string;
  type: "commercial" | "category" | "experience" | "status";
};

export type PlaceBadgeResponse = {
  label: string;
  slug: string;
  type: "commercial" | "category" | "experience" | "status";
};

export type PlaceCard = {
  id: string;
  name: string;
  slug: string;
  primaryImageUrl: string;
  priceLabel?: string;
  distanceLabel?: string;
  badges: PlaceBadge[];
};

export type PlaceCardResponse = {
  id: string;
  slug: string;
  name: string;
  subtitle?: string;
  primaryImageUrl?: string;
  priceLabel?: string;
  distanceLabel?: string;
  badges: PlaceBadgeResponse[];
};

export type PlaceSearchCardsParams = {
  query?: string;
  city?: string;
  tagSlugs?: string[];
  tagTypes?: string[];
  categorySlugs?: string[];
  neighborhoodSlugs?: string[];
  priceLevel?: number;
  openNow?: boolean;
  userLat?: number | null;
  userLng?: number | null;
  page?: number;
  size?: number;
};

export type RecommendedShowcase = {
  key: string;
  title: string;
  icon: "camera" | "chef" | "drink" | "fish";
  places: RecommendedShowcasePlace[];
};

export type RecommendedShowcasePlace = {
  id: string;
  slug: string;
  name: string;
  subtitle?: string;
  primaryImageUrl?: string;
  priceLabel?: string;
};

export type TrendingBadge = {
  label: string;
  slug: string;
  type: "commercial" | "category" | "experience" | "status";
};

export type TrendingPlace = {
  id: string;
  slug?: string;
  title: string;
  subtitle?: string; // 👈 CORRETO
  image?: string;
  badge?: string;
  badgeTone?: "warm" | "gold" | "blue";
  rating?: number;
  reviews?: number;
  distance?: string;
  price?: string;
  badges?: TrendingBadge[];
};

export type RecommendedPlace = {
  id: number;
  title: string;
  price: string;
  image: string;
  icon: "camera" | "chef" | "drink" | "sushi";
};

export type ValueItem = {
  id: number;
  title: string;
  description: string;
  icon: "sparkles" | "users" | "heart";
};

export type TeamMember = {
  id: number;
  name: string;
  role: string;
  image: string;
};

export type PlaceActiveCountResponse = {
  activePlacesCount: number;
};

export type PlaceLatestCreatedAtResponse = {
  latestCreatedAt: string | null;
};

export type DetailsCategoryItem = {
  id: number;
  label: string;
  icon: "dish" | "chair" | "sunset" | "camera";
  active?: boolean;
};

export type DetailsGalleryItem = {
  id: number;
  title: string;
  image: string;
  icon: "dish" | "chair" | "sunset" | "camera";
  description?: string;
  meta?: string[];
  eyebrow?: string;
};

export type DetailsTagItem = {
  id: number;
  label: string;
  icon: "flame" | "group" | "plate" | "heart";
  highlight?: boolean;
};

export type DetailsPlaceRecommendation = {
  id: number | string;
  slug?: string;
  title: string;
  subtitle?: string;
  distance?: string;
  price?: string;
  rating?: number;
  image: string;
};

export type PlaceDetailsPhoto = {
  id: string;
  imageUrl: string;
  altText?: string | null;
  isPrimary?: boolean | null;
  displayOrder?: number | null;
};

export type PlaceDetailsCategory = {
  id: string;
  name: string;
  slug: string;
};

export type PlaceDetailsTag = {
  id: string;
  name: string;
  slug: string;
  type: string;
};

export type PlaceDetailsOpeningHour = {
  id: string;
  dayOfWeek: number | null;
  openTime?: string | null;
  closeTime?: string | null;
  isClosed: boolean;
};

export type PlaceDetailsResponse = {
  id: string;
  googlePlaceId?: string | null;
  name: string;
  slug: string;

  editorialSummary?: string | null;
  shortDescription?: string | null;

  dishesSummary?: string | null;
  environmentSummary?: string | null;
  viewSummary?: string | null;
  instagramSummary?: string | null;

  formattedAddress?: string | null;
  street?: string | null;
  streetNumber?: string | null;
  neighborhood?: string | null;
  city?: string | null;
  state?: string | null;
  stateCode?: string | null;
  postalCode?: string | null;
  country?: string | null;
  countryCode?: string | null;

  latitude?: number | null;
  longitude?: number | null;

  nationalPhoneNumber?: string | null;
  internationalPhoneNumber?: string | null;
  whatsappNumber?: string | null;
  whatsappUrl?: string | null;
  websiteUrl?: string | null;
  instagramHandle?: string | null;
  instagramUrl?: string | null;
  menuUrl?: string | null;

  businessStatus?: string | null;
  permanentlyClosed: boolean;
  temporarilyClosed: boolean;
  priceLevel?: number | null;

  priceLabel?: string | null;
  statusLabel?: string | null;

  hasSunsetView: boolean;
  featured: boolean;
  active: boolean;

  categories: {
    id: string;
    name: string;
    slug: string;
  }[];

  tags: {
    id: string;
    name: string;
    slug: string;
    type?: string | null;
  }[];

  photos: {
    id: string;
    imageUrl: string;
    altText?: string | null;
    source?: string | null;
    isPrimary: boolean;
    displayOrder?: number | null;
  }[];

  openingHours: {
    id: string;
    dayOfWeek?: number | null;
    openTime?: string | null;
    closeTime?: string | null;
    isClosed: boolean;
  }[];
};
