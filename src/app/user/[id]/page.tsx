import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function UserPage({ params }: { params: { id: string } }) {
  // This is mock data. In a real application, you would fetch this data based on the user ID.
  const user = {
    id: params.id,
    name: "John Doe",
    image: "/placeholder.svg",
    joinDate: "January 2023",
    location: "Addis Ababa, Ethiopia",
    bio: "Passionate about swapping and sustainable living.",
    rating: 4.8,
    totalSwaps: 52,
    listedItems: [
      { id: 1, title: "Vintage Camera", price: "1,500 ETB", image: "/placeholder.svg" },
      { id: 2, title: "Mountain Bike", price: "5,000 ETB", image: "/placeholder.svg" },
      // Add more items as needed
    ],
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <Image
            src={user.image || "/placeholder.svg"}
            alt={user.name}
            width={150}
            height={150}
            className="rounded-full"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Member since {user.joinDate}</p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{user.location}</p>
            <p className="mb-4">{user.bio}</p>
            <div className="flex items-center space-x-4 mb-4">
              <Badge variant="secondary">Rating: {user.rating}/5</Badge>
              <Badge variant="secondary">Total Swaps: {user.totalSwaps}</Badge>
            </div>
            <Button>Message {user.name}</Button>
          </div>
        </div>
      </Card>

      <h2 className="text-2xl font-bold mt-8 mb-4">Listed Items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {user.listedItems.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              width={300}
              height={200}
              className="w-full object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{item.price}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

