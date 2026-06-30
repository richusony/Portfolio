import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import Hero from "@/components/home/Hero"
import About from "@/components/home/About"
import Services from "@/components/home/Services"
import Projects from "@/components/home/Projects"
import Testimonials from "@/components/home/Testimonials"
import Contact from "@/components/home/Contact"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
