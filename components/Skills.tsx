const skills = [
  { name: "JavaScript (ES6+)", percentage: 90 },
  { name: "React.js", percentage: 85 },
  { name: "Node.js", percentage: 80 },
  { name: "MongoDB", percentage: 85 },
  { name: "Express.js", percentage: 80 },
  { name: "Next.js", percentage: 75 },
]

export default function Skills() {
  return (
    <section className="py-20 bg-background" id="skills">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold mb-12">
          My <span className="text-primary">Skills</span>
        </h2>
        <p className="text-foreground/70 mb-12 max-w-2xl">
          Specialized in modern web development technologies with a focus on the MERN stack
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skill) => (
            <div key={skill.name} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{skill.name}</span>
                <span className="text-primary">{skill.percentage}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: `${skill.percentage}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

