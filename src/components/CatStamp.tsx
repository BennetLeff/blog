'use client'

import React from 'react'
import Image from 'next/image'

export function CatStamp() {
  return (
    <div className="group relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center cursor-pointer select-none">
      {/* Circular Rotating Cursive Text Ring that animates in on hover */}
      <div className="absolute inset-0 pointer-events-none transition-all duration-500 ease-out opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 group-hover:animate-[spin_12s_linear_infinite] z-10">
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full overflow-visible"
        >
          <defs>
            <path
              id="dalia-circle-path"
              d="M 100, 100 m -76, 0 a 76,76 0 1,1 152,0 a 76,76 0 1,1 -152,0"
            />
          </defs>
          <text
            className="text-[15px] font-ogg italic fill-[#d84715]"
            style={{
              fontFamily: 'var(--font-ogg), "Snell Roundhand", "Brush Script MT", cursive, serif',
              fontStyle: 'italic',
              letterSpacing: '0.22em',
            }}
          >
            <textPath
              href="#dalia-circle-path"
              startOffset="0%"
            >
              dalia • dalia • dalia • dalia • dalia •
            </textPath>
          </text>
        </svg>
      </div>

      {/* Cat Stamp Sticker */}
      <div className="relative z-20 transition-transform duration-300 ease-out rotate-[10deg] group-hover:rotate-[4deg] group-hover:scale-105">
        <Image
          src="/cat-stamp.png"
          alt="Dalia"
          width={140}
          height={140}
          unoptimized
          priority
          className="w-20 h-20 sm:w-28 sm:h-28 drop-shadow-md"
        />
      </div>
    </div>
  )
}
