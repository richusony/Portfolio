import Link from "next/link"

export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-gray-800 bg-opacity-90 z-50">
      <nav className="container mx-auto px-6 py-3">
        <ul className="flex justify-center space-x-6">
          <li>
            <Link href="#home" className="hover:text-blue-400 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link href="#projects" className="hover:text-blue-400 transition-colors">
              Projects
            </Link>
          </li>
          <li>
            <Link href="#skills" className="hover:text-blue-400 transition-colors">
              Skills
            </Link>
          </li>
          <li>
            <Link href="#education" className="hover:text-blue-400 transition-colors">
              Education
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

