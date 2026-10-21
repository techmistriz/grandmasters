import type { OfficialMessage } from "../types/event.type";

// Speaker slugs carry a trailing "-<number>"; the public URL drops it.
export const getOfficialMessageSlug = (message: OfficialMessage) =>
  (message.speaker?.slug ?? "").replace(/-\d+$/, "");

export const getOfficialMessageHref = (message: OfficialMessage) =>
  `/official-messages/${getOfficialMessageSlug(message)}`;
