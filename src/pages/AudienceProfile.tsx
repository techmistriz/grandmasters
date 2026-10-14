import React from "react";
import OfficialMessages from "../components/OfficialMessageSidebar";
import SponsorsCarousel from "../components/SponsorsCarousel";

const organizations = [
  ["3M India", "9X Media", "ABB India"],
  ["Accel Partners", "Accenture", "ACCOR"],
  ["Accuracy", "Adani Group", "Adani Ports And SEZ"],
  ["Adidas Group", "Aditya Birla Fashion and Retail", "ADP India"],
  ["Advaya Legal", "AGS Health", "Ahuja Group"],
  ["Air Infotech", "Airtel", "AkzoNobel India"],
  ["ALMT Legal", "Alpha Partners", "Alstom"],
  ["Amar Chitra Katha", "Amar Ujala Publications", "Amazon.in"],
  ["Amdipharm Mercury (AMCo) Group", "American Express", "American Towers"],
  ["Amicus Services", "Amira Nature Foods", "Anantraj"],
  [
    "Ani Technologies",
    "Ansal API",
    "ArcelorMittal Distribution Solutions India",
  ],
  ["ARCIL", "Ardent Legal", "Aricent"],
  [
    "Ashland India",
    "Asianet Communications",
    "Asset Reconstruction Company India",
  ],
  ["ATC Telecom Tower Cop.", "Athena Legal", "ATS Infrastructure"],
  ["Autodesk India", "Avantha Power & Infrastructure", "AZB & Partners"],
  [
    "B4U Television Network",
    "Balaji Telefilms and Balaji Motion Pictures",
    "Bank of Baroda",
  ],
  [
    "Barclays Technology Centre India",
    "Bennett, Coleman & Co.",
    "Bharat Gears",
  ],
  [
    "Bharti Airtel",
    "Bharti Axa General Insurance Co.",
    "Bharti Axa Life Insurance Co.",
  ],
  ["Bharti Realty", "Bharti Retail", "Biocon"],
  ["Birlasoft", "Bluefish Pharmaceuticals", "BMW Group Financial Services"],
  ["Boeing", "British Deputy High Commission Bangalore", "Bunge India"],
  ["Cairn India", "Caparo India", "Capgemini India"],
  [
    "Capital Novus",
    "Capital One Services India",
    "Carl Bechem Lubricats India",
  ],
  ["Carroll O'DEA Busines Lawyers", "Cello Writing Aids", "Chadha & Chadha"],
  ["Chess Management Services", "Cipla", "Cloudtail India"],
  [
    "Clutch Group",
    "Cognizant Technology Solutions India",
    "Competition Commission of India",
  ],
  [
    "Complynium Solutions",
    "Computer Sciences Corp. India",
    "Comviva Technologies",
  ],
  ["Cornerstone India", "Cosmo Films", "Creditcheck Partners"],
  ["Crest Law Partners", "CRJ PR Services LLP", "CSC India"],
  ["Cummins India", "Cushman & Wakefield", "Cyient"],
  [
    "Cyril Amarchand Mangaldas",
    "Daimler India Commercial Vehicles",
    "Dalmia Bharat",
  ],
  [
    "Datamatics Global Services",
    "Deepak Sabharwal & Associates",
    "Delhi International Airport",
  ],
  [
    "Deloitte Touche Tohmatsu India LLP",
    "Dhawan & Co.",
    "Dhir and Dhir Associates",
  ],
  [
    "Digicable Network India",
    "Directorate General of Hydrocarbons",
    "Dr. Reddy's Laboratories",
  ],
  [
    "Dynamatic Technologies",
    "E.I. DuPont India",
    "EDAG Engineering & Design India",
  ],
  ["Eisai Pharmaceuticals India", "Electronica Finance", "Embassy Group"],
  ["Emcure Pharmaceuticals", "Emerson Electric Co India", "Engineers India"],
  ["Ericsson", "Escorts", "Essar Group"],
  ["Essar Power Gujarat", "Essilor India", "Evalueserve"],
  ["Eversheds LLP", "Everstone Capital Advisors", "Experian"],
  [
    "Fabindia Overseas",
    "Fedders Lloyd Corporation",
    "Film Federation of India",
  ],
  ["Flipkart.com", "Forbes & Company", "Fortis Healthcare"],
  ["Fortum India", "Freecharge Payment Technologies", "Friedman & Feiger"],
  ["Fullbright & Jaworski LLP", "Future Retail", "Future Group"],
  [
    "Future Lifestyle Fashions",
    "G4S Secure Solutions India",
    "Gamesa Wind Turbines",
  ],
  ["Gates Unitta India Co.", "GE Capital", "General Motors India"],
  [
    "Genpact",
    "GlaxoSmithKline Consumer Healthcare",
    "Glenmark Pharmaceuticals",
  ],
  [
    "Global Outsourcing Asia Operations",
    "Gnarus Partners",
    "Godrej Industries",
  ],
  ["Godrej Properies", "Gracenote Inc,", "Hahle Filter Systems India"],
  ["Hammurabi & Solomon", "Hardcastle Restaurats", "Harman"],
  ["Hazira LNG", "HCL Technologies", "Hengtal Law Offices"],
  ["Hero Corporate Services", "Hewlett Packard Enterprise", "HHG Legal Group"],
  ["HIL", "Hinduja Global Solutions", "Hinduja National Power Corporation"],
  ["Hindustan Petroleum Co.", "Hindustan Power Projects", "Hindustan Times"],
  [
    "Hindustan Unilever",
    "Hitachi Consulting Software Services India",
    "Holman Fenwick Willan Singapore LLP",
  ],
  ["Honeywell International", "Hospira Healthcare India", "HPCL Mittal Energy"],
  ["HT Media Ventures", "IBIBO Group", "IBM"],
  ["ICERTIS", "Idea Cellular", "IDFC Bank"],
  [
    "IDFC Infrastructure Debt Fund",
    "IDFC Infrastructure Finance",
    "IL & FS Financial Services",
  ],
  [
    "Imperium Legal",
    "Indian Farmers Fertiliser Co.",
    "Indian National Bar Association",
  ],
  ["Indraprastha Gas", "Indus IntelliRisk & IntelliSense Service", "Indus Law"],
  [
    "Industrial Finance Corporation of India",
    "Infosys",
    "Infrastructure Leasing & financial Service",
  ],
  ["Inmobi", "Intel India", "InterGlobe Hotels"],
  ["International Paper India", "Ittiam Systems", "Jaypee Group"],
  ["Jindal Gloal Law School", "JMC Projects", "JMD"],
  ["JSC VTB Bank", "JSW", "Jubilant Foodworks"],
  ["Jubilant Generics", "Just Law Advocates", "K Law"],
  ["Kaden Boriss", "Kalpataru Group", "Kanoria Group"],
  ["Kapil Sapra & Associates", "Kennametal India", "Khaitan & Co."],
  ["Khaitan Legal Associates", "King Stubb & Kasiva", "KK Birla Group"],
  ["Knight Frank", "Kochhar & Co.", "KOHLER"],
  ["Kokuyo Camlin", "Kotak Mahindra", "KPMG"],
  ["Krishna & Sauratri Associates", "Krishna Group", "Larsen & Toubro"],
  ["Law Offices of India", "Law Senate", "LCIA India"],
  ["Legal League Consulting", "Legalxgen Software Solutions", "Legasis"],
  ["Lenovo India", "Levi Strauss & Co.", "Levy Kaufmann – Kohler"],
  ["Lex Orbis", "LEXCare Global Consultants", "Lexis Nexis"],
  ["Lexplosion Solutions", "LexStreet Advisors LLP", "LinkedIn"],
  ["Litera", "Lupin", "Luthra & Luthra Law Offices"],
  ["Mahanagar Telephone Nigam", "Maheshwari & Co.", "Mahindra & Mahindra"],
  ["Mankind Pharma", "Marico", "Marlab Software"],
  ["Maruti Suzuki India", "MAS Capital", "Max Life Insurance Co"],
  [
    "Mcdonalds India North-East",
    "Mega Lifesciences",
    "Metro Cash & Carry India",
  ],
  ["Michelin India", "Microsoft Corporation India", "Minacs"],
  ["Mindtree", "Modi-Mundipharma", "Monnet Ispat & Energy"],
  ["Moser Baer", "Motion Picture Association India", "Mphasis"],
  ["Mphasis An HP Company", "MTR Foods", "Mullins Lawyers"],
  [
    "MultiScreen Media",
    "National Commodity & Derivatives Exchange",
    "Net App India",
  ],
  ["Netrika Consulting", "New Delhi Law Offices", "Nielsen"],
  ["Nippon Paint India", "Nirma", "Nokia"],
  [
    "NTT DATA Global Delivery Services",
    "Nucleus Software Exports",
    "Oberoi Realty",
  ],
  ["Orbit Law Services", "Osram India", "Panacea Biotec"],
  ["Panasonia India", "PANINDIA LEGAL", "Panindia Legal"],
  ["Paras Buildtech India", "Parexel Internatioanl", "Patentwire Consultants"],
  ["PayU Payments", "Percept", "Perfetti Van Melle India"],
  ["Pernod Ricard", "Pidilite Inds", "Pioneer Urban Land & Infrastructure"],
  ["Piramal Enterprises", "Piramal Imaging SA", "Policy and Regulatory Report"],
  ["Praj Industries", "PricewaterhouseCoopers", "Prime InfoTech Corporation"],
  [
    "Primerus",
    "Proind Business Solutions",
    "Prudential Process Mgt. Ser. India",
  ],
  ["PVR", "QuEST Global", "R K Dewan & Co."],
  [
    "R V College of Engineering",
    "Radhika Bali and Associates",
    "Radico Khaitan",
  ],
  ["Rathi Steel & Power", "Raymond", "RBL Bank"],
  ["Reheja Developers", "Reliance Industries", "Religare Wellness"],
  ["RMSI", "RNA Intellectual Property Attorneys", "S & R Associates"],
  ["S Eshwar Consultants", "S S Rana & Co.", "S. K. Singhi & Co."],
  [
    "SABMiller India",
    "Saikrishna & Assocites",
    "Samsung R & D Institute India Banglore",
  ],
  ["Sand Legal Services", "Sandoz India", "SBER BANK"],
  ["SBI Card", "Schneider Electric India", "Sequent Scientific"],
  ["Set India", "Seth Dua & Associates", "SGG India Overseas"],
  ["Shangri-la's Eros Hotel", "Shardul Amarchand Mangaldas", "Shell"],
  ["Shopclues.com", "Shri Lakshmi Cotsyn", "SIAC"],
  [
    "Siemens Industry Software India",
    "SILF",
    "Singapore International Arbitration Centre (SIAC)",
  ],
  ["Sistema Shyam TeleServices", "Siva Group of Companies", "Snapdeal.com"],
  ["Sonata Software", "Spice Connect", "Spice Digital and"],
  [
    "Srei Infrastructure Finance",
    "Star CJ Network India",
    "State Bank of Mysore",
  ],
  [
    "State Street Global Advisors, India",
    "Statkraft Markets",
    "Sterlite Technologies",
  ],
  ["Strides Arcolab", "Strides Shasun", "Sudath Perera Associates"],
  [
    "Sumitomo Mitsu Banking Corporation",
    "Sun Pharma Advanced Research Company",
    "Suri & Company",
  ],
  ["Suryalakshmi Cotto Mills", "Sword Global India", "Syngenta India"],
  [
    "TATA Motors Insurance Broking & Advisory Ser.",
    "Tata Realty",
    "Tata Services",
  ],
  ["TATA SIA Airlines", "Tata Sky", "Tata Technologies"],
  ["TDT Legal", "TechLegis Adcvocates & Solicitors", "Technicolor India"],
  ["TekIP Knowledge Consulting", "The Minacs Group", "The STC of India"],
  ["The Tata Power Company", "The Vidhistra", "Themis Associates"],
  ["Themis Group", "Thomson Reuters", "THS – The Law Firm"],
  ["Thyssenkrupp India", "Tikona Digital Networks", "Times Group"],
  ["Times Internet", "Times of India", "Titan"],
  ["TMT Law Practice", "Tricons", "Trilegal"],
  ["Turner International India", "Uberall Solutions India", "UFO Moviez"],
  ["UPL", "Usha International", "Vahura Legal Talent Specialists"],
  ["Vedanta Group", "Verist Law", "Viacom 18 Media"],
  ["Vidhi Partners Advocate", "Viom Networks", "VIRIDIAN RED"],
  ["Vodafone M-Pesa", "Volkswagen Group Sales India", "VRC Legal"],
  ["VST Ind.", "Wartsila India", "Western Outdoor Interactive"],
  ["Wipro", "Wockhardt Hospitals", "Wockhardt India"],
  ["World Vision", "Xerox India", "Yahoo Software Development India"],
  ["Yum Restaurants India", "Zee Entertainment Enterprises", "Zoomcar.com"],
];

