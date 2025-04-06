// "use client"

// import { useState } from "react"
// import Image from "next/image"
// import Link from "next/link"
// import { motion } from "framer-motion"
// import { ChevronLeft, ChevronRight, MapPin, MessageCircle, Share2, Heart, ZoomIn, X } from "lucide-react"
// import { useTheme } from "next-themes"

// // Simulated data - replace with API call
// const itemData = {
//   id: 1,
//   title: "Comfortable Leather Sofa",
//   price: "20,500 ETB",
//   location: "Addis Ababa",
//   condition: "Used",
//   description:
//     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non varius sapien, at imperdiet felis. Nam auctor, nisi eget varius sapien, at imperdiet felis.",
//   images: ["/sofa1.jpg", "/sofa2.jpg", "/sofa3.jpg", "/sofa4.jpg"],
//   owner: {
//     name: "John Doe",
//     image: "/placeholder.svg",
//     verified: true,
//     rating: 4.8,
//   },
//   relatedItems: [
//     {
//       id: 2,
//       title: "Modern Sofa",
//       price: "150,000 ETB",
//       location: "Hawassa",
//       condition: "Used",
//       image: "/modern sofa.jpg",
//     },
//     {
//       id: 3,
//       title: "Modern Dining Table",
//       price: "30,000 ETB",
//       location: "Addis Ababa",
//       condition: "Used",
//       image: "/dining table.jpg",
//     },
//     // Add more related items...
//   ],
// }

// export default function ItemDetailPage({ params }: { params: { id: string } }) {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0)
//   const [showZoom, setShowZoom] = useState(false)
//   const [isSwapModalOpen, setIsSwapModalOpen] = useState(false)
//   const { theme } = useTheme()

//   const nextImage = () => {
//     setCurrentImageIndex((prev) => (prev + 1) % itemData.images.length)
//   }

//   const previousImage = () => {
//     setCurrentImageIndex((prev) => (prev - 1 + itemData.images.length) % itemData.images.length)
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       <div className="container mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Image Gallery */}
//           <div className="relative">
//             <div className="relative h-[400px] sm:h-[500px] rounded-lg overflow-hidden">
//               <Image
//                 src={itemData.images[currentImageIndex] || "/placeholder.svg"}
//                 alt={itemData.title}
//                 fill
//                 className="object-cover"
//               />
//               <button
//                 onClick={() => setShowZoom(true)}
//                 className="absolute top-4 right-4 p-2 bg-white/80 dark:bg-gray-800/80 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors"
//               >
//                 <ZoomIn className="h-5 w-5" />
//               </button>
//             </div>
//             <button
//               onClick={previousImage}
//               className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 dark:bg-gray-800/80 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors"
//             >
//               <ChevronLeft className="h-6 w-6" />
//             </button>
//             <button
//               onClick={nextImage}
//               className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 dark:bg-gray-800/80 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors"
//             >
//               <ChevronRight className="h-6 w-6" />
//             </button>
//             <div className="flex justify-center mt-4 space-x-2">
//               {itemData.images.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentImageIndex(index)}
//                   className={`w-2 h-2 rounded-full transition-colors ${
//                     currentImageIndex === index ? "bg-teal-600" : "bg-gray-300 dark:bg-gray-700"
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Item Details */}
//           <div className="space-y-6">
//             <div className="flex justify-between items-start">
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{itemData.title}</h1>
//                 <p className="text-2xl font-bold text-teal-600 mt-2">{itemData.price}</p>
//               </div>
//               <div className="flex space-x-2">
//                 <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400">
//                   <Heart className="h-6 w-6" />
//                 </button>
//                 <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400">
//                   <Share2 className="h-6 w-6" />
//                 </button>
//               </div>
//             </div>

//             <div className="flex items-center text-gray-600 dark:text-gray-300">
//               <MapPin className="h-5 w-5 mr-2" />
//               {itemData.location}
//             </div>

//             <div className="border-t dark:border-gray-700 pt-6">
//               <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Description</h2>
//               <p className="text-gray-600 dark:text-gray-300">{itemData.description}</p>
//             </div>

//             <div className="border-t dark:border-gray-700 pt-6">
//               <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Swapper Information</h2>
//               <div className="flex items-center space-x-4">
//                 <Image
//                   src={itemData.owner.image || "/sofa.jpg"}
//                   alt={itemData.owner.name}
//                   width={48}
//                   height={48}
//                   className="rounded-full"
//                 />
//                 <div>
//                   <p className="font-medium text-gray-900 dark:text-white">
//                     {itemData.owner.name}
//                     {itemData.owner.verified && <span className="ml-2 text-teal-600">✓</span>}
//                   </p>
//                   <p className="text-sm text-gray-600 dark:text-gray-300">Rating: {itemData.owner.rating}/5</p>
//                 </div>
//                 <button className="ml-auto flex items-center space-x-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md">
//                   <MessageCircle className="h-5 w-5" />
//                   <span>Message</span>
//                 </button>
//               </div>
//             </div>

//             <div className="border-t dark:border-gray-700 pt-6">
//               <button
//                 onClick={() => setIsSwapModalOpen(true)}
//                 className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-md font-medium"
//               >
//                 Swap Now
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Related Items */}
//         <div className="mt-16">
//           <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Similar Items</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {itemData.relatedItems.map((item) => (
//               <motion.div
//                 key={item.id}
//                 whileHover={{ y: -5 }}
//                 className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
//               >
//                 <div className="relative h-48">
//                   <Image src={item.image || "/sofa.jpg"} alt={item.title} fill className="object-cover" />
//                 </div>
//                 <div className="p-4">
//                   <div className="flex justify-between items-start mb-2">
//                     <div>
//                       <p className="font-bold text-xl dark:text-white">{item.price}</p>
//                       <p className="text-sm text-gray-600 dark:text-gray-300">{item.title}</p>
//                     </div>
//                     <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{item.condition}</span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <p className="text-sm text-gray-500 dark:text-gray-400">{item.location}</p>
//                     <Link
//                       href={`/items/${item.id}`}
//                       className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md text-sm font-medium"
//                     >
//                       View Details
//                     </Link>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Image Zoom Modal */}
//       {showZoom && (
//         <div
//           className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
//           onClick={() => setShowZoom(false)}
//         >
//           <div className="relative w-full h-full max-w-4xl mx-auto p-4">
//             <Image
//               src={itemData.images[currentImageIndex] || "/sofa.jpg"}
//               alt={itemData.title}
//               fill
//               className="object-contain"
//             />
//             <button
//               onClick={() => setShowZoom(false)}
//               className="absolute top-4 right-4 text-white hover:text-gray-300"
//             >
//               <X className="h-6 w-6" />
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Swap Request Modal */}
//       {isSwapModalOpen && (
//         <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
//           <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
//             <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Send Swap Request</h3>
//             <p className="text-gray-600 dark:text-gray-300 mb-4">Would you like to propose a swap for this item?</p>
//             <div className="flex space-x-4">
//               <button
//                 onClick={() => setIsSwapModalOpen(false)}
//                 className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => {
//                   // Handle swap request
//                   setIsSwapModalOpen(false)
//                 }}
//                 className="flex-1 bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700"
//               >
//                 Send Request
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

