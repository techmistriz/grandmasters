"use client";

import { useEffect } from "react";

import Hero from "@/src/components/sections/Hero";
import Concept from "@/src/components/sections/Concept";
import Speakers from "@/src/components/sections/Speakers";
import Agenda from "@/src/components/sections/Agenda";
import RegisterPricing from "@/src/components/sections/RegisterPricing";
import SpecialDiscounts from "@/src/components/sections/SpecialDiscounts";
import GetInvolvedForm from "@/src/components/sections/GetInvolvedForm";
import SummitGallery from "@/src/components/sections/SummitGallery";
import BrandSponsor from "@/src/components/sections/BrandSponsor";
import Sponsors from "@/src/components/sections/Sponsors";
import Connect from "@/src/components/sections/Connect";

import { scrollToSection } from "@/src/utils/sectionNavigation";

export default function Home() {
  // Sections load their data asynchronously, so a "/#agenda" link lands
  // before the target has its final position. Keep correcting the scroll
  // until the layout stops changing.
  useEffect(() => {
    let observer: MutationObserver | null = null;
    let quietTimer: ReturnType<typeof setTimeout> | undefined;
    let maxTimer: ReturnType<typeof setTimeout> | undefined;
    let frame = 0;
    let lastHash = "";

    const cleanup = () => {
      observer?.disconnect();
      observer = null;

      if (quietTimer) clearTimeout(quietTimer);
      if (maxTimer) clearTimeout(maxTimer);

      cancelAnimationFrame(frame);
    };

    const correctScroll = () => {
      const hash = window.location.hash;

      if (!hash || window.location.pathname !== "/") {
        cleanup();
        return;
      }

      lastHash = hash;
      cleanup();

      const targetId = decodeURIComponent(hash.slice(1));

      const scroll = () => {
        if (window.location.hash !== lastHash) return;

        if (!document.getElementById(targetId)) return;

        scrollToSection(lastHash);
      };

      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => {
          scroll();

          observer = new MutationObserver(() => {
            if (window.location.hash !== lastHash) {
              cleanup();
              return;
            }

            cancelAnimationFrame(frame);

            frame = requestAnimationFrame(() => {
              frame = requestAnimationFrame(scroll);
            });

            if (quietTimer) clearTimeout(quietTimer);

            quietTimer = setTimeout(cleanup, 1200);
          });

          observer.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true,
          });

          maxTimer = setTimeout(cleanup, 15000);
          quietTimer = setTimeout(cleanup, 1200);
        });
      });
    };

    correctScroll();

    window.addEventListener("hashchange", correctScroll);

    return () => {
      cleanup();
      window.removeEventListener("hashchange", correctScroll);
    };
  }, []);

  return (
    <>
      <section id="home" className="scroll-mt-24">
        <Hero />
      </section>

      <section id="concept" className="scroll-mt-24">
        <Concept />
      </section>

      <section id="speak" className="scroll-mt-24">
        <Speakers />
      </section>

      <section id="agenda" className="scroll-mt-24">
        <Agenda />
      </section>

      <section id="register" className="scroll-mt-24">
        <RegisterPricing />
      </section>

      <section id="discount" className="scroll-mt-24">
        <SpecialDiscounts />
      </section>

      <section id="get-involved" className="scroll-mt-24">
        <GetInvolvedForm />
      </section>

      <section id="gallery" className="scroll-mt-24">
        <SummitGallery />
      </section>

      <section id="brand-sponsor" className="scroll-mt-24">
        <BrandSponsor />
      </section>

      <section id="sponsor" className="scroll-mt-24">
        <Sponsors />
      </section>

      <section id="connect" className="scroll-mt-24">
        <Connect />
      </section>
    </>
  );
}
