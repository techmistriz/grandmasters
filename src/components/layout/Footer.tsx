"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaArrowRight, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { LuMail } from "react-icons/lu";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=919899332111&text=Hello%2C%20I%20am%20interested%20in%20The%20Grand%20Masters%202026%20Summit%20Series";
const LINKEDIN_URL = "https://www.linkedin.com/company/389718/";

const siteLinks = [
  { label: "Home", href: "/" },
  { label: "Concept", href: "/#concept" },
  { label: "Agenda", href: "/#agenda" },
  { label: "Speak", href: "/#speak" },
  { label: "Sponsor", href: "/#sponsor" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Connect", href: "/#connect" },
];

const summits = [
  {
    name: "Banking & Finance Legal Summit",
    city: "Mumbai",
    href: "https://www.bfls.in",
  },
  {
    name: "IT Legal Summit",
    city: "Bengaluru",
    href: "https://www.itlegalsummit.com",
  },
  {
    name: "Media, Advertising & Entertainment Legal Summit",
    city: "Mumbai",
    href: "https://www.maels.in",
  },
  {
    name: "Pharma Legal & Compliance Summit",
    city: "Mumbai",
    href: "https://www.plcs.co.in",
  },
  {
    name: "Real Estate & Construction Legal Summit",
    city: "New Delhi",
    href: "https://www.rcls.in",
  },
];

// Grand Masters has no policy pages of its own; these are the shared Lex
// Witness ones.
const legalLinks = [
  { label: "Privacy Policy", href: "https://www.bfls.in/privacy-policy" },
  { label: "Terms of Use", href: "https://www.bfls.in/terms-conditions" },
];

const socials = [
  { label: "LinkedIn", href: LINKEDIN_URL, icon: <FaLinkedinIn size={18} /> },
  { label: "WhatsApp", href: WHATSAPP_URL, icon: <FaWhatsapp size={20} /> },
];

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigation = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (!href.startsWith("/#")) return;

    event.preventDefault();

    const hash = href.split("#")[1];

    const scrollToSection = () => {
      const section = document.getElementById(hash);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };

    if (pathname === "/") {
      // Handle clicking the same hash again.
      window.history.replaceState(null, "", href);
      scrollToSection();
    } else {
      // Navigate home first, then scroll to the target section.
      router.push(href);
    }
  };

  return (
    <footer className="w-full font-roboto">
      {/* Top Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#f7f7f7] to-[#efefef]">
        <img
          src="/images/footer-king.jpg"
          alt=""
          className="pointer-events-none absolute right-0 top-0 h-full w-[max(200px,calc(50vw-36rem))] max-w-[45%] 2xl:max-w-none object-cover object-[65%_center] opacity-35 2xl:opacity-100 [mask-image:linear-gradient(to_right,transparent,black_35%)] 2xl:[mask-image:linear-gradient(to_right,transparent,black_20%)]"
        />

        <div className="relative max-w-6xl mx-auto px-4 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1fr_1.05fr_1.9fr] gap-10 xl:gap-0 xl:divide-x xl:divide-[#d9d9d9]">
          {/* About */}
          <div className="xl:pr-10">
            <img
              src="/images/image.png"
              alt="Lex Witness – India's First Magazine on Legal and Corporate Affairs"
              className="w-[240px]"
            />
            <span className="block mt-5 w-14 h-0.5 bg-[#D0252D]" />
            <p className="mt-5 text-[15px] leading-relaxed text-[#555]">
              India&apos;s pioneering legal and corporate affairs platform,
              connecting the in-house and external counsel community since 2009.
            </p>
            <a
              href="mailto:info@witnesslive.in"
              className="mt-6 inline-flex items-center gap-3 text-[17px] text-[#222] hover:text-[#D0252D] transition"
            >
              <LuMail size={24} className="text-[#D0252D]" />
              info@witnesslive.in
            </a>
            <div className="mt-6 flex gap-4">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex items-center justify-center w-12 h-12 rounded-full border border-[#222] text-[#222] hover:bg-[#D0252D] hover:border-[#D0252D] hover:text-white transition"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* The Grand Masters */}
          <div className="xl:px-10">
            <h2 className="text-[22px] md:text-[24px] font-bold text-[#141414] whitespace-nowrap">
              The Grand Masters
            </h2>
            <span className="block mt-4 w-14 h-1 bg-[#D0252D]" />
            <ul className="mt-6">
              {siteLinks.map((link) => (
                <li key={link.label} className="border-b border-[#dcdcdc]">
                  <Link
                    href={link.href}
                    onClick={(event) => handleNavigation(event, link.href)}
                    className="group flex items-center justify-between py-2 text-[17px] text-[#222] hover:text-[#D0252D] transition"
                  >
                    {link.label}
                    <FaArrowRight
                      size={14}
                      className="text-[#D0252D] transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Flagship Summits */}
          <div className="md:col-span-2 xl:col-span-1 xl:pl-10">
            <h2 className="text-[22px] md:text-[24px] font-bold text-[#141414]">
              The Lex<span className="text-[#D0252D]"> Witness</span> Annual
              Flagship Summits
            </h2>
            <span className="block mt-4 w-14 h-1 bg-[#D0252D]" />
            <ul className="mt-5">
              {summits.map((summit) => (
                <li key={summit.href} className="border-b border-[#dcdcdc]">
                  <a
                    href={summit.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 py-3.5 text-[15px] md:text-[16px] text-[#222] hover:text-[#D0252D] transition"
                  >
                    <span>
                      {summit.name}
                      <span className="mx-3 text-[#bbb]">|</span>
                      <span className="text-[#666]">{summit.city}</span>
                    </span>
                    <FaArrowRight
                      size={14}
                      className="shrink-0 text-[#D0252D] transition-transform group-hover:translate-x-1"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#1f2025] text-white">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col lg:flex-row items-center justify-between gap-5 text-center lg:text-left">
          <div className="text-[14px] md:text-[15px] leading-relaxed text-white/85">
            <p>
              © 2026 Lex Witness
              <span className="mx-3 text-white/40">|</span>A Unit of SriGro
              Interactive Pvt. Ltd.
            </p>
            <p>All Rights Reserved.</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-5">
            <nav className="flex flex-wrap justify-center items-center text-[14px] md:text-[15px] text-white/85">
              {legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 border-r border-white/30 hover:text-[#ff4b52] transition"
                >
                  {link.label}
                </a>
              ))}
              <Link
                href="/summit-secretariat"
                className="px-4 hover:text-[#ff4b52] transition"
              >
                Summit Secretariat
              </Link>
            </nav>

            <div className="flex gap-4 sm:pl-6 sm:border-l sm:border-white/30">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex items-center justify-center w-11 h-11 rounded-full border border-white/70 hover:bg-[#D0252D] hover:border-[#D0252D] transition"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Button */}
      <div className="fixed bottom-8 right-4 md:bottom-24 md:right-6 z-50 group">
        {/* Tooltip */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-roboto absolute right-16 top-1/2 -translate-y-1/2 bg-[#25D366] text-white text-[15px] font-normal leading-6 px-3 py- rounded-lg opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2 transition-all duration-200 whitespace-nowrap cursor-pointer"
        >
          Get In Touch
        </a>

        {/* Button */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="
              bg-gradient-to-b
              from-[#5BF673]
              to-[#32C131]
              w-12 h-12 md:w-13 md:h-13
              rounded-xl
              flex items-center justify-center
              shadow-[0_8px_20px_rgba(50,193,49,0.35)]
              border border-[#74F58A]
              transition-all duration-300
            "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            className="w-6 h-6 md:w-9 md:h-9"
          >
            <path d="M20.52 3.48A11.79 11.79 0 0012.05 0C5.49 0 .14 5.35.14 11.91c0 2.1.55 4.15 1.59 5.96L0 24l6.33-1.66a11.84 11.84 0 005.72 1.46h.01c6.56 0 11.91-5.35 11.91-11.91 0-3.18-1.24-6.17-3.45-8.41zm-8.47 18.3h-.01a9.9 9.9 0 01-5.05-1.39l-.36-.21-3.76.99 1-3.66-.24-.38a9.86 9.86 0 01-1.51-5.24c0-5.46 4.44-9.9 9.91-9.9 2.64 0 5.12 1.03 6.98 2.89a9.83 9.83 0 012.89 6.98c0 5.47-4.44 9.91-9.9 9.91zm5.43-7.39c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15s-.77.97-.95 1.17c-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.48-.88-.79-1.48-1.77-1.65-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5s1.07 2.9 1.22 3.1c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" />
          </svg>
        </a>
      </div>
    </footer>
  );
}
