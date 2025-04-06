import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProductCardProps {
  id: number
  title: string
  price: string
  image: string
  condition: string
  location: string
  type?: string
}

export default function ProductCard({
  id,
  title,
  price,
  image,
  condition,
  location,
  type = "product",
}: ProductCardProps) {
  return (
    <Link href={type === "gig" ? `/gigs/${id}` : `/products/${id}`} className="block group">
      <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300 bg-white dark:bg-gray-900 h-full transform group-hover:translate-y-[-2px]">
        <div className="relative h-48">
          <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/90 hover:bg-white dark:bg-gray-900/90 dark:hover:bg-gray-900 text-gray-500 hover:text-teal-700 dark:text-gray-400 dark:hover:text-teal-500 shadow-sm"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-4">
          <div className="font-bold text-teal-700 dark:text-teal-500">{price}</div>
          <h3 className="font-medium text-sm line-clamp-2 mt-1 dark:text-white group-hover:text-teal-700 dark:group-hover:text-teal-500 transition-colors">
            {title}
          </h3>
          <div className="flex justify-between items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">{condition}</span>
            <span>{location}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

