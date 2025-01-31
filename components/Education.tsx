const education = [
  {
    institution: "St. Aloysius (Autonomous) College, Mangalore",
    degree: "Bachelor of Computer Application (BCA)",
    year: "2020-2023",
  },
  {
    institution: "Naduvil Higher Secondary School",
    degree: "Commerce with Computer Application",
    year: "2018-2020",
  },
]

export default function Education() {
  return (
    <section id="education" className="py-20 px-4 bg-gray-800">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">Education</h2>
        <div className="space-y-8">
          {education.map((edu, index) => (
            <div key={index} className="bg-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">{edu.institution}</h3>
              <p className="text-gray-300">{edu.degree}</p>
              <p className="text-gray-400">{edu.year}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

