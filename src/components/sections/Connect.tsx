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
  "flex items-center justify-center shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#fdecec] text-[#D0252D]";

export default function Connect() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#fafafa] to-[#f0eef0] font-roboto">
      {/* Chess artwork */}
      <img
        src="/images/connect-king.jpg"
        alt=""
        className="hidden lg:block absolute right-0 top-0 h-full w-[45%] object-cover object-left [mask-image:linear-gradient(to_right,transparent,black_12%)]"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-10 md:py-12">
        <div className="lg:w-[58%]">
          <span className="block w-16 h-1 bg-[#D0252D]" />
          <p className="mt-4 text-[12px] md:text-[14px] font-bold tracking-[0.4em] uppercase text-[#D0252D]">
            The Grand Masters 2026
          </p>

          <h2 className="mt-3 text-[48px] sm:text-[60px] md:text-[72px] font-bold leading-none tracking-tight text-[#141414]">
            Con<span className="text-[#D0252D]">nect</span>
          </h2>

          <p className="mt-4 max-w-2xl text-[16px] md:text-[18px] leading-relaxed text-[#555]">
            For participation, speaking opportunities, sponsorship partnerships
            or any other information related to The Grand Masters 2026 Summit
            Series, please get in touch with our team.
          </p>

          {/* Contacts */}
          <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-0 sm:divide-x sm:divide-[#dcdcdc]">
            {contacts.map((contact) => (
              <div
                key={contact.email}
                className="flex items-start gap-4 sm:px-6 first:sm:pl-0"
              >
                <span className={iconClass}>
                  <LuUser size={22} />
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

          <hr className="my-7 max-w-3xl border-[#dcdcdc]" />

          {/* Company Info */}
          <div className="flex items-start gap-4 md:gap-6">
            <span className={iconClass}>
              <LuBuilding2 size={22} />
            </span>
            <div>
              <p className="text-[16px] md:text-[19px] font-semibold text-[#141414]">
                Lex<span className="text-[#D0252D]"> Witness</span> –
                India&apos;s 1st Magazine on Legal & Corporate Affairs
              </p>
              <p className="mt-1 text-[15px] md:text-[17px] leading-relaxed text-[#555]">
                Suite 1/6, Lower Ground Floor, Block B, Hauz Khas,
                <br className="hidden sm:block" /> New Delhi – 110016
              </p>
              <a
                href="mailto:info@witnesslive.in"
                className="mt-2 inline-flex items-center gap-3 text-[15px] md:text-[17px] text-[#D0252D] hover:underline"
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
        className="lg:hidden w-full h-44 sm:h-60 object-cover object-[center_30%]"
      />
    </section>
  );
}
