import { LuUser, LuBuilding2, LuMail } from "react-icons/lu";

const contacts = [
  {
    name: "Bhupinder Kaur",
    phone: "+91 96541 55065",
    tel: "+919654155065",
    email: "bhupinder@witnesslive.in",
  },
  {
    name: "Neelima Maheshwari",
    phone: "+91 88008 41600",
    tel: "+918800841600",
    email: "neelima.maheshwari@witnesslive.in",
  },
];

const iconClass =
  "flex items-center justify-center shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#fdecec] text-[#D0252D]";

export default function Connect() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#fafafa] to-[#f0eef0] font-roboto">
      {/* Chess artwork */}
      <img
        src="/images/connect-king.jpg"
        alt=""
        className="hidden lg:block absolute right-0 top-0 h-full w-[45%] object-cover object-left [mask-image:linear-gradient(to_right,transparent,black_12%)]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-14 md:py-20">
        <div className="lg:w-[58%]">
          <span className="block w-16 h-1 bg-[#D0252D]" />
          <p className="mt-5 text-[12px] md:text-[14px] font-bold tracking-[0.4em] uppercase text-[#D0252D]">
            The Grand Masters 2026
          </p>

          <h2 className="mt-3 text-[56px] sm:text-[72px] md:text-[96px] font-bold leading-none tracking-tight text-[#141414]">
            Con<span className="text-[#D0252D]">nect</span>
          </h2>

          <p className="mt-6 max-w-2xl text-[16px] md:text-[19px] leading-relaxed text-[#555]">
            For participation, speaking opportunities, sponsorship partnerships
            or any other information related to The Grand Masters 2026 Summit
            Series, please get in touch with our team.
          </p>

          {/* Contacts */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-0 sm:divide-x sm:divide-[#dcdcdc]">
            {contacts.map((contact) => (
              <div
                key={contact.email}
                className="flex items-start gap-4 sm:px-6 first:sm:pl-0"
              >
                <span className={iconClass}>
                  <LuUser size={26} />
                </span>
                <div className="min-w-0">
                  <p className="text-[18px] md:text-[20px] font-semibold text-[#141414]">
                    {contact.name}
                  </p>
                  <a
                    href={`tel:${contact.tel}`}
                    className="block mt-1 text-[17px] md:text-[19px] text-[#444] hover:text-[#D0252D]"
                  >
                    {contact.phone}
                  </a>
                  <a
                    href={`mailto:${contact.email}`}
                    className="block mt-1 text-[15px] text-[#D0252D] break-all xl:break-normal xl:whitespace-nowrap hover:underline"
                  >
                    {contact.email}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <hr className="my-10 max-w-3xl border-[#dcdcdc]" />

          {/* Company Info */}
          <div className="flex items-start gap-4 md:gap-6">
            <span className={iconClass}>
              <LuBuilding2 size={26} />
            </span>
            <div>
              <p className="text-[16px] md:text-[19px] font-semibold text-[#141414]">
                <span className="text-[#D0252D]">Lex Witness</span> –
                India&apos;s 1st Magazine on Legal & Corporate Affairs
              </p>
              <p className="mt-2 text-[15px] md:text-[17px] leading-relaxed text-[#555]">
                Suite 1/6, Lower Ground Floor, Block B, Hauz Khas,
                <br className="hidden sm:block" /> New Delhi – 110016
              </p>
              <a
                href="mailto:info@witnesslive.in"
                className="mt-3 inline-flex items-center gap-3 text-[15px] md:text-[17px] text-[#D0252D] hover:underline"
              >
                <LuMail size={18} />
                info@witnesslive.in
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Chess artwork on small screens */}
      <img
        src="/images/connect-king.jpg"
        alt=""
        className="lg:hidden w-full h-64 sm:h-80 object-cover object-[center_60%]"
      />
    </section>
  );
}
