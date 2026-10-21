export type SummitContentItem = {
  logo?: string;
  title?: string;
  description: string;
};

export type SummitItem = {
  year: string;
  title: string;
  content?: SummitContentItem[];
};
