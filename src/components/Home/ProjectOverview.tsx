"use client";

import React from "react"; 
import Image from "next/image";
import Link from "next/link";

const ProjectOverview = () => {
  const projectOverviewImage =
    "/images/home/project-overview.png"; 
  const newStaticImage =
    "/images/home/updatevideo.jpg"; 

  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{
        backgroundImage:
          "url(/images/home/bg-overview-project.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        transition: "opacity .5s ease",
      }}
    >
      <div className="w-full h-full px-4 lg:px-0 py-14 flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-start gap-8 lg:gap-12">
            <div className="lg:w-9/10 w-full lg:h-full flex flex-col gap-8 min-h-0">
          <div className="flex-1 min-h-0 flex items-start">
            <Image
              src={projectOverviewImage}
              alt="Hero banner"
              className="w-full h-full object-contain" 
              width={2723}
              height={2552}
              priority 
            />
          </div>
          <Link
            href="/introduction"
            className="w-fit px-8 py-2 rounded border border-white text-white uppercase font-medium transition-all duration-300 hover:bg-white hover:text-black hover:border-white flex-shrink-0 mx-auto"
          >
            XEM CHI TIẾT
          </Link>
        </div>
        <div className="lg:w-4/10 w-full lg:flex relative flex-col justify-center items-center pr-4 lg:pr-8"> 
          <div className="relative w-full rounded-lg overflow-hidden shadow-2xl">
            <Image
              src={newStaticImage} 
              alt="Tổng quan dự án"
              width={800} 
              height={454} 
              className="w-full h-auto object-contain" 
              sizes="(max-width: 1024px) 100vw, 20vw"
            />
          </div>
          
        </div>

      </div>
    </div>
  );
};

export default ProjectOverview;