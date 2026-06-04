import { http } from "@/lib/http";
import { PlaceSearchCardsParams, PageResponse, PlaceCardResponse } from "@/types/types";

const DEFAULT_PAGE = 0;
const DEFAULT_SIZE = 6;
const DEFAULT_SHOWCASE_LIMIT = 4;

export type PlaceSearchShowcaseParams = {
  key: string;
  city?: string;
  userLat?: number | null;
  userLng?: number | null;
  limit?: number;
};

function isNonBlank(value?: string): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function setStringParam(
  searchParams: URLSearchParams,
  key: string,
  value?: string
) {
  if (isNonBlank(value)) {
    searchParams.set(key, value.trim());
  }
}

function setArrayParam(
  searchParams: URLSearchParams,
  key: string,
  value?: string[]
) {
  if (Array.isArray(value) && value.length > 0) {
    const normalized = value
      .map((item) => item?.trim())
      .filter((item): item is string => Boolean(item));

    if (normalized.length > 0) {
      searchParams.set(key, normalized.join(","));
    }
  }
}

function setNumberParam(
  searchParams: URLSearchParams,
  key: string,
  value?: number | null
) {
  if (value != null) {
    searchParams.set(key, String(value));
  }
}

function buildCardsQueryParams(params: PlaceSearchCardsParams = {}): string {
  const searchParams = new URLSearchParams();

  setStringParam(searchParams, "query", params.query);
  setStringParam(searchParams, "city", params.city);

  setArrayParam(searchParams, "tagSlugs", params.tagSlugs);
  setArrayParam(searchParams, "tagTypes", params.tagTypes);
  setArrayParam(searchParams, "categorySlugs", params.categorySlugs);
  setNumberParam(searchParams, "priceLevel", params.priceLevel);

  setNumberParam(searchParams, "userLat", params.userLat);
  setNumberParam(searchParams, "userLng", params.userLng);

  searchParams.set("page", String(params.page ?? DEFAULT_PAGE));
  searchParams.set("size", String(params.size ?? DEFAULT_SIZE));

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}

function buildShowcaseQueryParams(
  params: PlaceSearchShowcaseParams
): string {
  const searchParams = new URLSearchParams();

  setStringParam(searchParams, "key", params.key);
  setStringParam(searchParams, "city", params.city);
  setNumberParam(searchParams, "userLat", params.userLat);
  setNumberParam(searchParams, "userLng", params.userLng);
  searchParams.set("limit", String(params.limit ?? DEFAULT_SHOWCASE_LIMIT));

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}

async function searchCards(
  params: PlaceSearchCardsParams = {}
): Promise<PageResponse<PlaceCardResponse>> {
  return http<PageResponse<PlaceCardResponse>>(
    `/place-search/cards${buildCardsQueryParams(params)}`,
    { method: "GET" }
  );
}

async function searchShowcasePlaces(
  params: PlaceSearchShowcaseParams
): Promise<PlaceCardResponse[]> {
  return http<PlaceCardResponse[]>(
    `/place-search/showcases${buildShowcaseQueryParams(params)}`,
    { method: "GET" }
  );
}

export const placeSearchService = {
  searchCards,
  searchShowcasePlaces,
};