const hierarchical = [
  ["Add. Chief Manager – Legal", "Additional Manager – Legal", "IP Attorney"],
  ["AGM – Legal", "AGM Legal & Asst. Co. Sec.", "APAC Legal Counsel"],
  ["Assistant Director", "Assistant General Counsel", "Associate"],
  [
    "Associate Director – Legal & Compliance",
    "Associate Director Human Resources",
    "Associate Manager – Legal Services",
  ],
  [
    "Associate Principal – Quality Programs",
    "Associate V P & Head – IP Cell",
    "Associate Vice President & Head Legal",
  ],
  [
    "Asst. Company Secretary",
    "Asst. General Manager – Legal",
    "Asst. Manager Legal",
  ],
  ["Asst. Manager Legal", "Ast Director Legal", "Attorney Legal"],
  [
    "Attorney, India/South Asia",
    "Audit Program Manager Quality",
    "AVP – Head – Legal",
  ],
  [
    "AVP – Legal Workflow Solutions",
    "Chief Executive Officer",
    "Chief Financial Officer",
  ],
  [
    "Chief Legal & Secretarial",
    "Chief Legal Advisor",
    "Chief Legal and Compliance Officer",
  ],
  [
    "Chief Legal and Regulatory Affairs Officer",
    "Chief Legal Officer",
    "Chief Manager HR",
  ],
  [
    "Chief Manager Legal",
    "Chief Risk Officer and Vice President – Program Management & Process Excellence",
    "Company Secretary",
  ],
  [
    "Company Secretary & Compliance Officer",
    "Company Secretary & DGM Head Legal – Sec.",
    "Compliance Officer",
  ],
  [
    "Corporate Counsel",
    "Corporate Head Legal & Company Secretary",
    "Corporate Strategy & Planning",
  ],
  [
    "Country Counsel – India",
    "Deputy General Manager – Legal",
    "Deputy Legal Advisor",
  ],
  [
    "Deputy Manager – Finance Advisory Services",
    "Deputy Manager Law",
    "DGM – (Legal) & Company Secretary",
  ],
  ["DGM – Legal", "DGM Regulatory Affairs", "Director"],
  [
    "Director – OP Finance",
    "Director Corporate Affairs & General Counsel -South Asia",
    "Director Forensic Services",
  ],
  [
    "Director HR – QMS",
    "Director Intellectual Property Policy – Legal & Corporate Affairs (LCA)",
    "Director Legal",
  ],
  [
    "Director Legal & Com. Sec.",
    "Director of Intellectual Property",
    "Director, Policy & Regulatory Affairs",
  ],
  ["Dy Manager Law", "Dy. GM – Legal", "E.V.P. – Corporate Legal"],
  ["EVP- Group General Counsel", "Exe. Legal", "Exe. V P Legal & Arbitration"],
  [
    "Executive Director & Chief Financial Officer",
    "Executive Director Law",
    "Executive Online Sales",
  ],
  ["Finance Advisory Services", "Former Chairman", "Founder & CEO"],
  [
    "Founder & Chief Operation Officer",
    "Founder & Managing Partner",
    "Founding Partner",
  ],
  [
    "General Counsel",
    "General Counsel – Asia Pacific",
    "General Counsel & Group Head – Legal & Compliance",
  ],
  [
    "General Counsel Asia Pacific",
    "Global General Counsel",
    "GM – Legal & CRM Compliance",
  ],
  [
    "Group General Counsel",
    "Group General Counsel & Exe. V P",
    "Head – Corporate Legal",
  ],
  [
    "Head – IP",
    "Head – Strategy & Client Engagement",
    "Head- Legal & Secretarial",
  ],
  [
    "Head of Legal – Operations and Technology",
    "Head Syndication & Licensing",
    "Head-Legal & HR",
  ],
  [
    "Independent Practitioner",
    "Investigator Ombuds & Open Reporting Legal Retail Finance",
    "Key Account Manager",
  ],
  [
    "Lead Counsel- Global Technology Services",
    "Legal Counsel",
    "Legal Counsel & Com Sec. APJ Legal",
  ],
  [
    "Legal Counsel & Company Secretary",
    "Legal Counsel APJ Legal Dpt.",
    "Legal Executive",
  ],
  ["Legal Officer", "Manager – Business Development", "Manager – Corp Legal"],
  ["Manager – Legal", "Manager – Sales", "Manager Finance"],
  ["Manager Sales", "Managing Partner", "P1 Commercial Contract Manager"],
  [
    "Partner",
    "Partner Private Equity and M&A",
    "Partner Transfer Pricing and Direct Tax",
  ],
  ["Patent Counsel", "Patent Development Assistant", "President"],
  ["Principal Associate", "Reg. Manager South Asia Pharma", "Regional Manager"],
  ["Registrar and Director", "Secretary General", "Senior Associate"],
  [
    "Senior Consultant Risk Advisory Services",
    "Senior Counsel (India & South Asia)",
    "Senior Executive – Legal",
  ],
  [
    "Senior Legal Officer",
    "Senior Manager – Forensic",
    "Senior Manager Forensic Services",
  ],
];

