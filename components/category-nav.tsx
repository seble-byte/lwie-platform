"use client"

import { useState } from "react"
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
  "Automotive",
  "Furniture",
  "Gardening Supplies",
  "Office Supplies",
  "Jewelry and Accessories",
  "Beauty Tools",
  "Fitness Equipment",
  "Gaming",
  "Stationery",
  "Musical Instruments"
]

export function CategoryNav() {
  const [currentCategory, setCurrentCategory] = useState(0)

  const scrollCategories = (direction: "left" | "right") => {
    const container = document.getElementById("categories-container")
    if (container) {
      const scrollAmount = direction === "left" ? -200 : 200
      container.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow relative">
      <button
        onClick={() => scrollCategories("left")}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg z-10"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <div id="categories-container" className="container mx-auto px-12 overflow-x-auto scrollbar-hide">
        <div className="flex items-center space-x-8 py-4 whitespace-nowrap">
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => setCurrentCategory(index)}
              className={`text-sm font-medium transition-colors ${
                currentCategory === index
                  ? "text-teal-600 dark:text-teal-400"
                  : "text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <button
        onClick={() => scrollCategories("right")}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg z-10"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </nav>
  )
}

