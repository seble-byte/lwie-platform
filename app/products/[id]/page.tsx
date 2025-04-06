"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Share2, Flag, MapPin, Phone, Mail, Clock, ChevronLeft, ChevronRight } from "lucide-react"
import ProductCard from "@/components/product-card"
import { useState } from "react"

// This would normally come from a database
const getProductById = (id: string) => {
  return {
    id: Number.parseInt(id),
    title: "Comfortable Leather Sofa",
    price: "10,500 ETB",
    description:
      "Beautiful and comfortable leather sofa in excellent condition. Perfect for your living room or office reception area.",
    condition: "Used",
    location: "Addis Ababa",
    seller: {
      name: "Abebe Kebede",
      memberSince: "January 2022",
      responseTime: "Usually responds within 2 hours",
      phone: "+251 91 234 5678",
      email: "abebe@example.com",
    },
    details: [
      "Material: Genuine leather",
      "Color: Brown",
      "Dimensions: 200cm x 90cm x 85cm",
      "Seating capacity: 3 people",
      "Age: 2 years",
      "Reason for selling: Moving abroad",
    ],
    images: ["/images/furniture.png", "/images/furniture.png", "/images/furniture.png", "/images/furniture.png"],
    relatedProducts: [
      {
        id: 2,
        title: "Leather Armchair",
        price: "4,500 ETB",
        condition: "Used",
        location: "Addis Ababa",
        image: "/images/furniture.png",
      },
      {
        id: 3,
        title: "Coffee Table",
        price: "3,200 ETB",
        condition: "Used",
        location: "Addis Ababa",
        image: "/images/furniture.png",
      },
      {
        id: 4,
        title: "Floor Lamp",
        price: "1,800 ETB",
        condition: "New",
        location: "Addis Ababa",
        image: "/images/furniture.png",
      },
    ],
  }
}

// Client component for image gallery
function ImageGallery({ images }: { images: string[] }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const goToPrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  const setActiveImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  return (
    <div className="relative">
      {/* Main image with navigation arrows */}
      <div className="relative h-64 md:h-96 mb-3">
        <Image
          src={images[currentImageIndex] || "/placeholder.svg"}
          alt={`Product image ${currentImageIndex + 1}`}
          fill
          className="object-contain"
        />

        {/* Navigation arrows */}
        <button
          onClick={goToPrevImage}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full p-1 shadow-md hover:bg-white dark:hover:bg-gray-800 transition-all"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6 text-gray-700 dark:text-gray-300" />
        </button>

        <button
          onClick={goToNextImage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full p-1 shadow-md hover:bg-white dark:hover:bg-gray-800 transition-all"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6 text-gray-700 dark:text-gray-300" />
        </button>
      </div>

      {/* Thumbnail images */}
      <div className="flex justify-center space-x-2 mb-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(index)}
            className={`relative h-12 w-12 rounded-md overflow-hidden border-2 transition-all ${
              currentImageIndex === index
                ? "border-teal-500 dark:border-teal-400"
                : "border-gray-200 dark:border-gray-700"
            }`}
          >
            <Image src={image || "/placeholder.svg"} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id)

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen py-6">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link href="/" className="text-teal-700 hover:underline dark:text-teal-500 mb-2 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold dark:text-white">{product.title}</h1>
          <div className="flex items-center text-sm mt-2">
            <MapPin className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-600 dark:text-gray-300">{product.location}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-sm mb-6 border border-gray-200 dark:border-gray-800">
              <div className="p-6">
                {/* Image gallery with thumbnails above price */}
                <ImageGallery images={product.images} />

                <div className="flex justify-between items-center mb-4">
                  <div className="font-bold text-2xl text-teal-700 dark:text-teal-500">{product.price}</div>
                  <div className="text-gray-600 dark:text-gray-300 font-medium">{product.condition}</div>
                </div>

                <h2 className="text-lg font-semibold mb-2 dark:text-white">Description</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">{product.description}</p>

                <h2 className="text-lg font-semibold mb-2 dark:text-white">Details</h2>
                <ul className="list-disc pl-5 space-y-1 mb-6 dark:text-gray-300">
                  {product.details.map((detail, index) => (
                    <li key={index} className="text-gray-700 dark:text-gray-300">
                      {detail}
                    </li>
                  ))}
                </ul>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-teal-700 hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-700 text-white transition-all">
                    Send Request
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="transition-all hover:border-teal-700 hover:text-teal-700 dark:border-gray-700 dark:text-white dark:hover:border-teal-500 dark:hover:text-teal-500"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="transition-all hover:border-teal-700 hover:text-teal-700 dark:border-gray-700 dark:text-white dark:hover:border-teal-500 dark:hover:text-teal-500"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="transition-all hover:border-teal-700 hover:text-teal-700 dark:border-gray-700 dark:text-white dark:hover:border-teal-500 dark:hover:text-teal-500"
                  >
                    <Flag className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <h2 className="text-xl font-bold mb-4 dark:text-white">Similar Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  id={relatedProduct.id}
                  title={relatedProduct.title}
                  price={relatedProduct.price}
                  image={relatedProduct.image}
                  condition={relatedProduct.condition}
                  location={relatedProduct.location}
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6 mb-6 border border-gray-200 dark:border-gray-800">
              <h2 className="text-lg font-semibold mb-4 dark:text-white">Poster Information</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-300 font-bold text-xl mr-3">
                    {product.seller.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium dark:text-white">{product.seller.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Member since {product.seller.memberSince}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-gray-500 dark:text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-gray-600 dark:text-gray-300">{product.seller.responseTime}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-gray-500 dark:text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-gray-600 dark:text-gray-300">{product.seller.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-gray-500 dark:text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-gray-600 dark:text-gray-300">{product.seller.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-800">
              <h3 className="font-bold text-lg mb-4 dark:text-white">Safety Tips</h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• Meet poster in a safe public place</li>
                <li>• Check the item before you swap</li>
                <li>• Pay or swap only after inspecting the item</li>
                <li>• Never pay in advance</li>
                <li>• Report suspicious behavior</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

