export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

// The API's public folder, e.g. https://events.lexwitness.com
const API_HOST = API_BASE_URL.replace(/\/api(\/.*)?$/, "");

export const API_ASSET_URLS = {
  speakers: process.env.NEXT_PUBLIC_SPEAKERS_BASE_URL || "",

  officialMessages: process.env.NEXT_PUBLIC_OFFICIAL_MESSAGE_BASE_URL || "",

  sponsors: process.env.NEXT_PUBLIC_SPONSORS_BASE_URL || "",

  pastEditions: process.env.NEXT_PUBLIC_PASTEDITIONS_BASE_URL || "",

  // Homepage gallery images and gallery banners are uploaded by the admin
  // into the API's public uploads/events folders, so default to those.
  gallery:
    process.env.NEXT_PUBLIC_GALLERY_BASE_URL ||
    `${API_HOST}/uploads/events/galleries/`,

  galleryBanners:
    process.env.NEXT_PUBLIC_GALLERY_BANNER_BASE_URL ||
    `${API_HOST}/uploads/events/gallery-banners/`,

  reports: process.env.NEXT_PUBLIC_REPORT_BASE_URL || "",

  // City images live in the API's public uploads/cities folder. Defaults to
  // the API host (API_BASE_URL minus /api/...) so no new env var is needed.
  cities:
    process.env.NEXT_PUBLIC_CITIES_BASE_URL || `${API_HOST}/uploads/cities/`,
} as const;
