import { APP_EVENT_TYPE } from "../../constant/config";
import api from "../axios";
import type { SponsorsResponse } from "../../types/summit.types";
import type {
  SummitEventsResponse,
  SummitGalleryResponse,
} from "../../types/gallery.types";

export const getEvents = async () => {
  const { data } = await api.get(`/events/${APP_EVENT_TYPE}`);
  return data;
};

export const getSponsors = async (): Promise<SponsorsResponse> => {
  const res = await api.get<SponsorsResponse>(
    `/events/${APP_EVENT_TYPE}?is_merge=1`,
  );

  return res.data;
};

export const getSummitEvents = async (limit: number) => {
  return api.get<SummitEventsResponse>(
    `/events/${APP_EVENT_TYPE}?is_past_edition=1&limit=${limit}`,
  );
};

export const getHomepageGallery = async (eventId: number) => {
  return api.get<SummitGalleryResponse>(`/homepage-gallery/${eventId}`);
};
