"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import toast from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa";
import {
  LuMic,
  LuHandshake,
  LuImage,
  LuUsers,
  LuArrowRight,
  LuChevronDown,
} from "react-icons/lu";

import { submitShowcase } from "@/src/services/showcase.service";
import { APP_EVENT_TYPE } from "@/src/config/eventType.config";
import { FORM_TYPES } from "@/src/config/showcase.config";
import { getErrorMessage } from "@/src/utils/error";

const cards = [
  {
    icon: <LuMic size={24} />,
    title: "Speak",
    text: "Apply as a speaker",
    href: "/#speak",
  },
  {
    icon: <LuHandshake size={24} />,
    title: "Sponsor",
    text: "Explore partnership opportunities",
    href: "/#brand-sponsor",
  },
  {
    icon: <LuImage size={24} />,
    title: "Summit Gallery",
    text: "View summit moments",
    href: "/#gallery",
  },
  {
    icon: <LuUsers size={24} />,
    title: "Connect",
    text: "Reach the TGM team",
    href: "/#connect",
  },
];

const countryCodes = ["+91", "+1", "+44", "+61", "+65", "+971"];

const emptyForm = { name: "", email: "", countryCode: "+91", phone: "" };

// The "Get Involved" band above Meet The Grand Masters, with quick links
// and an I'm Interested form.
export default function GetInvolvedBanner() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formdata, setFormdata] = useState(emptyForm);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
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
        form_type: FORM_TYPES.GET_INVOLVED,
        name: formdata.name,
        email: formdata.email,
        // Indian numbers go as plain digits, as the API expects; others
        // keep their country code so they stay reachable.
        phone:
          formdata.countryCode === "+91"
            ? formdata.phone
            : `${formdata.countryCode} ${formdata.phone}`,
        captcha,
      });

      toast.success("Thank you! Our team will connect with you shortly.");

      setFormdata(emptyForm);
    } catch (error) {
      toast.error(getErrorMessage(error, "Something went wrong"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full h-12 px-4 text-[15px] text-[#333] bg-white border border-[#dfe2e7] rounded-md placeholder:text-[#9aa0aa] focus:outline-none focus:border-[#D0252D] focus:ring-2 focus:ring-[#D0252D]/15 transition";

  return (
    <div className="relative overflow-hidden bg-[#0b0b0b] text-left font-roboto">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center grayscale opacity-30"
        style={{ backgroundImage: "url(/images/chess.jpg)" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_60%,rgba(208,37,45,0.45),transparent_55%)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/30" />

      {/* King piece */}
      <img
        src="/images/get-involved-banner-king.jpg"
        alt=""
        className="hidden xl:block absolute top-[10%] left-[47%] h-[62%] w-auto object-cover [mask-image:linear-gradient(to_right,transparent,black_30%,black_70%,transparent),linear-gradient(to_bottom,transparent,black_20%,black_70%,transparent)] [mask-composite:intersect]"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-14 md:py-16 grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] xl:grid-cols-[1fr_420px] gap-10 lg:gap-12 items-center">
        {/* TEXT + CARDS */}
        <div className="text-white">
          <span className="block w-14 h-1 bg-[#e31e26]" />
          <p className="mt-6 text-[12px] md:text-[14px] font-semibold tracking-[0.4em] uppercase text-[#e31e26]">
            The Grand Masters 2026
          </p>

          <h2 className="mt-3 text-[48px] sm:text-[64px] md:text-[80px] font-bold leading-none tracking-tight">
            Get <span className="text-[#e31e26]">Involved</span>
          </h2>

          <p className="mt-5 max-w-[640px] text-[22px] sm:text-[28px] md:text-[34px] font-semibold leading-tight">
            All That You&apos;d Like to Know about The Grand Masters 2026
          </p>

          <p className="mt-4 max-w-xl text-[16px] md:text-[20px] leading-relaxed text-white/80">
            Explore speaking, sponsorship, summit access and connect
            opportunities.
          </p>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 xl:max-w-[990px]">
            {cards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="group flex flex-col rounded-lg border border-[#e31e26]/40 bg-black/45 backdrop-blur-[2px] p-4 md:p-5 transition hover:border-[#e31e26] hover:bg-black/60"
              >
                <span className="flex items-center justify-center w-13 h-13 md:w-15 md:h-15 rounded-full bg-gradient-to-br from-[#e31e26] to-[#8f1218] text-white">
                  {card.icon}
                </span>
                <span className="mt-4 text-[19px] md:text-[22px] font-bold leading-tight">
                  {card.title}
                </span>
                <span className="mt-2 text-[14px] md:text-[16px] leading-snug text-white/85">
                  {card.text}
                </span>
                <span className="mt-auto pt-5">
                  <span className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full border border-white/80 transition group-hover:bg-[#e31e26] group-hover:border-[#e31e26]">
                    <LuArrowRight size={18} />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* FORM */}
        <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 md:p-10">
          <span className="block w-12 h-1 bg-[#e31e26]" />
          <h3 className="mt-5 text-[32px] md:text-[42px] font-bold leading-tight tracking-tight text-[#141414]">
            I&apos;m Interested
          </h3>
          <p className="mt-2 text-[15px] md:text-[17px] leading-relaxed text-[#555]">
            Share your details and our team will connect with you shortly.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <div>
              <label
                htmlFor="gi-banner-name"
                className="block mb-2 text-[15px] font-semibold text-[#222]"
              >
                Name <span className="text-[#e31e26]">*</span>
              </label>
              <input
                id="gi-banner-name"
                type="text"
                name="name"
                required
                value={formdata.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="gi-banner-email"
                className="block mb-2 text-[15px] font-semibold text-[#222]"
              >
                Email ID <span className="text-[#e31e26]">*</span>
              </label>
              <input
                id="gi-banner-email"
                type="email"
                name="email"
                required
                value={formdata.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="gi-banner-phone"
                className="block mb-2 text-[15px] font-semibold text-[#222]"
              >
                Contact Number <span className="text-[#e31e26]">*</span>
              </label>
              <div className="flex gap-2">
                <div className="relative shrink-0">
                  <select
                    name="countryCode"
                    aria-label="Country code"
                    value={formdata.countryCode}
                    onChange={handleChange}
                    className="appearance-none h-12 pl-4 pr-9 text-[15px] text-[#333] bg-[#f6f7f9] border border-[#dfe2e7] rounded-md cursor-pointer focus:outline-none focus:border-[#D0252D]"
                  >
                    {countryCodes.map((code) => (
                      <option key={code} value={code}>
                        {code}
                      </option>
                    ))}
                  </select>
                  <LuChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#555]"
                  />
                </div>
                <input
                  id="gi-banner-phone"
                  type="tel"
                  name="phone"
                  required
                  value={formdata.phone}
                  onChange={handleChange}
                  placeholder="Enter your contact number"
                  className={inputClass}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-13 flex items-center justify-center gap-3 rounded-md bg-[#e31e26] text-white text-[16px] md:text-[18px] font-semibold hover:bg-[#c8161d] transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Register Your Interest"}
              {!isSubmitting && <FaArrowRight size={14} />}
            </button>

            <p className="text-[12px] md:text-[13px] leading-relaxed text-[#6b7280]">
              By submitting, you agree to be contacted by the Lex Witness team
              regarding The Grand Masters.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
