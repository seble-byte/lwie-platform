import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const featuredItems = [
  {
    id: 1,
    title: "Comfortable Leather Sofa",
    price: "17,500 ETB",
    location: "Addis Ababa",
    condition: "Used",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    title: "V40 Toyota",
    price: "450,000 ETB",
    location: "Addis Ababa",
    condition: "Used",
    image: "/placeholder.svg",
  },
  // Add more items as needed
]

export function FeaturedItems() {
  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold dark:text-white">Featured Listings</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredItems.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="relative h-48">
              <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-bold text-xl dark:text-white">{item.price}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{item.title}</p>
                </div>
                <Badge variant="secondary">{item.condition}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.location}</p>
                <Link
                  href={`/items/${item.id}`}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  View Details
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}

