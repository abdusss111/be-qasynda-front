"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, User, Briefcase, FileText } from "lucide-react"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            Job Platform
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/jobs"
              className={`${isActive("/jobs") ? "text-blue-600 font-medium" : "text-gray-600"} hover:text-blue-600`}
            >
              Find Jobs
            </Link>
            <Link
              href="/applications"
              className={`${isActive("/applications") ? "text-blue-600 font-medium" : "text-gray-600"} hover:text-blue-600`}
            >
              Applications
            </Link>
            <Link
              href="/my-jobs"
              className={`${isActive("/my-jobs") ? "text-blue-600 font-medium" : "text-gray-600"} hover:text-blue-600`}
            >
              My Jobs
            </Link>
            <Link
              href="/profile"
              className={`${isActive("/profile") ? "text-blue-600 font-medium" : "text-gray-600"} hover:text-blue-600`}
            >
              Profile
            </Link>
            <Link href="/login" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Login
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-500 focus:outline-none" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-2">
              <Link
                href="/jobs"
                className={`${isActive("/jobs") ? "bg-blue-50 text-blue-600" : "text-gray-600"} px-4 py-2 rounded-md hover:bg-blue-50`}
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center">
                  <Briefcase size={18} className="mr-2" />
                  Find Jobs
                </div>
              </Link>
              <Link
                href="/applications"
                className={`${isActive("/applications") ? "bg-blue-50 text-blue-600" : "text-gray-600"} px-4 py-2 rounded-md hover:bg-blue-50`}
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center">
                  <FileText size={18} className="mr-2" />
                  Applications
                </div>
              </Link>
              <Link
                href="/my-jobs"
                className={`${isActive("/my-jobs") ? "bg-blue-50 text-blue-600" : "text-gray-600"} px-4 py-2 rounded-md hover:bg-blue-50`}
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center">
                  <Briefcase size={18} className="mr-2" />
                  My Jobs
                </div>
              </Link>
              <Link
                href="/profile"
                className={`${isActive("/profile") ? "bg-blue-50 text-blue-600" : "text-gray-600"} px-4 py-2 rounded-md hover:bg-blue-50`}
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center">
                  <User size={18} className="mr-2" />
                  Profile
                </div>
              </Link>
              <Link
                href="/login"
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

