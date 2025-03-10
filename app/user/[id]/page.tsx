"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { MapPin, Star, Package } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

// Mock user data - replace with API call in production
const userData = {
  id: "1",
  name: "John Doe",
  location: "Addis Ababa, Ethiopia",
  joinDate: "Joined January 2023",
  rating: 4.5,
  totalSwaps: 23,
  avatar: "/images/user1.jpg",
  listedItems: [
    { id: 1, title: "Leather Sofa", image: "/images/leather-sofa.jpg", price: "10,500 ETB" },
    { id: 2, title: "Dining Table", image: "/images/dining-table.jpg", price: "8,000 ETB" },
    { id: 3, title: "iPhone 12", image: "/images/iphone-12.jpg", price: "25,000 ETB" },
    { id: 4, title: "Mountain Bike", image: "/images/mountain-bike.jpg", price: "15,000 ETB" },
  ],
}

export default function UserPage({ params }: { params: { id: string } }) {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* User Profile Section */}
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg mb-8">
        <div className="px-4 py-5 sm:px-6 flex flex-col sm:flex-row items-center sm:items-start justify-between">
          <div className="flex flex-col sm:flex-row items-center sm:items-start">
            <Image
              src={userData.avatar || "/placeholder.svg"}
              alt={userData.name}
              width={100}
              height={100}
              className="rounded-full mb-4 sm:mb-0 sm:mr-4"
            />
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{userData.name}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center sm:justify-start mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                {userData.location}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{userData.joinDate}</p>
            </div>
          </div>
          <div className="text-center sm:text-right mt-4 sm:mt-0">
            <div className="flex items-center justify-center sm:justify-end mb-2">
              <Star className="h-5 w-5 text-yellow-400 mr-1" />
              <span className="text-lg font-semibold text-gray-900 dark:text-white">{userData.rating}</span>
            </div>
            <Badge variant="secondary" className="ml-2">
              <Package className="h-4 w-4 mr-1" />
              {userData.totalSwaps} Swaps
            </Badge>
          </div>
        </div>
      </div>

      {/* User's Listed Items */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Listed Items</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {userData.listedItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="relative h-48">
                <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-teal-600 dark:text-teal-400 font-bold">{item.price}</p>
                <Button className="w-full mt-4">View Details</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

