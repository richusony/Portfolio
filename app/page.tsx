import Navigation from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react"
import Projects from "./projects/page"
import Footer from "@/components/Footer"
import Contact from "./contact/page"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <section id="home" className="section-padding min-h-screen flex items-center">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Hi, I'm <span className="gradient-text">Richu Sony</span>
              </h1>
              <p className="text-xl md:text-2xl mb-6 text-muted-foreground">Full Stack Developer (MERN Stack)</p>
              <Button size="lg" asChild>
                <a href="#contact">
                  Contact Me <ArrowRight className="ml-2" />
                </a>
              </Button>
            </div>
            <div className="md:w-1/2">
              <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20240709-WA0137.jpg-QKY7Ygm2kC5fpdozlUcFSySFWX8cdc.jpeg"
                  alt="Richu Sony"
                  fill
                  className="rounded-full object-cover border-4 border-primary"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="section-padding bg-muted">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">About Me</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg mb-4">
                Aspiring MERN Stack Developer with strong skills in MongoDB, Express.js, React, and Node.js, seeking to
                leverage my passion for web development and problem-solving abilities to contribute to innovative
                projects and grow within a dynamic tech team.
              </p>
              <Button asChild>
                <a href="/richu-sony-resume.pdf" download>
                  Download CV
                </a>
              </Button>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Personal Details</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Mail className="mr-2 h-4 w-4" />
                  <span>sonyrichu4@gmail.com</span>
                </li>
                <li className="flex items-center">
                  <Phone className="mr-2 h-4 w-4" />
                  <span>+91 9947619644</span>
                </li>
                <li className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>Kannur, Kerala, India</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="section-padding">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">My Skills</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: "JavaScript (ES6+)", percentage: 90 },
              { name: "React.js", percentage: 85 },
              { name: "Node.js", percentage: 80 },
              { name: "MongoDB", percentage: 85 },
              { name: "Express.js", percentage: 80 },
              { name: "Next.js", percentage: 75 },
            ].map((skill) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{skill.name}</span>
                  <span>{skill.percentage}%</span>
                </div>
                <Progress value={skill.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="section-padding bg-muted">
        {/* <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">My Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Taxidi",
                description:
                  "A local car rental web application built with the MERN stack, serving the Kannur district.",
                website: "https://taxidi.vercel.app/",
                github: "https://github.com/richusony/Taxidi",
                demo: "https://taxidi.vercel.app/",
              },
              {
                title: "ChatWave",
                description: "A real-time chat platform built using React, Node.js, and Socket.IO.",
                website: "https://richu-chatwave.vercel.app/",
                github: "https://github.com/richusony/ChatWave",
                demo: "https://tinyurl.com/y867m62t",
              },
              {
                title: "FoodWo",
                description: "A locally-focused food delivery service that operates exclusively in Kannur District.",
                website: "https://foodwo.onrender.com",
                github: "https://github.com/richusony/FoodWo",
                demo: "https://tinyurl.com/mpf8en4z",
              },
            ].map((project) => (
              <Card key={project.title} className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex space-x-4">
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80"
                    >
                      <Play className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-10 text-center"><a href={moreProjectsLink} className="mx-auto py-3 px-2 text-gray-300 hover:text-gray-200 bg-gray-900 w-fit rounded-md">More Projects</a></div>
        </div> */}
        <Projects />
      </section>

      <section id="contact" className="section-padding">
        <Contact />
      </section>
      <Footer />
    </div>
  )
}

