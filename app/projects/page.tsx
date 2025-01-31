"use client"
import { Card } from "@/components/ui/card";
import { ExternalLink, Github, Play } from "lucide-react";
import { useEffect, useState } from "react";

const data:ProjectType[] = [
  {
    title: "Taxidi",
    description: "A local car rental web application built with the MERN stack, serving the Kannur district.",
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
];

type ProjectType = {
  title: string,
    description: string,
    website: string,
    github: string,
    demo: string,
}

const moreProjectsLink = "https://acidic-breadfruit-1fe.notion.site/Projects-1b6e1e981295446d94537bf0b83bd727?pvs=4";
const githubProjectsLink = "https://raw.githubusercontent.com/richusony/personal-projects/main/projects.json";

export default function Projects() {
  const [projects, setProjects] = useState(data);

  useEffect(() => {
    const fetchProjectsFromGitHub = async () => {
      try {
        const res = await fetch(githubProjectsLink);
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        setProjects(data);
      } catch (error:any) {
        console.error("Error fetching projects:", error.message);
      }
    };

    fetchProjectsFromGitHub();
  }, []); // ✅ Run only once on mount

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold mb-8">My Projects</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.title} className="p-6">
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
            <p className="text-muted-foreground mb-4">{project.description}</p>
            <div className="flex space-x-4">
              <a href={project.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                <ExternalLink className="w-5 h-5" />
              </a>
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                <Github className="w-5 h-5" />
              </a>
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                  <Play className="w-5 h-5" />
                </a>
              )}
            </div>
          </Card>
        ))}
      </div>
      <div className="mt-10 text-center">
        <a href={moreProjectsLink} className="mx-auto py-3 px-2 text-gray-300 hover:text-gray-200 bg-gray-900 w-fit rounded-md">
          More Projects
        </a>
      </div>
    </div>
  );
}
