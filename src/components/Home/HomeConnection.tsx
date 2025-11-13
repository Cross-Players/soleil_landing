"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl' 

const HomeConnection = () => {
  const t = useTranslations("gallery"); 

  return (
     <div className="w-full h-screen relative">
      <Image
        src="/images/home/cover-connection.png"
        alt="Connection"
        fill // 'fill'
        priority
        sizes="100vw"
        className="object-cover" // 'object-cover' fit
      />
      <Link
        href="/connection"
        className="
          absolute z-10 
          bottom-4 left-4 px-6 py-2 
          md:bottom-6 md:left-6 md:px-8 
          rounded border border-white text-white 
          text-sm md:text-base
          uppercase font-medium transition-all duration-300 
          bg-[#12243E]/80 hover:bg-white hover:text-black hover:border-white
        "
      >
        {t("viewDetails")} 
      </Link>
    </div>
  )
}

export default HomeConnection