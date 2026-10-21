export const scrollToSection = (hash: string) => {
  const sectionId = decodeURIComponent(hash.replace(/^#/, ""));
  const section = document.getElementById(sectionId);

  if (!section) return;

  // Read the scroll offset from the target's CSS scroll-margin.
  const scrollMarginTop =
    Number.parseFloat(window.getComputedStyle(section).scrollMarginTop) || 0;

  const top =
    section.getBoundingClientRect().top + window.scrollY - scrollMarginTop;

  window.scrollTo({
    top: Math.max(0, top),
    behavior: "smooth",
  });
};
