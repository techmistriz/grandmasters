import Link from "next/link";

export default function BrandSponsor() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center md:bg-fixed"
        style={{ backgroundImage: "url(/images/chess.jpg)" }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-5 md:px-16">
        <div className="bg-[#D0252D] text-white text-center shadow-2xl p-6 sm:p-8 md:p-6 md:m-6">
          <h2 className="font-roboto text-3xl sm:text-4xl md:text-[50px] font-bold leading-tight md:leading-[55px] mb-4 md:mb-4">
            Showcase Your Brand
          </h2>

          <p className="font-roboto max-w-4xl mx-auto text-sm sm:text-[15px] font-normal leading-7 md:leading-[28px] opacity-95 mb-6 md:mb-6">
            Partnering with The Grand Masters 2026 Summit Series will enable you
            to brand and promote your service expertise to a unique and
            interested set of senior in-house counsel. Summit attendees include
            senior professionals interested in updating their knowledge and
            involved in legal and commercial elements of complex business deals.
          </p>

          <div className="flex justify-center">
            <Link
              href="/#connect"
              className="block font-custom w-full sm:w-auto border border-white px-6 sm:px-8 md:px-6 py-4 md:py-5 sm:py-5 rounded-sm text-[10px] sm:text-[11px] font-bold tracking-[0.15rem] md:tracking-[0.6em] md:leading-[11px] sm:tracking-[0.3rem] uppercase  hover:bg-white hover:text-[#D0252D] transition-all duration-300 cursor-pointer"
            >
              Explore Sponsorship Opportunities
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
