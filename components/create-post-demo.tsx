
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Plus, Loader2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { createPost, checkPostsStatus } from "@/lib/actions"
import { PostCounter } from "./post-counter"



const categories = [
  {
    id: "electronics",
    label: "Electronics",
    subcategories: ["Smartphones", "Laptops", "Tablets", "Cameras", "Audio Equipment", "Gaming Consoles"],
  },
  {
    id: "furniture",
    label: "Furniture",
    subcategories: ["Sofas", "Tables", "Chairs", "Beds", "Storage", "Outdoor Furniture"],
  },
  {
    id: "vehicles",
    label: "Vehicles",
    subcategories: ["Cars", "Motorcycles", "Bicycles", "Auto Parts", "Accessories"],
  },
  {
    id: "fashion",
    label: "Fashion",
    subcategories: ["Men's Clothing", "Women's Clothing", "Shoes", "Accessories", "Jewelry", "Watches"],
  },
  {
    id: "books",
    label: "Books & Media",
    subcategories: ["Books", "Textbooks", "Magazines", "Movies", "Music", "Video Games"],
  },
  {
    id: "sports",
    label: "Sports & Outdoors",
    subcategories: ["Exercise Equipment", "Sports Gear", "Camping", "Hiking", "Fishing"],
  },
]

// Ethiopian cities
const locations = [
  "Addis Ababa",
  "Dire Dawa",
  "Hawassa",
  "Mekelle",
  "Gondar",
  "Bahir Dar",
  "Adama",
  "Jimma",
  "Dessie",
  "Jijiga",
  "Shashamane",
  "Bishoftu",
  "Sodo",
  "Arba Minch",
  "Hosaena",
  "Harar",
  "Dilla",
  "Nekemte",
  "Debre Birhan",
  "Asella",
]

// Define your posting schema
const postingSchema = z.object({
  category: z.string().min(1, "Please select a category"),
  subcategory: z.string().min(1, "Please select a subcategory"),
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  condition: z.enum(["new", "like-new", "good", "fair", "poor"]),
  location: z.string().min(1, "Please select a location"),
  preferredSwaps: z.string().optional(),
  images: z.array(z.string()).min(1, "Please add at least one image"),
})

type PostingData = z.infer<typeof postingSchema>

export function CreatePostDemo() {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
    watch,
  } = useForm<PostingData>({
    resolver: zodResolver(postingSchema),
    defaultValues: {
      images: [],
    },
    mode: "onChange",
  })

  // Watch the form values for debugging
  const formValues = watch()

  // Update the images field whenever uploadedImages changes
  useEffect(() => {
    setValue("images", uploadedImages)
  }, [uploadedImages, setValue])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
      const updatedImages = [...uploadedImages, ...newImages]
      setUploadedImages(updatedImages)
      setValue("images", updatedImages, { shouldValidate: true })
    }
  }

  const removeImage = (index: number) => {
    const updatedImages = uploadedImages.filter((_, i) => i !== index)
    setUploadedImages(updatedImages)
    setValue("images", updatedImages, { shouldValidate: true })
  }

  const handleCreatePost = async (data: PostingData) => {
    setIsSubmitting(true)

try {
      // First check if user has posts available
      const currentStatus = await checkPostsStatus()
      const totalRemaining = currentStatus.remainingFreePosts + currentStatus.remainingPaidPosts

      if (totalRemaining <= 0) {
        toast.error("You don't have any posts remaining. Please purchase a plan to continue posting.")
        return
      }

      // Create the post with the provided data
      const result = await createPost(data) // Pass the data to createPost
      console.log("Post creation result:", result)

      // Show success message with remaining posts
      const totalRemainingAfter = result.remainingFreePosts + result.remainingPaidPosts

      toast.success(
        `Post created successfully! You have ${totalRemainingAfter} post${totalRemainingAfter !== 1 ? "s" : ""} remaining.`,
      )

      // Clear the form
      reset()
      setUploadedImages([])
      setSelectedCategory("")
    } catch (error) {
      console.error("Error creating post:", error)
      toast.error("There was an error creating your post. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedCategoryData = categories.find((cat) => cat.id === selectedCategory)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <Card className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <CardHeader>
            <CardTitle>Create a Post</CardTitle>
            <CardDescription>Use this form to create a post and manage your items.</CardDescription>
          </CardHeader>
          <CardContent>
            <PostCounter />
            <form
              onSubmit={handleSubmit(handleCreatePost)}
              className="space-y-6"
            >
              {/* Category Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                  <select
                    {...register("category")}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-teal-500 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                  {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subcategory</label>
                  <select
                    {...register("subcategory")}
                    className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-teal-500 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                    disabled={!selectedCategory}
                  >
                    <option value="">Select Subcategory</option>
                    {selectedCategoryData?.subcategories.map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                  {errors.subcategory && <p className="mt-1 text-sm text-red-600">{errors.subcategory.message}</p>}
                </div>
              </div>

{/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                <input
                  type="text"
                  {...register("title")}
                  className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-teal-500 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter item title"
                />
                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <Textarea
                  {...register("description")}
                  rows={4}
                  className="resize-none w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-teal-500 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Describe your item in detail"
                />
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
              </div>

              {/* Condition */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Condition</label>
                <select
                  {...register("condition")}
                  className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-teal-500 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select Condition</option>
                  <option value="new">New</option>
                  <option value="like-new">Like New</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
                {errors.condition && <p className="mt-1 text-sm text-red-600">{errors.condition.message}</p>}
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                <select
                  {...register("location")}
                  className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-teal-500 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select Location</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
                {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>}
              </div>

              {/* Preferred Swaps */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Preferred Swaps (Optional)
                </label>
                <input
                  type="text"
                  {...register("preferredSwaps")}
                  className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-teal-500 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                  placeholder="What would you like to swap for?"
                />
              </div>


{/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Photos</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {uploadedImages.map((image, index) => (
                    <div key={index} className="relative aspect-square">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Upload ${index + 1}`}
                        fill
                        className="object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <label className="relative aspect-square cursor-pointer bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    <input type="file" className="hidden" accept="image/*" multiple onChange={handleImageUpload} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Plus className="h-8 w-8 text-gray-400" />
                    </div>
                  </label>
                </div>
                {errors.images && <p className="mt-1 text-sm text-red-600">{errors.images.message}</p>}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting||!isValid}
                className="w-full bg-teal-600 text-white py-3 rounded-md font-medium hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    Creating Post...
                  </div>
                ) : (
                  "Create Post"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function setIsSubmitting(arg0: boolean) {
  throw new Error("Function not implemented.")
}


function register(arg0: string): React.JSX.IntrinsicAttributes & React.ClassAttributes<HTMLSelectElement> & React.SelectHTMLAttributes<HTMLSelectElement> {
  throw new Error("Function not implemented.")
}

