"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const HomeConnection = () => {
  return (
    <div className="w-full h-full relative">
      <Image
        src="/images/home/cover-connection.png"
        alt="Connection"
        width={8000}
        height={3959}
        priority
        sizes="100vw"
        className="object-cover"
      />
      <Link
        href="/connection"
        className="absolute bottom-6 right-6 px-8 py-2 rounded border border-white text-white uppercase font-medium transition-all duration-300 bg-[#12243E] hover:bg-white hover:text-black hover:border-white z-10"
      >
        Xem chi tiết
      </Link>
    </div>
  )
}

export default HomeConnection
