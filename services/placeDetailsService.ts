import { http } from "@/lib/http";
import { PlaceCardResponse, PlaceDetailsResponse } from "@/types/types";

function isNonBlank(value?: string): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

async function getPlaceBySlug(slug: string): Promise<PlaceDetailsResponse> {
  if (!isNonBlank(slug)) {
    throw new Error("Slug is required to fetch place details.");
  }

  return http<PlaceDetailsResponse>(
    `/places/slug/${encodeURIComponent(slug.trim())}`,
    { method: "GET" }
  );
}

async function getRelatedPlaces(
  slug: string,
  limit = 4
): Promise<PlaceCardResponse[]> {
  if (!isNonBlank(slug)) {
    throw new Error("Slug is required to fetch related places.");
  }

  return http<PlaceCardResponse[]>(
    `/places/slug/${encodeURIComponent(slug.trim())}/related?limit=${limit}`,
    { method: "GET" }
  );
}

export const placeDetailsService = {
  getPlaceBySlug,
  getRelatedPlaces,
};