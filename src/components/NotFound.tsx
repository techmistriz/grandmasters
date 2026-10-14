import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] px-4">
      <div className="max-w-2xl text-center">
        <h1 className="text-[120px] md:text-[180px] font-bold leading-none text-[#D0252D]">
          404
        </h1>

        <div className="w-24 h-1 bg-[#D0252D] mx-auto mb-8" />

        <h2 className="text-3xl md:text-4xl font-light text-[#333] mb-4">
          Page Not Found
        </h2>

        <p className="text-[#666] text-lg leading-8 max-w-xl mx-auto mb-10">
          The page you are looking for does not exist, has been moved, or the
          requested official message could not be found.
        </p>

        <button
          onClick={() => navigate(-1)}
          className="bg-[#D0252D] text-white px-6 py-3 rounded hover:bg-[#b51f26] cursor-pointer"
        >
          ← Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
