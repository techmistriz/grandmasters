import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { addToCart } from "../services/cart.service";
import { useNavigate } from "react-router-dom";
import ahd from "../assets/icons/ahd.avif";
import hyd from "../assets/icons/hyd.png";
import { useQueryClient } from "@tanstack/react-query";
import { APP_EVENT_TYPE } from "../constant/config";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  events: any[];
  selectedPlanId: number | null;
};

const CitySelectorModal = ({
  isOpen,
  onClose,
  events,
  selectedPlanId,
}: Props) => {
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  // Modal open/close debug
  useEffect(() => {}, [isOpen]);

  // Event selection debug
  const handleSelectEvent = (eventId: number) => {
    setSelectedEventId(eventId);
    setError(null); // clear old error
  };

  if (!isOpen) {
    return null;
  }

  const handleAddToCart = async () => {
    if (!selectedEventId) {
      console.warn("  No event selected");
      return;
    }

    if (!selectedPlanId) {
      return;
    }

    const payload = {
      event_type_id: APP_EVENT_TYPE,
      event_id: selectedEventId,
      plan_id: selectedPlanId,
      quantity: 1,
    };

    try {
      setLoading(true);

      const res = await addToCart(payload);

      await queryClient.refetchQueries({
        queryKey: ["cart"],
      });

      onClose();
      navigate("/checkout");
    } catch (err: any) {
      console.error("  ADD TO CART ERROR:", err);

      const msg =
        err?.response?.data?.message ||
        "Something went wrong. Please try again.";

      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const cityIconMap: Record<string, string> = {
    Ahmedabad: ahd,
    Hyderabad: hyd,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4">
      <div className="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-black"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="px-8 pt-8">
          <h2 className="text-center text-2xl font-semibold tracking-tight text-gray-900">
            Select City
          </h2>
          {/* 
        <p className="mt-2 text-center text-sm text-gray-500">
          Select the summit location.
        </p> */}
        </div>

        {/* Cities */}
        <div
          className={`mt-8 grid gap-4 px-8 ${
            events.length <= 2 ? "grid-cols-2" : "grid-cols-2 md:grid-cols-3"
          }`}
        >
          {events.map((event: any) => {
            const isSelected = selectedEventId === event.id;

            return (
              <button
                key={event.id}
                onClick={() => handleSelectEvent(event.id)}
                className={`group rounded-2xl border p-6 transition-all duration-200 cursor-pointer
              ${
                isSelected
                  ? "border-[#D0252D] bg-white shadow-md"
                  : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
              }`}
              >
                <div className="flex flex-col items-center ">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-50">
                    <img
                      src={
                        cityIconMap[event.city_name] ||
                        cityIconMap[event.city?.name] ||
                        event.icon ||
                        event.city_icon ||
                        "/placeholder.png"
                      }
                      alt={event.city_name || event.city?.name}
                      className="h-10 w-10 object-contain"
                    />
                  </div>

                  <span
                    className={`mt-4 text-sm font-medium transition-colors ${
                      isSelected ? "text-[#D0252D]" : "text-gray-800"
                    }`}
                  >
                    {event.city_name || event.city?.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {error && (
          <p className="mt-5 text-center text-sm text-red-600">{error}</p>
        )}

        {/* Footer */}
        <div className="px-8 py-8">
          <button
            onClick={handleAddToCart}
            disabled={!selectedEventId || loading}
            className={`w-full rounded-xl py-3.5 text-sm font-medium transition
          ${
            !selectedEventId || loading
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-[#D0252D] text-white hover:bg-[#b51f27]"
          }`}
          >
            {loading ? "Adding..." : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CitySelectorModal;
