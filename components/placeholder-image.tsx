"use client"

import type { CSSProperties } from "react"

interface PlaceholderImageProps {
  width: number
  height: number
  text?: string
  className?: string
  style?: CSSProperties
}

export default function PlaceholderImage({
  width,
  height,
  text = "Placeholder Image",
  className = "",
  style = {},
}: PlaceholderImageProps) {
  // Calculate aspect ratio for responsive sizing
  const aspectRatio = width / height

  return (
    <div
      className={`bg-gray-200 flex items-center justify-center text-gray-500 overflow-hidden ${className}`}
      style={{
        aspectRatio: aspectRatio,
        width: "100%",
        ...style,
      }}
    >
      <div className="text-center p-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mx-auto mb-2"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
        <p className="text-sm">{text}</p>
        <p className="text-xs mt-1">
          {width} × {height}
        </p>
      </div>
    </div>
  )
}
