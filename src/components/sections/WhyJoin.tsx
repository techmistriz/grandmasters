"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import toast from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa";
import {
  LuUsers,
  LuMic,
  LuFileText,
  LuHandshake,
  LuChevronDown,
} from "react-icons/lu";

import { submitShowcase } from "@/src/services/showcase.service";
import { APP_EVENT_TYPE } from "@/src/config/eventType.config";
import { FORM_TYPES } from "@/src/config/showcase.config";
import { getErrorMessage } from "@/src/utils/error";

const reasons = [
  {
    icon: <LuUsers size={26} />,
    text: "Connect with India’s leading in-house counsel community",
  },
  {
    icon: <LuMic size={26} />,
    text: "Explore speaking and participation opportunities",
  },
  {
    icon: <LuFileText size={26} />,
    text: "Discover summit agenda and strategic conversations",
  },
  {
    icon: <LuHandshake size={26} />,
    text: "Learn about sponsorship and partnership opportunities",
  },
];

const countryCodes = ["+91", "+1", "+44", "+61", "+65", "+971"];

const emptyForm = { name: "", email: "", countryCode: "+91", phone: "" };

export default function WhyJoin() {
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
        form_type: FORM_TYPES.AGENDA_HIGHLIGHTS,
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
    "w-full h-11 px-4 text-[15px] text-[#333] bg-white border border-[#dfe2e7] rounded-md placeholder:text-[#a3a8b3] focus:outline-none focus:border-[#D0252D] focus:ring-2 focus:ring-[#D0252D]/15 transition";

  return (
    <div className="mt-10 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1fr] gap-10 lg:gap-8 items-center text-left">
      {/* ILLUSTRATION */}
      <div className="flex justify-center md:col-span-2 lg:col-span-1">
        <img
          src="/images/why-join-tgm.jpg"
          alt="In-house counsel in discussion at The Grand Masters summit"
          className="w-full max-w-[560px] object-contain"
        />
      </div>

      {/* WHY JOIN */}
      <div>
        <h3 className="text-[26px] md:text-[30px] font-bold text-[#111] mb-7 text-center md:text-left">
          Why Join <span className="text-[#D0252D]">#TGM2026?</span>
        </h3>

        <ul className="space-y-6">
          {reasons.map((reason) => (
            <li key={reason.text} className="flex items-center gap-5">
              <span className="flex items-center justify-center shrink-0 w-16 h-16 rounded-full bg-[#fdecec] text-[#D0252D]">
                {reason.icon}
              </span>
              <span className="text-[16px] md:text-[17px] leading-snug text-[#333]">
                {reason.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* REGISTER INTEREST FORM */}
      <div className="bg-white border border-[#eceef1] rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] p-6 md:p-8">
        <h3 className="text-[26px] md:text-[30px] font-bold text-[#111]">
          Register Your Interest
        </h3>
        <p className="mt-2 text-[15px] text-[#6b7280]">
          Share your details and our team will connect with you shortly.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="interest-name"
              className="block mb-2 text-[15px] font-medium text-[#111]"
            >
              Full Name*
            </label>
            <input
              id="interest-name"
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
              htmlFor="interest-email"
              className="block mb-2 text-[15px] font-medium text-[#111]"
            >
              Email ID*
            </label>
            <input
              id="interest-email"
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
              htmlFor="interest-phone"
              className="block mb-2 text-[15px] font-medium text-[#111]"
            >
              Contact Number*
            </label>
            <div className="flex gap-2">
              <div className="relative shrink-0">
                <select
                  name="countryCode"
                  aria-label="Country code"
                  value={formdata.countryCode}
                  onChange={handleChange}
                  className="appearance-none h-11 pl-4 pr-9 text-[15px] text-[#333] bg-[#f6f7f9] border border-[#dfe2e7] rounded-md cursor-pointer focus:outline-none focus:border-[#D0252D]"
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
                id="interest-phone"
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
            className="w-full h-12 flex items-center justify-center gap-3 rounded-md bg-[#e31e26] text-white text-[15px] font-bold tracking-wider uppercase hover:bg-[#c8161d] transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Register Your Interest"}
            {!isSubmitting && <FaArrowRight size={14} />}
          </button>

          <p className="text-[13px] leading-relaxed text-[#8d93a0]">
            By submitting, you agree to be contacted by the Lex Witness team
            regarding The Grand Masters 2026.
          </p>
        </form>
      </div>
    </div>
  );
}
