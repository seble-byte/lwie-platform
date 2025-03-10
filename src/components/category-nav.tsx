import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

const categories = [
  "Electronics",
  "Home Appliances",
  "Toys and Games",
  "Sport",
  "Health and Beauty Products",
  "Clothing",
  "Pet Supplies",
  "Medical Instrument",
  "Travel Gear",
  "Craft and Hobby Supplies",
  "Books",
]

export function CategoryNav() {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow relative">
      <button
        onClick={() => {
          const container = document.getElementById("categories-container")
          if (container) container.scrollBy({ left: -200, behavior: "smooth" })
        }}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg z-10"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <div id="categories-container" className="container mx-auto px-12 overflow-x-auto scrollbar-hide">
        <div className="flex items-center space-x-8 py-4 whitespace-nowrap">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/category/${category.toLowerCase().replace(" ", "-")}`}
              className="text-sm font-medium transition-colors text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400"
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
      <button
        onClick={() => {
          const container = document.getElementById("categories-container")
          if (container) container.scrollBy({ left: 200, behavior: "smooth" })
        }}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg z-10"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </nav>
  )
}

