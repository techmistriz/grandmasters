"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import toast from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa";
import {
  LuUsers,
  LuShare2,
  LuChartNoAxesColumnIncreasing,
  LuChevronDown,
} from "react-icons/lu";

import Counter from "@/src/components/common/Counter";
import { submitShowcase } from "@/src/services/showcase.service";
import { APP_EVENT_TYPE } from "@/src/config/eventType.config";
import { FORM_TYPES } from "@/src/config/showcase.config";
import { getErrorMessage } from "@/src/utils/error";

const stats = [
  { value: 7, label: "Cities" },
  { value: 200, suffix: "+", label: "Speakers" },
  { value: 35, suffix: "+", label: "Sessions" },
  { value: 700, suffix: "+", label: "Attendees" },
];

const features = [
  {
    icon: <LuUsers size={24} />,
    title: "Strategic Conversations",
    text: "On the issues that matter most.",
  },
  {
    icon: <LuShare2 size={24} />,
    title: "Elite Networking",
    text: "With India’s top legal minds.",
  },
  {
    icon: <LuChartNoAxesColumnIncreasing size={24} />,
    title: "High-Impact Participation",
    text: "Insights. Ideas. Real-world outcomes.",
  },
];

const countryCodes = ["+91", "+1", "+44", "+61", "+65", "+971"];

const emptyForm = { name: "", email: "", countryCode: "+91", phone: "" };

export default function WhyTGM() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [startCount, setStartCount] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formdata, setFormdata] = useState(emptyForm);

  // Start the counters once the stats scroll into view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true);
        }
      },
      { threshold: 0.3 },
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
        form_type: FORM_TYPES.NUMBER,
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
    <div className="relative overflow-hidden bg-[#0d0d0d] text-left font-roboto">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center grayscale opacity-30"
        style={{ backgroundImage: "url(/images/chess.jpg)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/40" />

      {/* King piece */}
      <img
        src="/images/why-tgm-king.jpg"
        alt=""
        className="hidden xl:block absolute top-0 left-[47%] h-full w-auto object-cover [mask-image:linear-gradient(to_right,transparent,black_25%,black_75%,transparent),linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] [mask-composite:intersect]"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-14 md:py-16 grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] xl:grid-cols-[1fr_420px] gap-10 lg:gap-12 items-center">
        {/* TEXT */}
        <div className="text-white xl:max-w-[700px]">
          <span className="block w-12 h-1 bg-[#e31e26]" />
          <p className="mt-6 text-[12px] md:text-[14px] font-semibold tracking-[0.4em] uppercase text-[#e31e26]">
            Why The Grand Masters?
          </p>

          <h2 className="mt-4 text-[36px] sm:text-[46px] md:text-[54px] font-bold leading-[1.08] tracking-tight">
            Where India&apos;s In-House Legal Leaders{" "}
            <span className="text-[#e31e26]">Converge</span>
          </h2>

          <p className="mt-5 max-w-xl text-[16px] md:text-[19px] leading-relaxed text-white/85">
            A premier platform for strategic conversations, elite networking and
            high-impact participation — shaping the next era of legal leadership
            in India.
          </p>

          {/* Stats */}
          <div
            ref={statsRef}
            className="mt-10 grid grid-cols-2 gap-y-8 sm:flex sm:divide-x sm:divide-white/25"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="sm:px-6 xl:px-8 first:sm:pl-0">
                <div className="text-[44px] md:text-[56px] font-bold leading-none">
                  {startCount ? (
                    <Counter end={stat.value} suffix={stat.suffix || ""} />
                  ) : (
                    0
                  )}
                </div>
                <div className="mt-3 text-[11px] md:text-[13px] font-semibold tracking-[0.35em] uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Features */}
          <ul className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {features.map((feature) => (
              <li key={feature.title} className="flex items-start gap-4">
                <span className="flex items-center justify-center shrink-0 w-13 h-13 rounded-full bg-[#d0252d] text-white">
                  {feature.icon}
                </span>
                <span>
                  <span className="block text-[13px] md:text-[14px] font-bold tracking-[0.15em] uppercase leading-snug">
                    {feature.title}
                  </span>
                  <span className="block mt-2 text-[14px] md:text-[15px] leading-snug text-white/75">
                    {feature.text}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* FORM */}
        <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 md:p-10">
          <span className="block w-12 h-1 bg-[#e31e26]" />
          <h3 className="mt-5 text-[32px] md:text-[42px] font-semibold leading-tight text-[#222]">
            I&apos;m Interested
          </h3>
          <p className="mt-2 text-[15px] md:text-[17px] leading-relaxed text-[#6b7280]">
            Share your details and our team will connect with you shortly.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <div>
              <input
                id="why-tgm-name"
                type="text"
                name="name"
                required
                value={formdata.name}
                onChange={handleChange}
                aria-label="Full Name"
                placeholder="Full Name*"
                className={inputClass}
              />
            </div>

            <div>
              <input
                id="why-tgm-email"
                type="email"
                name="email"
                required
                value={formdata.email}
                onChange={handleChange}
                aria-label="Email ID"
                placeholder="Email ID*"
                className={inputClass}
              />
            </div>

            <div>
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
                  id="why-tgm-phone"
                  type="tel"
                  name="phone"
                  required
                  value={formdata.phone}
                  onChange={handleChange}
                  aria-label="Contact Number"
                  placeholder="Contact Number*"
                  className={inputClass}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-13 flex items-center justify-center gap-3 rounded-md bg-[#d0252d] text-white text-[13px] md:text-[14px] font-bold tracking-[0.25em] uppercase hover:bg-[#b81e25] transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Register Your Interest"}
              {!isSubmitting && <FaArrowRight size={13} />}
            </button>

            <p className="text-[12px] md:text-[13px] leading-relaxed text-[#8d93a0]">
              By submitting, you agree to be contacted by the Lex Witness team
              regarding The Grand Masters.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
