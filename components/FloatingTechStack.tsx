"use client"

import { useEffect, useRef } from "react"

const technologies = [
  "React",
  "Node.js",
  "MongoDB",
  "Express",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "TailwindCSS",
  "Git",
]

export default function FloatingTechStack() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const elements = containerRef.current?.children
    if (!elements) return

    const animate = () => {
      Array.from(elements).forEach((el, i) => {
        const htmlEl = el as HTMLElement
        htmlEl.style.transform = `translate(${Math.sin(Date.now() * 0.001 + i) * 30}px, ${
          Math.cos(Date.now() * 0.001 + i) * 30
        }px)`
      })
      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
      {technologies.map((tech, i) => (
        <div
          key={tech}
          className="absolute text-2xl font-bold transition-transform duration-300 ease-in-out"
          style={{
            left: `${(i % 3) * 33}%`,
            top: `${Math.floor(i / 3) * 33}%`,
          }}
        >
          {tech}
        </div>
      ))}
    </div>
  )
}

