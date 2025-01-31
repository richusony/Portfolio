import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export default function About() {
  const details = [
    { label: "Name", value: "Richu Sony" },
    { label: "Education", value: "Bachelor of Computer Application (BCA)" },
    { label: "Institution", value: "St. Aloysius (Autonomous) College, Mangalore" },
    { label: "Email", value: "sonyrichu4@gmail.com" },
    { label: "Phone", value: "+91 9947619644" },
  ]

  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-8">About Me</h1>
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <p className="text-lg mb-6">
            Aspiring MERN Stack Developer with strong skills in MongoDB, Express.js, React, and Node.js, seeking to
            leverage my passion for web development and problem-solving abilities to contribute to innovative projects
            and grow within a dynamic tech team.
          </p>
          <Button>
            Download CV <Download className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Personal Details</h2>
          <ul className="space-y-2">
            {details.map((detail, index) => (
              <li key={index} className="flex">
                <span className="font-semibold w-32">{detail.label}:</span>
                <span>{detail.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

