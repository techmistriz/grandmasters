import icon5 from "../assets/icons/icon5.png";

const SpecialDiscounts = () => {
  const discounts = [
    "Early Bird – 25% Discount for 1st 25 Seats",
    "Special 15% Discount for SILF Members",
    "Special 15% Discount for all IWIRC India Members",
    "Special Red Carpet for the Ladies – 10% Discount",
    "Lex Witness Subscribers – 10% Discount",
  ];

  return (
    <section className="py-8 md:pb-12 px-4 bg-white font-sans">
      <div className="max-w-4xl mx-auto text-center px-2">
        {/* Alarm Clock Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <img
              src={icon5}
              className="text-[#D0252D] w-10 h-10 md:w-28 md:h-22"
            />{" "}
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-[50px] font-normal font-roboto leading-tight md:leading-[55px] md:tracking-tighter text-[#333] mb-2">
          Avail Special Discounts
        </h2>

        <p className="text-[#333] text-sm md:text-[15px] font-normal leading-relaxed md:leading-[28px] font-roboto mb-8 md:mb-10 px-2">
          Limited Period{" "}
          <span className="text-[#D0252D]">Discounts & Offers</span>
        </p>

        {/* Discount List */}
        <div className="space-y-3 md:space-y-1 mb-8 md:mb-8">
          {discounts.map((text, index) => (
            <p
              key={index}
              className="text-[#333] text-sm md:text-[15px] font-bold leading-relaxed md:leading-[28px] font-roboto px-2"
            >
              {text}
            </p>
          ))}
        </div>

        {/* Footer Notes */}
        <div className="space-y-2 md:space-y-1 mt-2 md:-mt-5 px-2">
          <p className="text-[#333] italic text-sm md:text-[15px] font-normal leading-relaxed md:leading-[28px] font-roboto">
            *No 2 Discounts can be clubbed together
          </p>
          <p className="text-[#333] italic text-sm md:text-base">
            *Taxes Extra as Applicable
          </p>
        </div>
      </div>
    </section>
  );
};

export default SpecialDiscounts;
