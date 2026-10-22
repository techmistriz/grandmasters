"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import toast from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa";
import { LuUsers, LuMegaphone, LuHandshake } from "react-icons/lu";

import { submitShowcase } from "@/src/services/showcase.service";
import { APP_EVENT_TYPE } from "@/src/config/eventType.config";
import { FORM_TYPES } from "@/src/config/showcase.config";
import { getErrorMessage } from "@/src/utils/error";

const benefits = [
  {
    icon: <LuUsers size={22} />,
    title: "Reach Senior In-House Counsel",
    text: "Engage with a focused and influential audience",
  },
  {
    icon: <LuMegaphone size={22} />,
    title: "Build Brand Visibility",
    text: "Showcase your expertise across key touchpoints",
  },
  {
    icon: <LuHandshake size={22} />,
    title: "Explore Strategic Partnerships",
    text: "Create long-term value and meaningful connections",
  },
];

const emptyForm = { name: "", email: "", phone: "" };

export default function BrandSponsor() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formdata, setFormdata] = useState(emptyForm);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!executeRecaptcha) {
      toast.error("reCAPTCHA is not ready. Please try again.");
      return;
    }

    setIsSubmitting(true);

    try {
      const captcha = await executeRecaptcha("submit");

      await submitShowcase({
        event_type_id: APP_EVENT_TYPE,
        form_type: FORM_TYPES.SHOWCASE,
        name: formdata.name,
        email: formdata.email,
        phone: formdata.phone,
        captcha,
      });

      toast.success("Thank you! Our team will get in touch with you shortly.");

      setFormdata(emptyForm);
    } catch (error) {
      toast.error(getErrorMessage(error, "Something went wrong"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full h-13 px-5 text-[15px] text-[#333] bg-[#f6f7f9] border border-[#dfe2e7] rounded-md placeholder:text-[#7b818c] focus:outline-none focus:bg-white focus:border-[#D0252D] focus:ring-2 focus:ring-[#D0252D]/15 transition";

  return (
    <section className="relative overflow-hidden bg-[#0d0d0d] font-roboto">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center grayscale opacity-40"
        style={{ backgroundImage: "url(/images/chess.jpg)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />

      {/* King piece */}
      <img
        src="/images/showcase-king.jpg"
        alt=""
        className="hidden 2xl:block absolute left-0 bottom-0 h-full w-auto max-w-[calc(50vw-36rem)] object-cover object-right [mask-image:linear-gradient(to_right,black_70%,transparent)]"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-14 md:py-16 grid grid-cols-1 lg:grid-cols-[1.45fr_1fr] gap-10 lg:gap-12 items-center">
        {/* TEXT */}
        <div className="text-white">
          <p className="flex items-center gap-5 text-[12px] md:text-[13px] tracking-[0.35em] uppercase text-white/80">
            <span className="block w-12 h-0.5 bg-[#e31e26]" />
            Partner with #TGM2026
          </p>

          <h2 className="mt-5 text-[44px] sm:text-[56px] md:text-[72px] font-bold leading-[0.95] tracking-tight">
            Showcase
            <br />
            <span className="text-[#e31e26]">Your Brand</span>
          </h2>

          <p className="mt-6 max-w-xl text-[15px] md:text-[17px] leading-relaxed text-white/85">
            Partnering with The Grand Masters 2026 Summit Series will enable you
            to showcase your brand, demonstrate your expertise and reach a
            unique, high-value audience of senior in-house counsel. Position
            your brand at the forefront of industry conversations and build
            meaningful connections across the legal ecosystem.
          </p>

          <ul className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-0 sm:divide-x sm:divide-white/15">
            {benefits.map((benefit) => (
              <li
                key={benefit.title}
                className="flex items-start gap-3 sm:px-4 first:sm:pl-0"
              >
                <span className="flex items-center justify-center shrink-0 w-12 h-12 rounded-full bg-white/10 text-[#e31e26]">
                  {benefit.icon}
                </span>
                <span>
                  <span className="block text-[14px] font-semibold leading-snug">
                    {benefit.title}
                  </span>
                  <span className="block mt-2 text-[12px] leading-relaxed text-white/70">
                    {benefit.text}
                  </span>
                </span>
              </li>
            ))}
          </ul>

          <Link
            href="/#connect"
            className="mt-9 inline-flex items-center justify-center gap-4 w-full sm:w-auto px-8 py-4 rounded-md bg-[#d0252d] hover:bg-[#b81e25] text-[11px] sm:text-[12px] font-bold tracking-[0.25em] uppercase transition"
          >
            Explore Sponsorship Opportunities
            <FaArrowRight size={13} />
          </Link>
        </div>

        {/* FORM */}
        <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 md:p-10">
          <span className="block w-14 h-0.5 bg-[#e31e26]" />
          <h3 className="mt-5 text-[30px] md:text-[36px] font-bold text-[#222]">
            Interested?
          </h3>
          <p className="mt-2 text-[15px] md:text-[16px] leading-relaxed text-[#6b7280]">
            Share your details and our team will get in touch with you to
            discuss sponsorship opportunities at #TGM2026.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <input
              type="text"
              name="name"
              required
              aria-label="Name"
              value={formdata.name}
              onChange={handleChange}
              placeholder="Name*"
              className={inputClass}
            />
            <input
              type="email"
              name="email"
              required
              aria-label="Email ID"
              value={formdata.email}
              onChange={handleChange}
              placeholder="Email ID*"
              className={inputClass}
            />
            <input
              type="tel"
              name="phone"
              required
              aria-label="Contact Number"
              value={formdata.phone}
              onChange={handleChange}
              placeholder="Contact Number*"
              className={inputClass}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-13 flex items-center justify-center gap-4 rounded-md bg-[#d0252d] text-white text-[12px] font-bold tracking-[0.3em] uppercase hover:bg-[#b81e25] transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Connect With Us"}
              {!isSubmitting && <FaArrowRight size={13} />}
            </button>

            <p className="text-center text-[12px] leading-relaxed text-[#8d93a0]">
              By submitting this form, you agree to be contacted by the TGM2026
              team regarding sponsorship opportunities.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
