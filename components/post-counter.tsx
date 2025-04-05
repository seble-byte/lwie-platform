"use client"

import { useEffect, useState } from "react"
import { AlertCircle, CheckCircle } from "lucide-react"
import { checkPostsStatus } from "@/lib/actions"

export function PostCounter() {
  const [postsStatus, setPostsStatus] = useState({
    remainingFreePosts: 0,
    remainingPaidPosts: 0,
    totalPaidPosts: 0,
    usedPaidPosts: 0,
    totalFreePosts: 3,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPostsStatus = async () => {
      try {
        const status = await checkPostsStatus()
        setPostsStatus(status)
      } catch (error) {
        console.error("Error fetching posts status:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPostsStatus()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center my-4">
        <div className="animate-pulse bg-gray-200 h-10 w-64 rounded-full"></div>
      </div>
    )
  }

  const totalRemaining = postsStatus.remainingFreePosts + postsStatus.remainingPaidPosts

  return (
    <div className="flex flex-col items-center gap-2 my-4">
      <div
        className={`inline-flex items-center px-4 py-2 rounded-full ${
          totalRemaining > 0 ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
        }`}
      >
        {totalRemaining > 0 ? <CheckCircle className="h-4 w-4 mr-2" /> : <AlertCircle className="h-4 w-4 mr-2" />}
        <span>
          {totalRemaining > 0
            ? `You have ${totalRemaining} post${totalRemaining !== 1 ? "s" : ""} remaining`
            : "You've used all your posts"}
        </span>
      </div>

      {postsStatus.totalPaidPosts > 0 && (
        <div className="text-sm text-gray-600">
          <span className="font-medium">{postsStatus.remainingPaidPosts}</span> paid posts and
          <span className="font-medium"> {postsStatus.remainingFreePosts}</span> free posts remaining
        </div>
      )}
    </div>
  )
}