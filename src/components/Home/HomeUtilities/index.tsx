"use client";

import React, {
  useEffect,
  useState,
} from "react";
import { useTranslations } from "next-intl";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const UTILITIES = [
  {
    title: "title-1",
    description: "description-1",
    logo: "/images/home/icon-gym.png",
    background: "/images/home/cover-gym.jpg",
  },
  {
    title: "title-2",
    description: "description-2",
    logo: "/images/home/icon-resort.png",
    background: "/images/home/cover-pool.png",
  },
  {
    title: "title-3",
    description: "description-3",
    logo: "/images/home/icon-restaurant.png",
    background:
      "/images/home/cover-restaurant.png",
  },
  {
    title: "title-4",
    description: "description-4",
    logo: "/images/home/icon-kid-club.png",
    background: "/images/home/cover-kid-club.jpg",
  },
  {
    title: "title-5",
    description: "description-5",
    logo: "/images/home/icon-benefit.png",
    background: "/images/home/cover-shopping.jpg",
  },
  {
    title: "title-6",
    description: "description-6",
    logo: "/images/home/icon-manage.png",
    background: "/images/home/cover-manage.jpg",
  },
];

const HomeUtilities = () => {
  const t = useTranslations("utilities");
  const [api, setApi] =
    useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] =
    useState(0);

  useEffect(() => {
    if (!api) return;

    const updateIndex = () => {
      setSelectedIndex(api.selectedScrollSnap());
    };

    api.on("select", updateIndex);
    updateIndex();

    return () => {
      api.off("select", updateIndex);
    };
  }, [api]);

  return (
    <div className="w-full h-full">
      <Carousel
        opts={{ loop: true, align: "start" }}
        className="w-full h-full"
        setApi={setApi}
      >
        <CarouselContent>
          {UTILITIES.map((utility) => (
            <CarouselItem
              key={utility.title}
              className="w-full h-full relative"
            >
              <div
                className="w-full h-full relative flex items-center justify-center"
                style={{
                  backgroundImage: `url(${utility.background})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="text-center text-white z-[5] px-4">
                  <div
                    className="text-[20px] leading-[40px] font-normal"
                    dangerouslySetInnerHTML={{
                      __html: t(
                        utility.description
                      ),
                    }}
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <h1 className="pt-0 mt-[30px] text-[28px] font-black leading-[50px] absolute top-[100px] left-1/2 -translate-x-1/2 text-white text-center after:content-[''] after:w-[100px] after:h-[2px] after:bg-white after:bottom-0 after:left-1/2 after:absolute after:-translate-x-1/2">
          {t("title")}
        </h1>

        {/* Dots */}
        <div className="absolute h-[510px] w-[60px] top-1/2 left-0 block z-[1000] [transform:matrix(1,0,0,1,250,-255)] before:content-[''] before:w-[1px] before:h-[calc(100%+120px)] before:left-1/2 before:-top-[60px] before:absolute before:bg-white before:-translate-x-1/2">
          {UTILITIES.map((utility, i) => (
            <div
              key={i}
              className="group opacity-100 p-0 w-[60px] h-[60px] bg-white rounded-full absolute m-0 cursor-pointer left-0"
              style={{ top: `${i * 90}px` }}
              onClick={() => api?.scrollTo(i)}
            >
              <span
                className={`block relative w-full h-full bg-white rounded-full ${
                  i === selectedIndex ? 'utility-dot-active' : ''
                }`}
                style={{
                  backgroundImage: `url(${utility.logo})`,
                  backgroundSize: "40px",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              ></span>
              <span 
                className={`absolute top-1/2 right-auto bottom-auto ml-2.5 -left-[250px] uppercase w-[200px] text-right bg-transparent p-0 text-sm font-medium translate-x-[10px] translate-y-[-50%] group-hover:translate-x-0 transition-transform duration-300 ${
                  i === selectedIndex 
                    ? 'text-[#CC9A58] font-bold' 
                    : 'text-white'
                }`}
              >
                {t(utility.title)}
              </span>
            </div>
          ))}
        </div>
      </Carousel>
    </div>
  );
};

export default HomeUtilities;
