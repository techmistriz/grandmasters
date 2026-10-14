import OfficialMessages from "../components/OfficialMessageSidebar";
import SponsorsCarousel from "../components/SponsorsCarousel";

const AboutUs = () => {
  return (
    <div className="font-roboto min-h-screen mt-16 md:mt-[98px]">
      {/* Header */}
      <div className="bg-[#D12229] py-5 md:py-6">
        <h1 className="text-white text-center text-3xl sm:text-4xl md:text-[50px] font-normal leading-tight md:leading-[55px] tracking-tight px-4">
          A Bit About Us
        </h1>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-8 lg:gap-10">
          {/* Left Content */}
          <div>
            <h2 className="text-[#333] text-[15px] font-bold leading-7">
              Why Lex <span className="text-[#d12229]">Witness?</span>
            </h2>
            <div className="mt-2 text-[15px] leading-7 text-[#333]">
              <p className="mb-3">
                The Indian legal universe has close to 5 million individuals.
                This represents highest number in the world who, directly or
                indirectly, are a part of it. Lex Witness is a high quality
                monthly magazine with the power of fresh and original content
                that deals exclusively with subjects on legality. Some of
                India’s top-notch practitioners and experts contribute in Lex
                Witness on subjects relevant to all stakeholders in this
                profession.
              </p>
              <p>
                Lex Witness, ever since its inception in 2009, has become
                India’s most credible platform for the legal luminaries here to
                opine, comment and share their views. With an interesting blend
                of opinion pieces, commentary, reportage, analysis, interviews
                and movements, Lex Witness is for the entire fraternity of In
                House and External Counsel besides key decision makers,
                luminaries, experts, policy makers, bureaucracy and the industry
                captains in India.
              </p>
            </div>

            <h2 className="font-bold text-[#333] text-[15px] mt-6">
              A Must Read
            </h2>

            <p className="mt-2 text-[15px] leading-7 text-[#333]">
              The readers of Lex Witness are high-profile, influential HNI’s.
              They are the ones who frame the laws and the ones who practice it.
              Lex Witness covers an interesting bandwidth of readers right from
              the core legal community of the country that includes the Hon’ble
              Judges, Lawyers, Bureaucrats, Corporate Legal Professionals and
              other allied professionals. Lex Witness is available in all the
              major metropolitan cities of the country and not only India, Lex
              Witness has a prompt presence in the global legal community as
              well.
            </p>

            <p className="mt-4 text-[15px] leading-7 text-[#333]">
              For a better understanding of Lex Witness please go through{" "}
              <span className="font-bold text-[#d12229] cursor-pointer hover:underline">
                The Lex Witness Brand Deck
              </span>
            </p>
          </div>

          {/* Sidebar */}
          <div className="w-full">
            <OfficialMessages />
          </div>
        </div>

        {/* Sponsors */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-center my-10 md:mt-16">
          Sponsors & Partners
        </h1>
        <SponsorsCarousel />
      </div>
    </div>
  );
};

export default AboutUs;
