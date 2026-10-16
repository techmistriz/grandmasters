import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { EVENT_CONFIG } from "../constant/config";

const Navbar = () => {
  const navigate = useNavigate();

  const navigateToSection = (id: string) => {
    navigate(`/#${id}`);
  };

  const [active, setActive] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  const location = useLocation();

  const navItems = [
    { id: "concept", label: "CONCEPT", type: "section" },
    { id: "speak", label: "SPEAK", type: "section" },
    { id: "agenda", label: "AGENDA", type: "section" },
    { id: "sponsor", label: "SPONSOR", type: "section" },
    { id: "/past-editions", label: "PAST EDITIONS", type: "route" },
    { id: "connect", label: "CONNECT", type: "section" },
  ];

  useEffect(() => {
    if (location.pathname !== "/" || !location.hash) return;

    const id = location.hash.slice(1);
    let animationFrame = 0;
    let attempts = 0;
    let previousTop = -1;
    let stableFrames = 0;

    const scrollToSection = () => {
      const element = document.getElementById(id);

      if (!element) {
        if (attempts++ < 120) {
          animationFrame = requestAnimationFrame(scrollToSection);
        }
        return;
      }

      const targetTop =
        element.getBoundingClientRect().top + window.scrollY - 96;

      if (Math.abs(targetTop - previousTop) < 1) {
        stableFrames++;
      } else {
        stableFrames = 0;
      }

      previousTop = targetTop;

      window.scrollTo({
        top: targetTop,
        behavior: "smooth",
      });

      if (stableFrames < 8 && attempts++ < 120) {
        animationFrame = requestAnimationFrame(scrollToSection);
      }
    };

    animationFrame = requestAnimationFrame(scrollToSection);

    return () => cancelAnimationFrame(animationFrame);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (location.pathname !== "/") {
      setActive("");
      return;
    }

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
  }, [location.pathname]);

  const handleSectionClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    setMobileMenu(false);

    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      return;
    }

    if (location.hash !== `#${id}`) {
      navigate(`/#${id}`, { replace: true });
      return;
    }

    const element = document.getElementById(id);

    if (element) {
      const targetTop =
        element.getBoundingClientRect().top + window.scrollY - 96;

      window.scrollTo({
        top: targetTop,
        behavior: "smooth",
      });
    }
  };

  const registrationOpen = EVENT_CONFIG.registrationOpen;

  const actionLabel = registrationOpen ? "Register Now" : "Summit Gallery";

  const actionPath = registrationOpen ? "/#register" : "/#gallery";

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-[#E9E9E9] shadow-sm">
      {/* Navbar */}
      <div className="mx-auto flex h-16 md:h-24 max-w-6xl items-center justify-between px-4 md:px-4">
        {/* Logo */}
        <Link
          to="/"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setMobileMenu(false);
          }}
          className="text-2xl md:text-3xl font-bold tracking-wide text-[#D0252D]"
        >
          #TGM2026
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-4 font-custom text-sm font-bold tracking-widest">
          {navItems.map((item) => {
            if (item.type === "route") {
              return (
                <Link
                  key={item.id}
                  to={item.id}
                  className={`transition ${
                    location.pathname === item.id
                      ? "text-[#D0252D]"
                      : "text-black hover:text-[#D0252D]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            }

            const isActive = active === item.id;

            return (
              <Link
                key={item.id}
                to={`/#${item.id}`}
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
            );
          })}
        </ul>

        {/* Desktop Register */}
        <Link
          to={actionPath}
          onClick={(e) => {
            if (registrationOpen) {
              handleSectionClick(e, "register");
            }
          }}
          className="hidden md:block"
        >
          <button className="cursor-pointer rounded-sm border border-[#D0252D] px-3 py-3 text-sm font-bold uppercase tracking-[4px] text-[#D0252D] transition hover:bg-[#D0252D] hover:text-white">
            {actionLabel}
          </button>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="md:hidden flex items-center justify-center p-2 text-[#D0252D]"
        >
          {mobileMenu ? <HiX size={30} /> : <HiMenu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden bg-[#E9E9E9] shadow-lg transition-all duration-300 ease-in-out ${
          mobileMenu ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="flex flex-col px-5 py-3">
          {navItems.map((item) => {
            if (item.type === "route") {
              return (
                <Link
                  key={item.id}
                  to={item.id}
                  onClick={() => setMobileMenu(false)}
                  className={`py-4 border-b font-semibold tracking-wide transition ${
                    location.pathname === item.id
                      ? "text-[#D0252D]"
                      : "text-black"
                  }`}
                >
                  {item.label}
                </Link>
              );
            }
            const isActive = active === item.id;

            return (
              <Link
                key={item.id}
                to={`/#${item.id}`}
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
            to={actionPath}
            onClick={(e) => {
              setMobileMenu(false);

              if (registrationOpen) {
                handleSectionClick(e, "register");
              }
            }}
          >
            <button className="mt-5 w-full rounded-sm border border-[#D0252D] py-3 text-sm font-bold uppercase tracking-[3px] text-[#D0252D] transition hover:bg-[#D0252D] hover:text-white">
              {actionLabel}
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