const AudienceProfile = () => {
  return (
    <div className="min-h-screen bg-[#white] mt-16 md:mt-[98px]">
      {/* Header */}
      <div className="bg-[#d61f26] py-6">
        <h1 className="font-roboto text-white text-center text-[28px] md:text-[50px] font-normal leading-[55px] tracking-tighter">
          Meet The Legal Maestros
        </h1>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[4fr_1fr] gap-10">
          {/* Left */}
          <div>
            {/* Paragraph */}
            <p className=" font-roboto text-[15px] leading-[28px] text-[#333] font-normal">
              <span className="text-[#d61f26] font-bold cursor-pointer hover:underline">
                The Grand Masters Summit Series
              </span>{" "}
              ever since its inception has always been a magnetic summit series
              for the industry professionals to attend not only from the core
              legal functions but all other allied functions as well.
              Irrespective of the industry sector, The Grand Masters has been a
              perfect mix of audience. To give you an idea of the participation
              profile so far at The Grand Masters, here’s a snapshot;
            </p>

            {/* Table */}
            <div className="mt-5 overflow-hidden  ">
              {/* Heading */}
              <div className="font-roboto bg-[#d61f26] text-white font-semibold uppercase   leading-[28px] px-5 py-3 text-[14px]">
                Organizational Participation
              </div>

              {/* Rows */}
              {organizations.map((row, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-3 border-gray-200 ${
                    index % 2 === 0 ? "bg-[white]" : "bg-[#f3f3f3]"
                  }`}
                >
                  {row.map((item, i) => (
                    <div
                      key={i}
                      className="font-roboto px-4 py-2 border font-normal leading-[28px] border-gray-200 text-[14px] text-[#333]"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Table */}
            <div className="mt-5 overflow-hidden  ">
              {/* Heading */}
              <div className="bg-[#d61f26] text-white font-semibold uppercase   leading-[24px] px-5 py-3 text-[14px]">
                HIERARCHICAL PARTICIPATION
              </div>

              {/* Rows */}
              {hierarchical.map((row, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-3 ${
                    index % 2 === 0 ? "bg-[white]" : "bg-[#e9e9e9]"
                  }`}
                >
                  {row.map((item, i) => (
                    <div
                      key={i}
                      className="px-4 py-3 border font-normal leading-[28px] border-[#dbdbdb] text-[14px] text-[#333]"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div>
            <OfficialMessages />
          </div>
        </div>
        <h1 className="text-4xl text-center my-16">Sponsors & Partners</h1>
        <SponsorsCarousel />
      </div>
    </div>
  );
};

export default AudienceProfile;
