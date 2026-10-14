export default function ContactSection() {
  return (
    <section className="bg-white py-12 md:pb-15 px-4">
      <div className="max-w-3xl mx-auto  text-center">
        {/* Heading */}
        <h1 className="font-roboto text-3xl sm:text-4xl md:text-[50px] font-normal leading-tight md:leading-[55px] text-[#333] mb-4">
          Connect
        </h1>

        {/* Intro */}
        <p className="font-roboto text-[14px] md:text-[15px] font-bold leading-[24px] md:leading-[28px] text-[#333] mb-1">
          In order to participate at The Grand Masters 2026 Summit Series,
          please get in touch with:
        </p>

        {/* Contacts */}
        <div className="space-y-1 text-[#333] text-[14px] md:text-[15px] font-normal leading-[24px] md:leading-[28px] font-roboto">
          <p className="break-words">
            Bhupinder Kaur | +91-9654155065 |{" "}
            <a
              href="mailto:bhupinder@witnesslive.in"
              className="text-[#D2520D] hover:underline"
            >
              bhupinder@witnesslive.in
            </a>
          </p>

          <p className="break-words">
            Neelima Maheshwari | +91-8800841600 |{" "}
            <a
              href="mailto:neelima.maheshwari@witnesslive.in"
              className="text-[#D2520D] hover:underline"
            >
              neelima.maheshwari@witnesslive.in
            </a>
          </p>
        </div>

        {/* Company Info */}
        <div className="mt-10 md:mt-6 space-y-2 text-[#333]">
          <h2 className="font-roboto text-[14px] md:text-[15px] font-bold leading-[24px] md:leading-[28px]">
            <span className="text-[#D2520D]">Lex Witness</span> – India's 1st
            Magazine on Legal & Corporate Affairs
          </h2>

          <p className="font-roboto text-[14px] md:text-[15px] font-normal leading-[24px] md:leading-[28px]">
            Suite 1/6, Lower Ground Floor, Block B, Hauz Khas,
            <br className="hidden sm:block" />
            New Delhi - 110016
          </p>

          <p className="font-roboto text-[14px] md:text-[15px] break-words">
            <span className="font-semibold">E:</span>{" "}
            <a
              href="mailto:info@witnesslive.in"
              className="text-[#D2520D] hover:underline"
            >
              info@witnesslive.in
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
