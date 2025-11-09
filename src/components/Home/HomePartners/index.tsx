"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const PARTNERS = [
  {
    logo: "/images/home/aedas-logo.png",
    logoWidth: 167,
    logoHeight: 167,
    coverImage: "/images/home/cover-aedas.png",
    title: "partners-title-1",
    description: "partners-description-1",
  },
  {
    logo: "/images/home/wyndham-logo.png",
    logoWidth: 1024,
    logoHeight: 148,
    coverImage: "/images/home/cover-wyndham.jpg",
    title: "partners-title-2",
    description: "partners-description-2",
  },
  {
    logo: "/images/home/artelia-logo.png",
    logoWidth: 709,
    logoHeight: 298,
    coverImage: "/images/home/cover-artelia.jpg",
    title: "partners-title-3",
    description: "partners-description-3",
  },
];

const Partners = () => {
  const t = useTranslations("partners");
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  return (
    <div className="w-full h-full flex">
      {PARTNERS.map((partner, index) => {
        const isFocused = focusedIndex === index;
        const hasFocused = focusedIndex !== null;
        
        // When no partner is focused: all equal (1/3 each)
        // When a partner is focused: focused = 2 units, others = 1 unit each
        // Total: 2 + 1 + 1 = 4 units
        // Focused: 50% (2/4), Others: 25% (1/4) each
        const widthClass = hasFocused
          ? isFocused
            ? "w-1/2"
            : "w-1/4"
          : "w-1/3";

        return (
          <div
            key={index}
            className={`${widthClass} relative h-full overflow-hidden transition-all duration-700 ease-in-out`}
            onMouseEnter={() => setFocusedIndex(index)}
            onMouseLeave={() => setFocusedIndex(null)}
          >
            {/* White border on the right (except for last partner) */}
            {index < PARTNERS.length - 1 && (
              <div className="absolute right-0 top-0 bottom-0 w-px bg-white z-10" />
            )}
            
            {/* Background Image Container */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${partner.coverImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                transform: isFocused ? "scale(1.05)" : "scale(1)",
                transition: "transform 700ms ease-in-out",
              }}
            />

            {/* Content */}
            <div className="relative h-full flex flex-col justify-center items-center px-4 lg:px-6 xl:px-8 py-8 lg:py-12 text-center">
              {/* Logo */}
              <div className="mb-6 lg:mb-8 xl:mb-10 flex-shrink-0">
                <Image
                  src={partner.logo}
                  alt={t(partner.title)}
                  width={partner.logoWidth}
                  height={partner.logoHeight}
                  className="object-contain max-w-[180px] sm:max-w-[220px] lg:max-w-[280px] xl:max-w-[320px] h-auto transition-all duration-1000"
                  style={{
                    transform: isFocused ? "scale(1.5)" : "scale(1)",
                  }}
                  priority={index === 0}
                />
              </div>

              {/* Title with Underline */}
              <h3 className="text-white text-base lg:text-lg xl:text-xl font-bold mb-3 lg:mb-4 uppercase tracking-wide transition-all duration-700 drop-shadow-lg">
                {t(partner.title)}
                <div className="w-12 lg:w-16 h-0.5 bg-white mx-auto mt-2 lg:mt-3 drop-shadow-md" />
              </h3>

              {/* Description - Only show when focused */}
              <div
                className={`overflow-hidden transition-all duration-700 ease-in-out ${
                  isFocused
                    ? "max-h-[500px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-white text-xs sm:text-sm lg:text-base leading-relaxed max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg px-2 pt-2 drop-shadow-lg">
                  {t(partner.description)}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Partners;
