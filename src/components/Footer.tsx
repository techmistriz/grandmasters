import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/image.png";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="w-full">
      {/* Top Section */}
      <div className="bg-[#e5e5e5] px-4 sm:px-6 md:px-10 lg:px-16 py-12 md:py-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 md:px-5 gap-10 lg:gap-14">
          {/* About */}
          <div>
            <h2 className="text-lg md:text-xl font-bold mb-5 font-roboto">
              About Lex <span className="text-[#D0252D]">Witness</span>
            </h2>

            <p className="text-[13px] leading-6 text-black font-roboto">
              Lex Witness, ever since its inception in 2009, has become India’s
              most credible platform for the legal luminaries here to opine,
              comment and share their views. With an interesting blend of
              opinion pieces, commentary, reportage, analysis, interviews and
              movements, Lex Witness is for the entire fraternity of In House
              and External Counsel besides key decision makers, luminaries,
              experts, policy makers, bureaucracy and the industry captains in
              India.
            </p>

            <div className="mt-8">
              <img
                src={logo}
                alt="Lex Witness"
                className="w-[180px] sm:w-[220px]"
              />
            </div>
          </div>

          {/* Showcase */}
          <div className="font-roboto">
            <h2 className="text-lg md:text-xl font-bold mb-5">
              Lex <span className="text-[#D0252D]">Witness</span> Summits
              Showcase
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-[13px] leading-6">
                  The 11th Annual IT Legal Summit 2026 / Bengaluru
                </h3>

                <p className="text-[13px] leading-6">
                  IT / ITeS / e-Commerce / Gaming & More
                </p>

                <p className="text-[13px] mt-2">
                  To access past editions, visit{" "}
                  <a
                    href="https://www.itlegalsummit.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D0252D] hover:underline"
                  >
                    www.itlegalsummit.com
                  </a>
                </p>
              </div>

              <div>
                <h3 className="font-bold text-[13px] leading-6">
                  The 12th Annual Grand Masters 2026
                </h3>

                <p className="text-[13px] leading-6 mt-2">
                  A 7-city pan-India General Counsel Summit Series
                </p>

                <ul className="mt-4 space-y-1 text-[13px] font-bold">
                  <li>Hyderabad Edition</li>
                  <li>Pune Edition</li>
                  <li>Chennai Edition</li>
                  <li>Ahmedabad Edition</li>
                  <li>New Delhi Edition</li>
                  <li>Mumbai Edition</li>
                  <li>Bengaluru Edition</li>
                </ul>

                <p className="text-[13px] mt-5">
                  To access past editions, visit{" "}
                  <a
                    href="https://www.grandmasters.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D0252D] hover:underline"
                  >
                    www.grandmasters.in
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Events */}
          <div className="font-roboto">
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-[13px] leading-6">
                  The 11th Annual Media, Advertising & Entertainment Legal
                  Summit 2026 / Mumbai
                </h3>

                <p className="text-[13px] leading-6">
                  A Cross-Sectional Legal Dig on M&E Sector & More
                </p>
                <p className="text-[13px] mt-2">
                  To access past editions, visit{" "}
                  <a
                    href="https://www.maels.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D0252D] hover:underline"
                  >
                    www.maels.in
                  </a>
                </p>
              </div>

              <div>
                <h3 className="font-bold text-[13px] leading-6">
                  The 12th Annual Pharma Legal & Compliance Summit 2026 / Mumbai
                </h3>

                <p className="text-[13px] leading-6">
                  Pharma / Healthcare / Medical Devices & More
                </p>

                <p className="text-[13px] mt-2">
                  To access past editions, visit{" "}
                  <a
                    href="https://www.plcs.co.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D0252D] hover:underline"
                  >
                    www.plcs.co.in
                  </a>
                </p>
              </div>

              <div>
                <h3 className="font-bold text-[13px] leading-6">
                  The 9th Annual Banking & Finance Legal Summit 2026 / Mumbai
                </h3>

                <p className="text-[13px] leading-6">
                  Banking / Crypto / Fintech & More
                </p>

                <p className="text-[13px] mt-2">
                  To access past editions, visit{" "}
                  <a
                    href="https://www.bfls.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D0252D] hover:underline"
                  >
                    www.bfls.in
                  </a>
                </p>
              </div>

              <div>
                <h3 className="font-bold text-[13px] leading-6">
                  The 13th Annual Real Estate & Construction Legal Summit 2027 /
                  New Delhi
                </h3>

                <p className="text-[13px] leading-6">
                  Real Estate / Infra / Construction & More
                </p>

                <p className="text-[13px] mt-2">
                  To access past editions, visit{" "}
                  <a
                    href="https://www.rcls.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D0252D] hover:underline"
                  >
                    www.rcls.in
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#1f2125] text-white px-4 sm:px-6 md:px-10 lg:px-16 md:py-5.5 py-5 font-roboto">
        <div className="max-w-6xl mx-auto flex flex-col md:px-4  lg:flex-row items-center justify-between gap-5 text-center lg:text-left">
          {/* Left */}
          <div className="text-[13px] leading-6">
            <p>
              Lex Witness - India's 1st Magazine on Legal & Corporate Affairs
            </p>
            <p>A Unit of SriGro Interactive Pvt Ltd.</p>
          </div>

          {/* Center */}
          <div className="hidden lg:flex items-center gap-8 text-[13px]">
            <span>|</span>
            <span>Rights of Admission Reserved</span>
            <span>|</span>
          </div>

          {/* Right */}
          <div className="flex flex-wrap justify-center gap-6 text-[13px]">
            <button
              onClick={() => navigate("/about-lex-witness/")}
              className="hover:text-[#D0252D] transition cursor-pointer"
            >
              About Lex Witness
            </button>

            <button
              onClick={() => navigate("/summit-secretariat/")}
              className="hover:text-[#D0252D] transition cursor-pointer"
            >
              Summit Secretariat
            </button>
          </div>
        </div>
      </div>

      {/* WhatsApp Button */}
      <div className="fixed bottom-8 right-4 md:bottom-24 md:right-6 z-50 group">
        {/* Tooltip */}
        <a
          href="https://api.whatsapp.com/send?phone=919899332111&text=Hello%2C%20I%20am%20interested%20in%20The%20Grand%20Masters%202026%20Summit%20Series"
          target="_blank"
          rel="noopener noreferrer"
          className="font-roboto absolute right-16 top-1/2 -translate-y-1/2 bg-[#25D366] text-white text-[15px] font-normal leading-6 px-3 py- rounded-lg opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2 transition-all duration-200 whitespace-nowrap cursor-pointer"
        >
          Get In Touch
        </a>

        {/* Button */}
        <a
          href="https://api.whatsapp.com/send?phone=919899332111&text=Hello%2C%20I%20am%20interested%20in%20The%20Grand%20Masters%202026%20Summit%20Series"
          target="_blank"
          rel="noopener noreferrer"
          className="
              bg-gradient-to-b
              from-[#5BF673]
              to-[#32C131]
              w-12 h-12 md:w-13 md:h-13
              rounded-xl
              flex items-center justify-center
              shadow-[0_8px_20px_rgba(50,193,49,0.35)]
              border border-[#74F58A]
              transition-all duration-300
            "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            className="w-6 h-6 md:w-9 md:h-9"
          >
            <path d="M20.52 3.48A11.79 11.79 0 0012.05 0C5.49 0 .14 5.35.14 11.91c0 2.1.55 4.15 1.59 5.96L0 24l6.33-1.66a11.84 11.84 0 005.72 1.46h.01c6.56 0 11.91-5.35 11.91-11.91 0-3.18-1.24-6.17-3.45-8.41zm-8.47 18.3h-.01a9.9 9.9 0 01-5.05-1.39l-.36-.21-3.76.99 1-3.66-.24-.38a9.86 9.86 0 01-1.51-5.24c0-5.46 4.44-9.9 9.91-9.9 2.64 0 5.12 1.03 6.98 2.89a9.83 9.83 0 012.89 6.98c0 5.47-4.44 9.91-9.9 9.91zm5.43-7.39c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15s-.77.97-.95 1.17c-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.48-.88-.79-1.48-1.77-1.65-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5s1.07 2.9 1.22 3.1c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" />
          </svg>
        </a>
      </div>
    </footer>
  );
}
