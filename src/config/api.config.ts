export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export const API_ASSET_URLS = {
  speakers: process.env.NEXT_PUBLIC_SPEAKERS_BASE_URL || "",

  officialMessages: process.env.NEXT_PUBLIC_OFFICIAL_MESSAGE_BASE_URL || "",

  sponsors: process.env.NEXT_PUBLIC_SPONSORS_BASE_URL || "",

  pastEditions: process.env.NEXT_PUBLIC_PASTEDITIONS_BASE_URL || "",

  gallery: process.env.NEXT_PUBLIC_GALLERY_BASE_URL || "",

  reports: process.env.NEXT_PUBLIC_REPORT_BASE_URL || "",
} as const;
