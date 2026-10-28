"use client";

import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiMenu, HiX } from "react-icons/hi";

import { EVENT_CONFIG } from "@/src/config/event";
import { navItems } from "@/src/data/menu.data";
import { scrollToSection } from "@/src/utils/sectionNavigation";

export default function Header() {
  const pathname = usePathname();

  const [active, setActive] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  // Highlight the section currently in view on the homepage.
  useEffect(() => {
    if (pathname !== "/") return;

    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      let currentSection = "";

      sections.forEach((section) => {
        const top = (section as HTMLElement).offsetTop - 140;

        if (window.scrollY >= top) {
          currentSection = section.id;
        }
      });

      setActive(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const activeSection = pathname === "/" ? active : "";

  // On the homepage, scroll in place instead of navigating.
  const handleSectionClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    setMobileMenu(false);

    if (window.location.pathname !== "/") return;

    if (!document.getElementById(id)) return;

    e.preventDefault();

    if (window.location.hash !== `#${id}`) {
      window.history.pushState(null, "", `/#${id}`);
    }

    scrollToSection(id);
  };

  const handleLogoClick = (e: MouseEvent<HTMLAnchorElement>) => {
    setMobileMenu(false);

    if (window.location.pathname !== "/") return;

    e.preventDefault();

    if (window.location.hash) {
      window.history.replaceState(null, "", "/");
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const registrationOpen = EVENT_CONFIG.registrationOpen;
  const actionLabel = registrationOpen ? "Register Now" : "Summit Gallery";
  const actionSection = registrationOpen ? "register-plans" : "gallery";

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white border-b border-[#ececec] shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
      <div className="mx-auto flex h-16 md:h-24 max-w-6xl items-center justify-between px-4 md:px-4">
        {/* Logo */}
        <Link
          href="/"
          onClick={handleLogoClick}
          aria-label="Lex Witness, home"
          className="shrink-0"
        >
          <img
            src="/images/image.png"
            alt="Lex Witness"
            className="h-11 md:h-16 w-auto"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-4 lg:gap-8 font-roboto text-[13px] font-medium tracking-[0.15em]">
          {navItems.map((item) => {
            if (item.type === "route") {
              return (
                <li key={item.id}>
                  <Link
                    href={item.id}
                    className={`transition ${
                      pathname === item.id
                        ? "text-[#D0252D]"
                        : "text-black hover:text-[#D0252D]"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            }

            const isActive = activeSection === item.id;

            return (
              <li key={item.id}>
                <Link
                  href={`/#${item.id}`}
                  onClick={(e) => handleSectionClick(e, item.id)}
                  className={`relative transition ${
                    isActive
                      ? "text-[#D0252D]"
                      : "text-black hover:text-[#D0252D]"
                  }`}
                >
                  {item.label}

                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] bg-[#D0252D] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop Register */}
        <Link
          href={`/#${actionSection}`}
          onClick={(e) => handleSectionClick(e, actionSection)}
          className="hidden md:block shrink-0 cursor-pointer rounded-sm border border-[#D0252D] px-5 lg:px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.3em] text-[#D0252D] transition hover:bg-[#D0252D] hover:text-white"
        >
          {actionLabel}
        </Link>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={mobileMenu ? "Close menu" : "Open menu"}
          onClick={() => setMobileMenu(!mobileMenu)}
          className="md:hidden flex items-center justify-center p-2 text-[#D0252D]"
        >
          {mobileMenu ? <HiX size={30} /> : <HiMenu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden bg-white shadow-lg transition-all duration-300 ease-in-out ${
          mobileMenu ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="flex flex-col px-5 py-3">
          {navItems.map((item) => {
            if (item.type === "route") {
              return (
                <Link
                  key={item.id}
                  href={item.id}
                  onClick={() => setMobileMenu(false)}
                  className={`py-4 border-b font-semibold tracking-wide transition ${
                    pathname === item.id ? "text-[#D0252D]" : "text-black"
                  }`}
                >
                  {item.label}
                </Link>
              );
            }

            const isActive = activeSection === item.id;

            return (
              <Link
                key={item.id}
                href={`/#${item.id}`}
                onClick={(e) => handleSectionClick(e, item.id)}
                className={`py-4 border-b font-semibold tracking-wide transition ${
                  isActive ? "text-[#D0252D]" : "text-black"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          <Link
            href={`/#${actionSection}`}
            onClick={(e) => handleSectionClick(e, actionSection)}
            className="mt-5 w-full rounded-sm border border-[#D0252D] py-3 text-center text-sm font-bold uppercase tracking-[3px] text-[#D0252D] transition hover:bg-[#D0252D] hover:text-white"
          >
            {actionLabel}
          </Link>
        </div>
      </div>
    </nav>
  );
}
