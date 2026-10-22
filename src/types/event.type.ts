export interface City {
  id?: number;
  name: string;
  image?: string | null;
}

export interface Speaker {
  id?: number;
  name: string;
  slug?: string;
  designation?: string;
  company?: string;
  image?: string | null;
  linkedin_url?: string | null;
  message?: string;
}

export interface EventSpeaker {
  id: number;
  speaker: Speaker | null;
}

export interface AgendaSpeaker {
  id?: number;
  speaker: Speaker | null;
}

export interface Agenda {
  id: number;
  agenda_time: string;
  agenda_title?: string;
  agenda_short_description?: string;
  agenda_description?: string;
  agenda_speakers?: AgendaSpeaker[];
}

export interface Dignitary {
  name: string;
  designation: string;
}

export interface Event {
  id: number;
  slug: string;
  title?: string;
  date: string;
  year?: number | string;
  venue?: string | null;
  image?: string | null;
  city?: City | null;
  city_name?: string;
  icon?: string;
  city_icon?: string;
  speakers?: EventSpeaker[];
  agendas?: Agenda[];
  dignitaries?: Dignitary[];
  gallery?: { images?: string[] } | null;
  summit_report?: string | null;
  gallery_banner: string | null;
}

export interface EventsResponse {
  status?: boolean;
  data?: {
    events?: Event[];
  };
}

export interface PastEditionSection {
  year: number;
  events: Event[];
}

export interface PastEditionsResponse {
  data?: {
    events?: PastEditionSection[];
  };
}

export interface EventDetailResponse {
  data?: Event | null;
}

export interface EventCity {
  id: number;
  name: string;
}

export interface Sponsor {
  id: number;
  sponsor_type: string;
  image: string;
  website_url?: string | null;
  title?: string | null;
}

export interface SponsorsResponse {
  data?: {
    margedSponsors?: Sponsor[];
  };
}

export interface GalleryImage {
  id: number;
  image: string;
}

export interface GalleryResponse {
  data?: GalleryImage[];
}

export interface Plan {
  id: number;
  title: string;
  tag?: string | null;
  starting_price?: number | string;
  description?: string;
}

export interface OfficialMessage {
  id: number;
  speaker: Speaker | null;
}

export interface OfficialMessagesResponse {
  data?: Record<string, OfficialMessage[]>;
}

export interface OfficialMessageDetailResponse {
  data?: OfficialMessage | null;
}
