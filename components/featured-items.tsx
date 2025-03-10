"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { MapPin, Filter } from "lucide-react"

const featuredItems = [
  {
    id: 1,
    title: "Comfortable Leather Sofa",
    price: "17,500 ETB",
    location: "Addis Ababa",
    condition: "Used",
    image: "/images/leather-sofa.jpg",
  },
  {
    id: 2,
    title: "V40 Toyota",
    price: "450,000 ETB",
    location: "Addis Ababa",
    condition: "Used",
    image: "/images/toyota-v40.jpg",
  },
  {
    id: 3,
    title: "iPhone 12 Pro",
    price: "35,000 ETB",
    location: "Dire Dawa",
    condition: "Like New",
    image: "/images/iphone-12-pro.jpg",
  },
  {
    id: 4,
    title: "Mountain Bike",
    price: "12,000 ETB",
    location: "Hawassa",
    condition: "Used",
    image: "/images/mountain-bike.jpg",
  },
]

export function FeaturedItems() {
  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold dark:text-white">Featured Listings</h2>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-md shadow">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-md shadow">
            <MapPin className="h-4 w-4" />
            <span>Location</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredItems.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden group"
          >
            <div className="relative h-48">
              <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-bold text-xl dark:text-white">{item.price}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{item.title}</p>
                </div>
                <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{item.condition}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.location}</p>
                <Link
                  href={`/items/${item.id}`}
                  className="opacity-0 group-hover:opacity-100 transition-opacity bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  View Details
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

