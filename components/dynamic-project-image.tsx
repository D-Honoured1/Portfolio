"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

interface DynamicProjectImageProps {
  demoUrl: string | null
  fallbackImage: string
  title: string
}

export function DynamicProjectImage({ demoUrl, fallbackImage, title }: DynamicProjectImageProps) {
  const [imageSrc, setImageSrc] = useState(fallbackImage)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // If there's a demo URL, try to use a screenshot service
    if (demoUrl) {
      setIsLoading(true)

      // Using a free screenshot API service
      // Try multiple fallback services
      const screenshotServices = [
        `https://image.thum.io/get/width/800/crop/600/maxAge/7/noanimate/${demoUrl}`,
        `https://api.apiflash.com/v1/urltoimage?access_key=demo&url=${encodeURIComponent(demoUrl)}&width=800&height=600`,
        fallbackImage
      ]

      // Try to load the first screenshot service
      const img = new window.Image()
      img.src = screenshotServices[0]

      img.onload = () => {
        setImageSrc(screenshotServices[0])
        setIsLoading(false)
      }

      img.onerror = () => {
        // If first service fails, use fallback image
        setImageSrc(fallbackImage)
        setIsLoading(false)
      }
    }
  }, [demoUrl, fallbackImage])

  return (
    <>
      <Image
        src={imageSrc || "/placeholder.svg"}
        alt={title}
        fill
        className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50 backdrop-blur-sm">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent" />
        </div>
      )}
    </>
  )
}
