"use client"

import React, { useEffect, useState, useRef } from "react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import HomeBanner from "./HomeBanner";
import HomeConnection from "./HomeConnection";
import HomeApartment from "./HomeApartment";
import HomeContact from "./HomeContact";
import HomeGallery from "./HomeGallery";
import HomeNews from "./HomeNews";
import HomePartners from "./HomePartners";
import HomeUtilities from "./HomeUtilities";
import ProjectOverview from "./ProjectOverview";

const Home = () => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const slides = [
    HomeBanner,
    ProjectOverview,
    HomeConnection,
    HomePartners,
    HomeUtilities,
    HomeApartment,
    HomeNews,
    HomeGallery,
    HomeContact,
  ];

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap());
    };

    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api || !carouselContainerRef.current) return;

    let scrollTimeout: NodeJS.Timeout;
    let isScrolling = false;

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;

      e.preventDefault();
      isScrolling = true;

      if (e.deltaY > 0) {
        api.scrollNext();
      } else {
        api.scrollPrev();
      }

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 800);
    };

    const carouselElement = carouselContainerRef.current;
    carouselElement.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      carouselElement.removeEventListener("wheel", handleWheel);
      clearTimeout(scrollTimeout);
    };
  }, [api]);

  return (
    <div ref={carouselContainerRef} className="w-screen h-screen overflow-hidden">
      <Carousel
        opts={{ loop: false, align: "start", dragFree: false }}
        orientation="vertical"
        className="w-full h-full"
        setApi={setApi}
      >
        <CarouselContent className="h-full mt-0!">
          {slides.map((SlideComponent, idx) => (
            <CarouselItem key={idx} className="w-full h-screen pt-0!">
              <SlideComponent />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Dots - Right side, vertically centered */}
        <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-50 pointer-events-auto">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => api?.scrollTo(i)}
              className={
                i === selectedIndex
                  ? "h-6 w-2 rounded-full bg-white/90 transition-all shadow-lg"
                  : "h-2 w-2 rounded-full bg-white/50 transition-all hover:bg-white/70 shadow-md"
              }
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
};

export default Home;
