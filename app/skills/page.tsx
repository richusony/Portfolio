"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const skills = [
  { name: "JavaScript (ES6+)", percentage: 90 },
  { name: "React.js", percentage: 85 },
  { name: "Node.js", percentage: 80 },
  { name: "MongoDB", percentage: 85 },
  { name: "Express.js", percentage: 80 },
  { name: "Next.js", percentage: 75 },
]

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-8">My Skills</h1>
      <p className="text-lg mb-12">Specialized in modern web development technologies with a focus on the MERN stack</p>
      <div className="grid md:grid-cols-2 gap-8">
        {skills.map((skill, index) => (
          <div key={skill.name} className="space-y-2">
            <div className="flex justify-between">
              <span className="font-semibold">{skill.name}</span>
              <span className="text-primary">{skill.percentage}%</span>
            </div>
            <div className="progress-bar">
              <motion.div
                className="progress-bar-fill"
                initial={{ width: 0 }}
                animate={{ width: isVisible ? `${skill.percentage}%` : 0 }}
                transition={{ duration: 1, delay: index * 0.1 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

