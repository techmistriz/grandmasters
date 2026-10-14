import { Link } from "react-router-dom";

const buttons = [
  { label: "SPEAK", to: "/#speak" },
  { label: "SPONSOR", to: "/#sponsor" },
  { label: "REGISTER NOW", to: "/#register" },
  { label: "CONNECT", to: "/#contact" },
];

const GetInvolvedButtons = () => {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 mt-8">
      {buttons.map((btn) => (
        <Link key={btn.label} to={btn.to}>
          <button className="w-full sm:w-auto min-w-[180px] border border-white rounded-md py-3 px-6 md:py-4 text-sm font-bold tracking-[0.2rem] leading-[14px] text-center transition-colors hover:bg-[#D0252D] cursor-pointer">
            {btn.label}
          </button>
        </Link>
      ))}
    </div>
  );
};

export default GetInvolvedButtons;
