export type NavItem = {
  id: string;
  label: string;
  type: "section" | "route";
};

export const navItems: NavItem[] = [
  { id: "concept", label: "CONCEPT", type: "section" },
  { id: "speak", label: "SPEAK", type: "section" },
  { id: "agenda", label: "AGENDA", type: "section" },
  { id: "sponsor", label: "SPONSOR", type: "section" },
  // { id: "/past-editions", label: "PAST EDITIONS", type: "route" },
  { id: "gallery", label: "GALLERY", type: "section" },
  { id: "connect", label: "CONNECT", type: "section" },
];
