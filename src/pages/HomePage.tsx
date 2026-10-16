import Home from "./Home";
import Concept from "./Concept";
import SpeakersSection from "./Speak";
import SponsorsPartners from "./Sponser";
import ContactSection from "./Connect";
import RegisterPricing from "../components/RegisterPricing";
import SummitAgenda from "./Agenda";
import SpecialDiscounts from "../components/SpecialDiscounts";
import GetInvolved from "../components/GetInvolvedForm";
import SummitGallery from "../components/SummitGallery";
import BrandSponsorship from "../components/BrandSponsor";

export default function HomePage() {
  return (
    <>
      <section id="/" className="scroll-mt-24">
        <Home />
      </section>

      <section id="concept" className="scroll-mt-24">
        <Concept />
      </section>

      <section id="speak" className="scroll-mt-24">
        <SpeakersSection />
      </section>
      <section id="agenda" className="scroll-mt-24">
        <SummitAgenda />
      </section>
      <section id="register" className="scroll-mt-24">
        <RegisterPricing />
      </section>
      <section id="discount" className="scroll-mt-24">
        <SpecialDiscounts />
      </section>
      <section id="get-involved" className="scroll-mt-24">
        <GetInvolved />
      </section>
      <section id="gallery" className="scroll-mt-24">
        <SummitGallery />
      </section>
      <section id="brand-sponsor" className="scroll-mt-24">
        <BrandSponsorship />
      </section>

      <section id="sponsor" className="scroll-mt-24">
        <SponsorsPartners />
      </section>

      <section id="connect" className="scroll-mt-24">
        <ContactSection />
      </section>
    </>
  );
}
