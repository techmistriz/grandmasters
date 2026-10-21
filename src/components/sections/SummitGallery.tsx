"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { TouchEvent } from "react";
import { useRouter } from "next/navigation";

import { getHomepageGallery, getSummitEvents } from "@/src/services/homePage";
import type { Event, GalleryImage } from "@/src/types/event.type";
import { getGalleryImageUrl } from "@/src/utils/image";

export default function SummitGallery() {
  const router = useRouter();

  const [events, setEvents] = useState<Event[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [activeEvent, setActiveEvent] = useState<Event | null>(null);

  const [activeTab, setActiveTab] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0 });
  const [showControls, setShowControls] = useState(true);

  const tabsContainerRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const fetchGallery = async (eventId: number) => {
    try {
      const res = await getHomepageGallery(eventId);
      setGalleryImages(res.data ?? []);
    } catch (err) {
      console.error("Failed to fetch gallery:", err);
    }
  };

  // Fetch galleries
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);

        const res = await getSummitEvents(6);
        const eventList = res.data?.events ?? [];
        setEvents(eventList);

        if (eventList.length > 0) {
          const firstEvent = eventList[0];

          if (firstEvent) {
            setActiveEvent(firstEvent);
            setActiveTab(firstEvent.city?.name ?? "");

            await fetchGallery(firstEvent.id);
          }
        }
      } catch (err) {
        console.error("Failed to fetch summit events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Auto-hide the lightbox controls a few seconds after they appear.
  useEffect(() => {
    if (!selectedImage || !showControls) return;

    const timer = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [selectedImage, selectedIndex, showControls]);

  // Update triangle indicator
  const updateIndicator = (index: number) => {
    const el = tabRefs.current[index];

    if (!el) return;

    const container = tabsContainerRef.current?.getBoundingClientRect();
    const tab = el.getBoundingClientRect();

    if (container) {
      setIndicatorStyle({
        left: tab.left - container.left + tab.width / 2,
      });
    }
  };

  // Move indicator when the tabs render, the active tab changes or the
  // window resizes. The tabs only mount once loading ends, so wait for it.
  useLayoutEffect(() => {
    if (loading || !events.length || !activeTab) return;

    const index = events.findIndex((item) => item.city?.name === activeTab);

    if (index === -1) return;

    const frame = requestAnimationFrame(() => {
      updateIndicator(index);
    });
    const handleResize = () => updateIndicator(index);

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
    };
  }, [loading, events, activeTab]);

  const handleTabClick = async (event: Event, index: number) => {
    setActiveTab(event.city?.name ?? "");
    setActiveEvent(event);

    updateIndicator(index);

    await fetchGallery(event.id);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#D0252D]/20 border-t-[#D0252D]" />
      </div>
    );
  }

  const showImage = (index: number) => {
    setSelectedIndex(index);
    setSelectedImage(getGalleryImageUrl(galleryImages[index].image));
    setShowControls(true);
  };

  const nextImage = () => {
    if (!galleryImages.length) return;

    const next = (selectedIndex + 1) % galleryImages.length;

    showImage(next);
  };
  const prevImage = () => {
    if (!galleryImages.length) return;

    const prev =
      (selectedIndex - 1 + galleryImages.length) % galleryImages.length;

    showImage(prev);
  };
  const handleTouchStart = (e: TouchEvent<HTMLImageElement>) => {
    const touch = e.touches[0];
    if (touch) {
      touchStartX.current = touch.clientX;
    }
  };

  const handleTouchMove = (e: TouchEvent<HTMLImageElement>) => {
    const touch = e.touches[0];
    if (touch) {
      touchEndX.current = touch.clientX;
    }
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;

    // Ignore small movements
    if (Math.abs(distance) < 50) return;

    if (distance > 0) {
      // Swipe left -> Next image
      nextImage();
    } else {
      // Swipe right -> Previous image
      prevImage();
    }
  };

  return (
    <section className="font-roboto pt-6 md:pb-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Header */}
        <div className="flex justify-center">
          <img
            src="/icons/icon6.png"
            alt="Summit Gallery"
            className="w-8 h-8 md:w-28 md:h-23"
          />
        </div>

        <h2 className="text-[#333] mb-2 text-2xl sm:text-4xl md:text-[50px] font-normal">
          2026 Editions Summit Gallery
        </h2>

        <p className="text-[#8D93A0] text-sm md:text-[15px] mb-8 md:mb-12">
          A Visual <span className="text-[#D0252D]">Overview of Past</span>{" "}
          Summit Proceedings
        </p>

        {/* Tabs */}
        <div className="relative border-b border-gray-200 mb-8">
          <div className="overflow-x-auto no-scrollbar">
            <div
              ref={tabsContainerRef}
              className="flex justify-start sm:justify-center gap-5 sm:gap-8 whitespace-nowrap px-2"
            >
              {events.map((event, index) => (
                <button
                  key={event.id}
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  onClick={() => handleTabClick(event, index)}
                  className={`flex-shrink-0 pb-3 sm:pb-4 text-xs sm:text-sm md:text-[15px] font-bold tracking-[0.07rem]   transition cursor-pointer leading-7 ${
                    activeTab === event.city?.name
                      ? "text-[#D0252D]"
                      : "text-[#333] hover:text-black"
                  }`}
                >
                  {event.city?.name}
                </button>
              ))}
            </div>
          </div>

          {/* Triangle Indicator */}
          <div className="absolute left-0 top-full w-full pointer-events-none">
            <div
              className="hidden sm:block absolute w-0 h-0
                border-l-[12px] border-l-transparent
                border-r-[12px] border-r-transparent
                border-t-[10px] border-t-[#D0252D]
                transition-all duration-300"
              style={{
                left: `${indicatorStyle.left}px`,
                transform: "translateX(-50%)",
              }}
            />
          </div>
        </div>

        {/* Images */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-0.5 mt-4 sm:px-6">
          {galleryImages.map((item, index) => (
            <div key={item.id} className="overflow-hidden">
              <img
                src={getGalleryImageUrl(item.image)}
                alt={`Gallery ${index}`}
                className="w-full h-auto block cursor-pointer"
                onClick={() => {
                  showImage(index);
                }}
              />
            </div>
          ))}
        </div>

        {/* View More */}
        <button
          onClick={() => {
            if (activeEvent?.slug) {
              router.push(`/${activeEvent.slug}-edition-an-overview`);
            }
          }}
          className="mt-8 mb-8 md:mb-0 md:mt-10 px-6 py-3 rounded-sm border border-[#D0252D] text-[#D0252D] text-[11px] font-bold tracking-[0.2rem] hover:bg-[#D0252D] hover:text-white transition cursor-pointer"
        >
          VIEW MORE
        </button>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-5000 bg-black flex items-center justify-center"
          onMouseMove={() => setShowControls(true)}
        >
          {/* Close */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 md:top-6 md:right-6
                 text-white text-4xl md:text-5xl z-[1001]
                 p-2 cursor-pointer"
          >
            ×
          </button>

          {/* Image */}
          <img
            src={selectedImage}
            alt="Gallery"
            className="w-screen h-screen object-contain cursor-pointer select-none"
            draggable={false}
            onClick={() => setShowControls((prev) => !prev)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />
          {/* Bottom Controls */}
          <div
            className={`absolute bottom-0 left-0 w-full
      bg-black/70 backdrop-blur-sm
      flex items-center justify-between
      px-6 md:px-84 py-1
      transition-all duration-300
      ${
        showControls
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0"
      }`}
          >
            <button
              onClick={prevImage}
              className="text-white text-4xl md:text-5xl
                   w-12 h-12 md:w-14 md:h-14
                   flex items-center justify-center cursor-pointer"
            >
              ‹
            </button>

            <span className="text-white text-sm md:text-base">
              {selectedIndex + 1} / {galleryImages.length}
            </span>

            <button
              onClick={nextImage}
              className="text-white text-4xl md:text-5xl
                   w-12 h-12 md:w-14 md:h-14
                   flex items-center justify-center cursor-pointer"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
