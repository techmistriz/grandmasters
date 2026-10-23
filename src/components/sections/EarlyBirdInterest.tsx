"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import toast from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa";
import { LuMail, LuPhone, LuUser } from "react-icons/lu";

import { submitShowcase } from "@/src/services/showcase.service";
import { APP_EVENT_TYPE } from "@/src/config/eventType.config";
import { FORM_TYPES } from "@/src/config/showcase.config";
import { getErrorMessage } from "@/src/utils/error";

const fields = [
  {
    name: "name",
    type: "text",
    placeholder: "Full Name*",
    label: "Full Name",
    autoComplete: "name",
    Icon: LuUser,
  },
  {
    name: "email",
    type: "email",
    placeholder: "Email ID*",
    label: "Email ID",
    autoComplete: "email",
    Icon: LuMail,
  },
  {
    name: "phone",
    type: "tel",
    placeholder: "Contact Number*",
    label: "Contact Number",
    autoComplete: "tel",
    Icon: LuPhone,
  },
] as const;

const emptyForm = { name: "", email: "", phone: "" };

// Early bird offer banner with an I'm Interested form, shown above the
// delegate registration plans (same layout as BFLS).
export default function EarlyBirdInterest() {
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
        form_type: FORM_TYPES.EARLY_BIRD,
        name: formdata.name,
        email: formdata.email,
        phone: formdata.phone,
        captcha,
      });

      toast.success("Thank you for your interest!");

      setFormdata(emptyForm);
    } catch (error) {
      toast.error(getErrorMessage(error, "Something went wrong"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mb-14 grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-10">
      <img
        src="/images/early-bird-offer.png"
        alt="Early Bird Offer: flat 25% off, valid for the first 25 seats only"
        className="h-auto w-full"
      />

      <div className="rounded-2xl bg-white px-6 py-7 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.25)] sm:px-8">
        <span className="mx-auto block w-12 h-1 bg-[#D0252D]" />
        <h3 className="mt-4 mb-5 text-center text-[28px] sm:text-[32px] font-extrabold leading-tight text-[#141414]">
          I&apos;m <span className="text-[#D0252D]">Interested!</span>
        </h3>

        <form onSubmit={handleSubmit} className="space-y-3">
          {fields.map(
            ({ name, type, placeholder, label, autoComplete, Icon }) => (
              <div key={name} className="relative">
                <Icon
                  aria-hidden
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8d93a0]"
                />
                <input
                  id={`early-bird-${name}`}
                  type={type}
                  name={name}
                  required
                  value={formdata[name]}
                  onChange={handleChange}
                  autoComplete={autoComplete}
                  aria-label={label}
                  placeholder={placeholder}
                  className="w-full h-13 pl-12 pr-4 text-[15px] text-[#333] bg-[#f6f7f9] border border-[#dfe2e7] rounded-md placeholder:text-[#8d93a0] focus:outline-none focus:bg-white focus:border-[#D0252D] focus:ring-2 focus:ring-[#D0252D]/15 transition"
                />
              </div>
            ),
          )}

          <p className="text-[13px] text-[#6b7280]">
            *All fields are mandatory
          </p>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 flex items-center justify-center gap-3 rounded-md bg-[#D0252D] text-white text-[17px] font-bold shadow-[0_10px_25px_rgba(208,37,45,0.3)] hover:bg-[#b81e25] transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Register Interest"}
            {!isSubmitting && <FaArrowRight size={14} />}
          </button>
        </form>
      </div>
    </div>
  );
}
