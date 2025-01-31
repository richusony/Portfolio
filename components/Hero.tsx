import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl">
          <span className="text-primary mb-4 block">HELLO!</span>
          <h1 className="text-6xl font-bold mb-6">
            I'm{" "}
            <span className="text-primary">
              Richu
              <br />
              Sony
            </span>
          </h1>
          <p className="text-2xl text-foreground/70 mb-8">Full Stack Developer (MERN Stack)</p>
          <div className="flex gap-4">
            <Button size="lg" className="bg-primary text-background hover:bg-primary/90">
              HIRE ME
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-background"
            >
              MY WORKS
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

