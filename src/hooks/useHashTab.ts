"use client";

import { useEffect, useState } from "react";

// "#speakers-new-delhi-edition" style ids for city edition tabs.
export const editionTabId = (prefix: string, cityName = "") =>
  `${prefix}-${cityName}-edition`.toLowerCase().replace(/\s+/g, "-");

// Keeps the selected tab in the URL hash (e.g. #agenda-pune-edition) so it
// can be shared as a link, and follows back/forward navigation. Only hashes
// starting with `${prefix}-` belong to this tab group.
export const useHashTab = (prefix: string) => {
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const readHash = () => {
      const hash = decodeURIComponent(window.location.hash.slice(1));

      if (hash.startsWith(`${prefix}-`)) setSelected(hash);
    };

    readHash();
    window.addEventListener("hashchange", readHash);
    window.addEventListener("popstate", readHash);

    return () => {
      window.removeEventListener("hashchange", readHash);
      window.removeEventListener("popstate", readHash);
    };
  }, [prefix]);

  const select = (id: string) => {
    setSelected(id);

    if (window.location.hash !== `#${id}`) {
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return [selected, select] as const;
};
