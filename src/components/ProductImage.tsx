'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ProductImageProps {
  src?: string
  alt: string
  className?: string
}

export default function ProductImage({ src, alt, className = "" }: ProductImageProps) {
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  if (!src || imageError) {
    return (
      <div className={`bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center ${className}`}>
        <div className="text-gray-400 text-center">
          <div className="text-4xl mb-2">🏪</div>
          <div className="text-sm font-medium">ShopEasy</div>
          <div className="text-xs">Product Image</div>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className} overflow-hidden`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-400">
            <div className="text-2xl">📷</div>
          </div>
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform hover:scale-105 duration-300"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setImageError(true)
          setIsLoading(false)
        }}
      />
    </div>
  )
}