"use client"

import { useEffect, useState } from "react"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", updatePosition)
    return () => window.removeEventListener("mousemove", updatePosition)
  }, [])

  return (
    <div
      className="fixed w-8 h-8 pointer-events-none z-50 mix-blend-difference"
      style={{
        left: position.x - 16,
        top: position.y - 16,
      }}
    >
      <div className="absolute inset-0 bg-white rounded-full scale-50 animate-pulse" />
      <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-25" />
    </div>
  )
}

