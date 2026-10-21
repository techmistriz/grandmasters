"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import toast from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa";
import {
  LuUsers,
  LuMic,
  LuChartNoAxesColumnIncreasing,
  LuChevronDown,
} from "react-icons/lu";

import { submitShowcase } from "@/src/services/showcase.service";
import { APP_EVENT_TYPE } from "@/src/config/eventType.config";
import { FORM_TYPES } from "@/src/config/showcase.config";
import { getErrorMessage } from "@/src/utils/error";

const highlights = [
  {
    icon: <LuUsers size={26} />,
    title: "Engage",
    text: "with India’s in-house counsel community",
  },
  {
    icon: <LuMic size={26} />,
    title: "Explore",
    text: "speaking, partnership and sponsorship opportunities",
  },
  {
    icon: <LuChartNoAxesColumnIncreasing size={26} />,
    title: "Stay Updated",
    text: "on agenda themes, speakers and key developments",
  },
];

const countryCodes = [
  { code: "+91", flag: "🇮🇳" },
  { code: "+1", flag: "🇺🇸" },
  { code: "+44", flag: "🇬🇧" },
  { code: "+61", flag: "🇦🇺" },
  { code: "+65", flag: "🇸🇬" },
  { code: "+971", flag: "🇦🇪" },
];

const emptyForm = { name: "", email: "", countryCode: "+91", phone: "" };

export default function GetInvolvedForm() {
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

      toast.success("Thank you! The Lex Witness team will connect with you.");

      setFormdata(emptyForm);
    } catch (error) {
      toast.error(getErrorMessage(error, "Something went wrong"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full h-12 px-4 text-[15px] text-[#333] bg-[#f6f7f9] border border-[#dfe2e7] rounded-md placeholder:text-[#9aa0aa] focus:outline-none focus:bg-white focus:border-[#D0252D] focus:ring-2 focus:ring-[#D0252D]/15 transition";

  return (
    <section className="relative overflow-hidden bg-[#f7f7f8] font-roboto py-14 md:py-20 px-4 sm:px-6">
      {/* Soft background accents */}
      <span className="absolute -left-40 bottom-[-120px] w-[480px] h-[480px] rounded-full bg-[#fdecec]" />
      <span className="absolute -right-24 top-1/3 w-64 h-64 rounded-full bg-[#fdecec]" />

      <div className="relative z-10 max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-[1.9fr_1fr] gap-6">
        {/* INFO CARD */}
        <div className="relative overflow-hidden bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] p-6 sm:p-10 md:p-12">
          <img
            src="/images/get-involved-king.jpg"
            alt=""
            className="hidden md:block absolute right-0 top-0 h-[78%] w-auto max-w-[45%] object-cover object-left [mask-image:linear-gradient(to_right,transparent,black_25%),linear-gradient(to_top,transparent,black_20%)] [mask-composite:intersect]"
          />

          <div className="relative md:max-w-[62%]">
            <span className="block w-16 h-1 bg-[#D0252D]" />
            <p className="mt-5 text-[12px] md:text-[15px] font-bold tracking-[0.25em] uppercase text-[#D0252D]">
              The Grand Masters 2026
            </p>

            <h2 className="mt-4 text-[34px] sm:text-[44px] md:text-[54px] font-bold leading-[1.1] tracking-tight text-[#141414]">
              Be Part of India&apos;s
              <br />
              <span className="text-[#D0252D]">
                Premier In-House Counsel Gathering
              </span>
            </h2>

            <p className="mt-5 text-[16px] md:text-[19px] leading-relaxed text-[#555]">
              Join leading General Counsels, Chief Legal Officers and senior
              in-house legal leaders for high-impact conversations, insights and
              new opportunities.
            </p>
          </div>

          <ul className="relative mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-0 sm:divide-x sm:divide-[#e3e3e3]">
            {highlights.map((item) => (
              <li key={item.title} className="text-center sm:px-6">
                <span className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-[#fdecec] text-[#D0252D]">
                  {item.icon}
                </span>
                <p className="mt-4 text-[17px] md:text-[19px] font-bold uppercase text-[#141414]">
                  {item.title}
                </p>
                <p className="mt-1 text-[15px] md:text-[17px] leading-snug text-[#555]">
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* FORM CARD */}
        <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] p-6 sm:p-10">
          <span className="block w-16 h-1 bg-[#D0252D]" />
          <h3 className="mt-6 text-[34px] md:text-[44px] font-bold leading-tight text-[#141414]">
            I&apos;m <span className="text-[#D0252D]">Interested!</span>
          </h3>
          <p className="mt-2 text-[16px] md:text-[18px] leading-relaxed text-[#555]">
            Share your details and the Lex Witness team will connect with you.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <div>
              <label
                htmlFor="involved-name"
                className="block mb-2 text-[16px] font-semibold text-[#141414]"
              >
                Name*
              </label>
              <input
                id="involved-name"
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
                htmlFor="involved-email"
                className="block mb-2 text-[16px] font-semibold text-[#141414]"
              >
                Email ID*
              </label>
              <input
                id="involved-email"
                type="email"
                name="email"
                required
                value={formdata.email}
                onChange={handleChange}
                placeholder="Enter your business email"
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="involved-phone"
                className="block mb-2 text-[16px] font-semibold text-[#141414]"
              >
                Contact Number*
              </label>
              <div className="flex h-12 bg-[#f6f7f9] border border-[#dfe2e7] rounded-md focus-within:bg-white focus-within:border-[#D0252D] focus-within:ring-2 focus-within:ring-[#D0252D]/15 transition">
                <div className="relative shrink-0 border-r border-[#dfe2e7]">
                  <select
                    name="countryCode"
                    aria-label="Country code"
                    value={formdata.countryCode}
                    onChange={handleChange}
                    className="appearance-none h-full pl-4 pr-9 text-[15px] text-[#333] bg-transparent cursor-pointer focus:outline-none"
                  >
                    {countryCodes.map(({ code, flag }) => (
                      <option key={code} value={code}>
                        {flag} {code}
                      </option>
                    ))}
                  </select>
                  <LuChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#555]"
                  />
                </div>
                <input
                  id="involved-phone"
                  type="tel"
                  name="phone"
                  required
                  value={formdata.phone}
                  onChange={handleChange}
                  placeholder="Enter your contact number"
                  className="flex-1 min-w-0 px-4 text-[15px] text-[#333] bg-transparent placeholder:text-[#9aa0aa] focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-13 flex items-center justify-center gap-3 rounded-md bg-[#e31e26] text-white text-[15px] md:text-[17px] font-bold tracking-wider uppercase hover:bg-[#c8161d] transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Connect With TGM 2026"}
              {!isSubmitting && <FaArrowRight size={14} />}
            </button>

            <p className="text-[13px] md:text-[14px] leading-relaxed text-[#6b7280]">
              By submitting your details, you consent to being contacted by the
              Lex Witness team regarding The Grand Masters 2026 and related
              initiatives.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
