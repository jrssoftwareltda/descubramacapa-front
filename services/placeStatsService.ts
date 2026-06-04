import { http } from "@/lib/http";
import { PlaceActiveCountResponse, PlaceLatestCreatedAtResponse } from "@/types/types";

async function getActivePlacesCount(): Promise<PlaceActiveCountResponse> {
  return http<PlaceActiveCountResponse>("/place-stats/active-count", {
    method: "GET",
  });
}

async function getLatestCreatedAt(): Promise<PlaceLatestCreatedAtResponse> {
  return http<PlaceLatestCreatedAtResponse>("/place-stats/latest-created-at", {
    method: "GET",
  });
}

export const placeStatsService = {
  getActivePlacesCount,
  getLatestCreatedAt,
};