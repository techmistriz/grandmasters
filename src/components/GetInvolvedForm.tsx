import React, { useRef, useState } from "react";
import bgImg from "../assets/images/chess.jpg";
import { submitShowcase } from "../services/showcase.service";
import { toast } from "sonner";
import ReCAPTCHA from "react-google-recaptcha";
import { APP_EVENT_TYPE } from "../constant/config";
import { FORM_TYPES } from "../constant/formtype";

const GetInvolvedForm = () => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const [captchaToken, setCaptchaToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    phone: "",
    confirmation: false,
  });

  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaToken) {
      toast.error("Please complete the reCAPTCHA.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        event_type_id: APP_EVENT_TYPE,
        form_type: FORM_TYPES.GET_INVOLVED,
        name: formdata.name,
        email: formdata.email,
        phone: formdata.phone,
        confirmation: formdata.confirmation,
        captcha: captchaToken,
      };

      await submitShowcase(payload);

      toast.success("Submitted successfully!");

      setFormdata({
        name: "",
        email: "",
        phone: "",
        confirmation: false,
      });

      recaptchaRef.current?.reset();
      setCaptchaToken("");
    } catch (error: any) {
      const message = error?.response?.data?.message || "Something went wrong";

      toast.error(message);

      recaptchaRef.current?.reset();
      setCaptchaToken("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata({
      ...formdata,
      confirmation: e.target.checked,
    });
  };

  return (
    <section className="relative min-h-[300px] md:min-h-[480px] flex items-center justify-center overflow-hidden">
      {/* Fixed Background Image */}
      <div
        className="absolute inset-0  bg-cover bg-center bg-no-repeat md:bg-fixed"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 container md:max-w-6xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-6 md:py-2 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        {/* Left Side: Text */}
        <div className="w-full lg:w-1/2 text-center text-white mt-0 lg:-mt-30">
          <h2 className="mb-4 text-3xl sm:text-4xl md:text-[50px] font-normal leading-tight md:leading-[55px] font-roboto">
            Get <br /> Involved
          </h2>
          <p className="tracking-wide text-white text-sm md:text-[15px] font-normal leading-relaxed md:leading-[28px] font-roboto px-2">
            All that You'd Like to Know about The Grand Masters 2026
          </p>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-1/2 max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6 font-roboto">
            <input
              type="text"
              name="name"
              value={formdata.name}
              onChange={handlechange}
              placeholder="Nelle Wilkinson"
              className="w-full text-[13px] tracking-tighter px-3 py-2.5 bg-white text-[#333] rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
            />
            <input
              type="email"
              name="email"
              value={formdata.email}
              onChange={handlechange}
              placeholder="helipi@mailinator.com"
              className="w-full text-[13px] px-3 py-2.5 bg-white text-[#333] rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
            />
            <input
              type="tel"
              name="phone"
              value={formdata.phone}
              onChange={handlechange}
              placeholder="+1 (961) 837-8638"
              className="w-full text-[13px] px-3 py-2.5 bg-white text-[#333] rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
            />

            {/* Checkbox */}
            <div className="flex items-start gap-3 py-">
              <input
                type="checkbox"
                id="updates"
                checked={formdata.confirmation}
                onChange={handleCheckboxChange}
                className="h-5 w-5 md:h-8 md:w-8 shrink-0 accent-[#8D93A0] cursor-pointer mt-1"
              />
              <label
                htmlFor="updates"
                className="text-white opacity-90 cursor-pointer text-sm md:text-[15px] font-normal leading-relaxed md:leading-[28px] font-roboto"
              >
                Please send me all Lex Witness Magazine, Events and other
                initiatives related updates.
              </label>
            </div>

            {/* Recaptcha Placeholder */}
            <div className="flex justify-start">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY_v2}
                onChange={(token) => {
                  setCaptchaToken(token || "");
                }}
                onExpired={() => {
                  setCaptchaToken("");
                }}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-[65%] sm:w-[130px] px-4 py-2 border rounded-sm border-white text-white font-medium uppercase text-sm hover:bg-[#d0252d] hover:text-white cursor-pointer transition-all duration-300 bg-black/30 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default GetInvolvedForm;
