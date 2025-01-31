import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function About() {
  const details = [
    { label: "Name:", value: "Richu Sony" },
    { label: "Education:", value: "Bachelor of Computer Application (BCA)" },
    { label: "Institution:", value: "St. Aloysius (Autonomous) College, Mangalore" },
    { label: "Email:", value: "sonyrichu4@gmail.com" },
    { label: "Phone:", value: "+91 9947619644" },
  ]

  return (
    <section className="py-20 bg-background" id="about">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20240709-WA0137.jpg-QKY7Ygm2kC5fpdozlUcFSySFWX8cdc.jpeg"
              alt="Richu Sony"
              width={400}
              height={500}
              className="rounded-lg"
            />
          </div>
          <div>
            <h2 className="text-5xl font-bold mb-6">
              About <span className="text-primary">Me</span>
            </h2>
            <p className="text-foreground/70 mb-8">
              Aspiring MERN Stack Developer with strong skills in MongoDB, Express.js, React, and Node.js, seeking to
              leverage my passion for web development and problem-solving abilities to contribute to innovative projects
              and grow within a dynamic tech team.
            </p>
            <div className="grid grid-cols-1 gap-4 mb-8">
              {details.map((detail, index) => (
                <div key={index} className="flex">
                  <span className="w-32 text-foreground/70">{detail.label}</span>
                  <span className="text-foreground">{detail.value}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <div>
                <span className="text-4xl font-bold text-primary">3</span>
                <p className="text-foreground/70">Projects completed</p>
              </div>
              <Button size="lg" className="bg-primary text-background hover:bg-primary/90">
                DOWNLOAD CV
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

