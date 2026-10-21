"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

import { addToCart } from "@/src/services/cart.service";
import { APP_EVENT_TYPE } from "@/src/config/eventType.config";
import { API_ASSET_URLS } from "@/src/config/api.config";
import type { Event } from "@/src/types/event.type";
import { getErrorMessage } from "@/src/utils/error";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  events: Event[];
  selectedPlanId: number | null;
};

const cityIconMap: Record<string, string> = {
  Ahmedabad: "/icons/ahd.avif",
  Hyderabad: "/icons/hyd.png",
};

export default function CitySelectorModal({
  isOpen,
  onClose,
  events,
  selectedPlanId,
}: Props) {
  const router = useRouter();

  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) {
    return null;
  }

  const handleSelectEvent = (eventId: number) => {
    setSelectedEventId(eventId);
    setError(null);
  };

  const handleAddToCart = async () => {
    if (!selectedEventId || !selectedPlanId) return;

    try {
      setLoading(true);

      await addToCart({
        event_type_id: APP_EVENT_TYPE,
        event_id: selectedEventId,
        plan_id: selectedPlanId,
        quantity: 1,
      });

      onClose();
      router.push("/checkout");
    } catch (err) {
      console.error("Add to cart failed:", err);
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4">
      <div className="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl">
        {/* Close */}
        <button
          type="button"
          aria-label="Close"
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
        </div>

        {/* Cities */}
        <div
          className={`mt-8 grid gap-4 px-8 ${
            events.length <= 2 ? "grid-cols-2" : "grid-cols-2 md:grid-cols-3"
          }`}
        >
          {events.map((event) => {
            const isSelected = selectedEventId === event.id;
            const cityName = event.city_name || event.city?.name || "";

            return (
              <button
                type="button"
                key={event.id}
                onClick={() => handleSelectEvent(event.id)}
                className={`group rounded-2xl border p-6 transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "border-[#D0252D] bg-white shadow-md"
                    : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                }`}
              >
                <div className="flex flex-col items-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-50">
                    <img
                      src={
                        (event.city?.image &&
                          `${API_ASSET_URLS.cities}${event.city.image}`) ||
                        cityIconMap[cityName] ||
                        event.icon ||
                        event.city_icon ||
                        "/images/default.png"
                      }
                      alt={cityName}
                      className="h-10 w-10 object-contain"
                    />
                  </div>

                  <span
                    className={`mt-4 text-sm font-medium transition-colors ${
                      isSelected ? "text-[#D0252D]" : "text-gray-800"
                    }`}
                  >
                    {cityName}
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
            type="button"
            onClick={handleAddToCart}
            disabled={!selectedEventId || loading}
            className={`w-full rounded-xl py-3.5 text-sm font-medium transition ${
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
}
