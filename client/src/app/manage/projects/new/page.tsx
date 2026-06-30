import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import ProjectForm from "@/components/manage/ProjectForm"

export default function NewProjectPage() {
  return (
    <div>
      <Link href="/manage/projects" className="inline-flex items-center gap-2 text-sm mb-6" style={{ color: "var(--t3)" }}>
        <ArrowLeft size={14} /> Back to Projects
      </Link>
      <h1 className="font-black text-2xl mb-6" style={{ color: "var(--t1)", fontFamily: "var(--font-display)" }}>New Project</h1>
      <ProjectForm mode="create" />
    </div>
  )
}
