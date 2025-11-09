"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const ProjectOverview = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const projectOverviewImage =
    "/images/home/project-overview.png";
  const coverImage =
    "/images/home/cover-image.jpg";

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
      <div className="w-full h-full px-4 lg:px-16 py-14 flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-start gap-8 lg:gap-24">
        {/* Project Overview Image */}
        <div className="flex-1 w-full lg:h-full flex flex-col gap-8 min-h-0">
          <div className="flex-1 min-h-0 flex items-start">
            <Image
              src={projectOverviewImage}
              alt="Hero banner"
              className="w-full h-full object-contain"
              width={2723}
              height={2552}
            />
          </div>
          <Link
            href="/introduction"
            className="w-fit px-8 py-2 rounded border border-white text-white uppercase font-medium transition-all duration-300 hover:bg-white hover:text-black hover:border-white flex-shrink-0 mx-auto"
          >
            XEM CHI TIẾT
          </Link>
        </div>

        {/* Overview Video */}
        <div className="flex-1 w-full lg:flex relative">
          <div className="relative w-full inline-block">
            <Image
              src={coverImage}
              alt="Overview video"
              className={`w-full h-auto block ${isPlaying ? 'invisible' : ''}`}
              width={800}
              height={454}
            />
            <div className={`absolute top-0 left-0 w-full h-full bg-black/55 z-[9] ${isPlaying ? 'invisible' : ''}`} />
            <button
              onClick={() => setIsPlaying(true)}
              className={`start-video absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70px] h-[70px] rounded-full border-2 border-white bg-transparent bg-[url('/images/home/ic-play-videos.png')] bg-no-repeat bg-center bg-[length:25px] shadow-[0_0_20px_rgba(0,0,0,0.73)] z-10 p-0 m-0 outline-0 cursor-pointer ${isPlaying ? 'invisible' : ''}`}
              style={{ textIndent: '-9999px' }}
            >
              Play
            </button>
            {isPlaying && (
              <iframe
                id="player"
                frameBorder="0"
                allowFullScreen
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                title="Wyndham Soleil Danang"
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/LxBMlTdhCEY?enablejsapi=1&autoplay=1"
                className="absolute top-0 left-0 w-full h-full z-20"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;
