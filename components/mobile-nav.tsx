"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Search } from "lucide-react"

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="sm:hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-white" aria-label="Toggle menu">
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg p-4 z-50">
          <div className="mb-4">
            <div className="relative">
              <input
                type="search"
                placeholder="Search items to swap..."
                className="w-full px-4 py-2 rounded-md text-gray-900 dark:text-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>
          <nav className="space-y-4">
            <Link
              href="/login"
              className="block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/register"
              className="block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Sign Up
            </Link>
          </nav>
        </div>
      )}
    </div>
  )
}

