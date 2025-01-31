import { motion } from "framer-motion"
import { ExternalLink, GitlabIcon as GitHub } from "lucide-react"

const projects = [
  {
    title: "Taxidi",
    description: "A local car rental web application built with the MERN stack, serving the Kannur district.",
    features: [
      "User Authentication & Verification",
      "Diverse Vehicle Listings",
      "Seamless Booking",
      "Host Opportunities",
      "Taxidi-Owned Fleet",
    ],
    website: "https://taxidi.vercel.app/",
    github: "https://github.com/richusony/Taxidi",
  },
  {
    title: "ChatWave",
    description:
      "A real-time chat platform built using React, Node.js, and Socket.IO, designed to facilitate seamless and instant communication between users.",
    features: ["Real-time Messaging", "User-friendly Interface", "Multi-purpose Use", "Scalable and Secure"],
    website: "https://richu-chatwave.vercel.app/",
    github: "https://github.com/richusony/ChatWave",
    demo: "https://tinyurl.com/y867m62t",
  },
  {
    title: "FoodWo",
    description: "A locally-focused food delivery service that operates exclusively in Kannur District.",
    features: ["Admin Dashboard", "User Home", "Order & Payment", "Coupons & Promotions"],
    website: "https://foodwo.onrender.com",
    github: "https://github.com/richusony/FoodWo",
    demo: "https://tinyurl.com/mpf8en4z",
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-4 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-12 text-center text-primary"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Projects
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-card rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-primary/20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <h3 className="text-xl font-semibold mb-3 text-primary">{project.title}</h3>
              <p className="text-muted-foreground mb-4">{project.description}</p>
              <ul className="list-disc list-inside mb-4 text-sm text-muted-foreground">
                {project.features.map((feature, i) => (
                  <li key={i} className="mb-1">
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="flex space-x-4">
                <a
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  <ExternalLink className="inline-block w-5 h-5 mr-1" />
                  Website
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  <GitHub className="inline-block w-5 h-5 mr-1" />
                  GitHub
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    <ExternalLink className="inline-block w-5 h-5 mr-1" />
                    Demo
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <a
            href="https://www.notion.so/Projects-1b6e1e981295446d94537bf0b83bd727?pvs=4"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 transition-colors"
          >
            View More Projects
          </a>
        </div>
      </div>
    </section>
  )
}

