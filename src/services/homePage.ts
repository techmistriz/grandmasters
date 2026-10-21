import api from "@/src/network/axios";
import { APP_EVENT_TYPE } from "../config/eventType.config";
import type {
  EventCity,
  EventsResponse,
  GalleryResponse,
  Plan,
  SponsorsResponse,
} from "../types/event.type";
import type { ApiResponse } from "../types/api.type";

export const getEvents = async (): Promise<EventsResponse> => {
  const { data } = await api.get<EventsResponse>(`/events/${APP_EVENT_TYPE}`);
  return data;
};

export const getSponsors = async (): Promise<SponsorsResponse> => {
  const { data } = await api.get<SponsorsResponse>(
    `/events/${APP_EVENT_TYPE}?is_merge=1`,
  );
  return data;
};

export const getSummitEvents = async (
  limit: number,
): Promise<EventsResponse> => {
  const { data } = await api.get<EventsResponse>(
    `/events/${APP_EVENT_TYPE}?is_past_edition=1&limit=${limit}`,
  );
  return data;
};

export const getHomepageGallery = async (
  eventId: number,
): Promise<GalleryResponse> => {
  const { data } = await api.get<GalleryResponse>(
    `/homepage-gallery/${eventId}`,
  );
  return data;
};

export const getEventCities = async (): Promise<ApiResponse<EventCity[]>> => {
  const { data } = await api.get<ApiResponse<EventCity[]>>("/event-cities");
  return data;
};

export const getPlans = async (): Promise<ApiResponse<Plan[]>> => {
  const { data } = await api.get<ApiResponse<Plan[]>>("/plans");
  return data;
};
