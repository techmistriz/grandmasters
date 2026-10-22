import { API_ASSET_URLS } from "../config/api.config";

export const DEFAULT_SPEAKER_IMAGE = "/images/default.png";
export const DEFAULT_SPONSOR_IMAGE = "/images/sponsor-placeholder.png";

const joinUrl = (base: string, path: string) =>
  `${base.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;

export const getSpeakerImageUrl = (image?: string | null) =>
  image ? joinUrl(API_ASSET_URLS.speakers, image) : DEFAULT_SPEAKER_IMAGE;

export const getOfficialMessageImageUrl = (image?: string | null) =>
  image
    ? joinUrl(API_ASSET_URLS.officialMessages, image)
    : DEFAULT_SPEAKER_IMAGE;

export const getSponsorImageUrl = (image?: string | null) =>
  image ? joinUrl(API_ASSET_URLS.sponsors, image) : DEFAULT_SPONSOR_IMAGE;

export const getPastEditionImageUrl = (image?: string | null) =>
  image ? joinUrl(API_ASSET_URLS.pastEditions, image) : DEFAULT_SPONSOR_IMAGE;

// The gallery base URL is used without a separator in the old app
// (`${IMAGE_URL}${item.image}`), so keep the same concatenation.
export const getGalleryImageUrl = (image: string) =>
  `${API_ASSET_URLS.gallery}${image}`;

export const getReportUrl = (report?: string | null) =>
  report ? joinUrl(API_ASSET_URLS.reports, report) : "";

export const handleImageError =
  (fallback = DEFAULT_SPEAKER_IMAGE) =>
  (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = fallback;
  };

export const getGalleryBannerUrl = (image?: string | null): string => {
  if (!image) return "";

  const baseUrl = process.env.NEXT_PUBLIC_GALLERY_BANNER_BASE_URL;

  if (!baseUrl) return image;

  return `${baseUrl.replace(/\/$/, "")}/${image.replace(/^\//, "")}`;
};
