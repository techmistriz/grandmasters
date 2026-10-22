"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import toast from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa";
import { LuUsers, LuMic, LuHeartHandshake } from "react-icons/lu";

import { submitShowcase } from "@/src/services/showcase.service";
import { APP_EVENT_TYPE } from "@/src/config/eventType.config";
import { FORM_TYPES } from "@/src/config/showcase.config";
import { getErrorMessage } from "@/src/utils/error";

const highlights = [
  { icon: <LuUsers size={26} />, lines: ["Engage with", "Industry Leaders"] },
  { icon: <LuMic size={26} />, lines: ["Share", "Your Expertise"] },
  {
    icon: <LuHeartHandshake size={26} />,
    lines: ["Expand", "Your Network"],
  },
];

const emptyForm = { name: "", email: "", phone: "" };

// "Join the Speakers' Lounge" band above The Summit Agenda.
export default function SpeakersLounge() {
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
        form_type: FORM_TYPES.SPEAKERS,
        name: formdata.name,
        email: formdata.email,
        phone: formdata.phone,
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
    "w-full h-13 px-5 text-[15px] text-[#333] bg-[#f6f7f9] border border-[#dfe2e7] rounded-md placeholder:text-[#8d93a0] focus:outline-none focus:bg-white focus:border-[#D0252D] focus:ring-2 focus:ring-[#D0252D]/15 transition";

  return (
    <div className="bg-[#f4f5f7] text-left font-roboto px-4 sm:px-6 py-12 md:py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        {/* INFO CARD */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-[#f1f1f3] shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-6 sm:p-10 md:p-14">
          <img
            src="/images/speakers-lounge-king.jpg"
            alt=""
            className="hidden md:block absolute right-0 top-0 h-[80%] w-auto max-w-[42%] object-cover object-left [mask-image:linear-gradient(to_right,transparent,black_30%),linear-gradient(to_bottom,black_75%,transparent)] [mask-composite:intersect]"
          />

          <div className="relative md:max-w-[68%]">
            <p className="text-[12px] md:text-[14px] tracking-[0.35em] uppercase text-[#D0252D]">
              The Grand Masters 2026
            </p>
            <span className="block mt-4 w-12 h-0.5 bg-[#D0252D]" />

            <p className="mt-8 text-[22px] md:text-[30px] font-bold text-[#D0252D]">
              Interested in Speaking?
            </p>

            <h2 className="mt-3 text-[44px] sm:text-[58px] md:text-[72px] font-extrabold leading-[1.02] tracking-tight text-[#111]">
              Join the
              <br />
              <span className="text-[#D0252D]">Speakers&apos;</span> Lounge
            </h2>

            <p className="mt-4 text-[26px] md:text-[38px] font-light text-[#222]">
              Showcase Your Expertise
            </p>

            <p className="mt-4 max-w-xl text-[16px] md:text-[19px] leading-relaxed text-[#555]">
              Connect with India&apos;s elite in-house counsel community and
              explore speaking opportunities at The Grand Masters 2026.
            </p>
          </div>

          <ul className="relative mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-0 sm:divide-x sm:divide-[#e0e0e0]">
            {highlights.map((item) => (
              <li
                key={item.lines.join(" ")}
                className="flex items-center gap-4 sm:px-6 first:sm:pl-0"
              >
                <span className="flex items-center justify-center shrink-0 w-16 h-16 md:w-18 md:h-18 rounded-full bg-[#fdecec] text-[#D0252D]">
                  {item.icon}
                </span>
                <span className="text-[16px] md:text-[19px] font-medium leading-snug text-[#222]">
                  {item.lines[0]}
                  <br />
                  {item.lines[1]}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* FORM CARD */}
        <div className="rounded-2xl bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-6 sm:p-10">
          <span className="block w-14 h-1 bg-[#D0252D]" />
          <h3 className="mt-6 text-[34px] md:text-[38px] xl:text-[42px] font-extrabold leading-tight text-[#111]">
            I&apos;m Interested!
          </h3>
          <p className="mt-2 text-[16px] md:text-[18px] leading-relaxed text-[#555]">
            Share your details and our team will connect with you shortly.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <input
                id="lounge-name"
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
                id="lounge-email"
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
              <input
                id="lounge-phone"
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

            <p className="text-[13px] text-[#6b7280]">
              *All fields are mandatory
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-15 flex items-center justify-center gap-4 rounded-md bg-[#D0252D] text-white text-[18px] md:text-[20px] font-semibold shadow-[0_10px_25px_rgba(208,37,45,0.3)] hover:bg-[#b81e25] transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit Interest"}
              {!isSubmitting && <FaArrowRight size={16} />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
