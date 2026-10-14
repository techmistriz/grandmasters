export type SummitGalleryEvent = {
  id: number;
  slug: string;
  city?: {
    name?: string | null;
  } | null;
};

export type SummitGalleryImage = {
  id: number;
  image: string;
};

export type SummitEventsResponse = {
  data?: {
    events?: SummitGalleryEvent[];
  };
};

export type SummitGalleryResponse = {
  data?: SummitGalleryImage[];
};
