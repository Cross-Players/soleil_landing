"use client"

import React from 'react'
import Image from 'next/image'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
import { useEffect, useRef, useState } from 'react'

const IMAGES = [
  "/images/home/banner-1.jpg",
  "/images/home/banner-2.png",
  "/images/home/banner-3.jpg",
  "/images/home/banner-4.jpg",
]

const HomeBanner = () => {
  const [api, setApi] = useState<CarouselApi | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const autoplayTimer = useRef<NodeJS.Timeout | null>(null)



  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap())
    }

    onSelect()
    api.on('select', onSelect)
    api.on('reInit', onSelect)

    return () => {
      api.off('select', onSelect)
      api.off('reInit', onSelect)
    }
  }, [api])

  useEffect(() => {
    if (!api) return

    const start = () => {
      if (autoplayTimer.current) return
      autoplayTimer.current = setInterval(() => {
        api.scrollNext()
      }, 4000)
    }
    const stop = () => {
      if (!autoplayTimer.current) return
      clearInterval(autoplayTimer.current)
      autoplayTimer.current = null
    }

    start()
    return stop
  }, [api])

  return (
    <div className="w-screen h-screen">
      <h1>{t('home.banner.title')}</h1>
      <Carousel opts={{ loop: true, align: 'start' }} className="w-full h-full" setApi={setApi}>
        <CarouselContent>
          {IMAGES.map((src, idx) => (
            <CarouselItem key={src} className="w-full h-full relative">
              <Image
                src={src}
                alt="Hero banner"
                fill
                priority={idx === 0}
                sizes="100vw"
                className="object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
          {IMAGES.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => api?.scrollTo(i)}
              className={
                i === selectedIndex
                  ? 'h-2 w-6 rounded-full bg-white/90'
                  : 'h-2 w-2 rounded-full bg-white/50'
              }
            />
          ))}
        </div>
      </Carousel>
    </div>
  )
}

export default HomeBanner