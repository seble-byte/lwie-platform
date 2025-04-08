"use server"

import { cookies } from "next/headers"

interface PaymentParams {
  amount: number
  planName: string
  currency: string
  customerName?: string
  customerEmail?: string
  numberOfPosts?: number
}

interface PaymentResult {
  success: boolean
  redirectUrl?: string
  message?: string
  transactionId?: string
}

interface PostsStatusResult {
  remainingFreePosts: number
  remainingPaidPosts: number
  totalPaidPosts: number
  usedPaidPosts: number
  totalFreePosts: number
}

// This function checks how many posts the user has remaining (both free and paid)
export async function checkPostsStatus(): Promise<PostsStatusResult> {
  // In a real application, you would:
  // 1. Get the current user ID from the session
  // 2. Query your database to check how many posts they've used and purchased

  // For demonstration purposes, we'll use cookies to simulate this
  const cookieStore = cookies()

  // Free posts tracking
  const usedFreePostsStr = (await cookieStore).get("used_free_posts")?.value||"0"
  const usedFreePosts = Number.parseInt(usedFreePostsStr, 10)
  const totalFreePosts = 3
  const remainingFreePosts = Math.max(0, totalFreePosts - usedFreePosts)

  // Paid posts tracking
  const totalPaidPostsStr = (await cookieStore).get("total_paid_posts")?.value||"0"
  const usedPaidPostsStr = (await cookieStore).get("used_paid_posts")?.value ||"0"

  const totalPaidPosts = Number.parseInt(totalPaidPostsStr, 10)
  const usedPaidPosts = Number.parseInt(usedPaidPostsStr, 10)
  const remainingPaidPosts = Math.max(0, totalPaidPosts - usedPaidPosts)

  return {
    remainingFreePosts,
    remainingPaidPosts,
    totalPaidPosts,
    usedPaidPosts,
    totalFreePosts,
  }
}

// This function would update the post count when a user creates a post
export async function createPost(data: { category: string; subcategory: string; title: string; description: string; condition: "new" | "like-new" | "good" | "fair" | "poor"; location: string; images: string[]; preferredSwaps?: string | undefined }): Promise<PostsStatusResult> {
  const cookieStore = cookies()

  // First check current status
  const status = await checkPostsStatus()

  // If user has paid posts, use those first
  if (status.remainingPaidPosts > 0) {
    const newUsedPaidPosts = status.usedPaidPosts + 1
    ;(await cookieStore).set("used_paid_posts", newUsedPaidPosts.toString(), {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: "/",
    })

    // Return updated status
    return {
      ...status,
      remainingPaidPosts: status.remainingPaidPosts - 1,
      usedPaidPosts: newUsedPaidPosts,
    }
  }
  // Otherwise use free posts if available
  else if (status.remainingFreePosts > 0) {
    const usedFreePostsStr = (await cookieStore).get("used_free_posts")?.value||"0"
    const usedFreePosts = Number.parseInt(usedFreePostsStr, 10)
    const newUsedFreePosts = usedFreePosts + 1

    ;(await cookieStore).set("used_free_posts", newUsedFreePosts.toString(), {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: "/",
    })

    // Return updated status
    return {
      ...status,
      remainingFreePosts: status.remainingFreePosts - 1,
    }
  }

  // If no posts available, return current status
  return status
}



// Add purchased posts to user's account
export async function addPurchasedPosts(numberOfPosts: number): Promise<PostsStatusResult> {
  const cookieStore = cookies()

// Get current total
  const totalPaidPostsStr = (await cookieStore).get("total_paid_posts")?.value||"0"
  const totalPaidPosts = Number.parseInt(totalPaidPostsStr, 10)

  // Add new posts
  const newTotalPaidPosts = totalPaidPosts + numberOfPosts

  // Update cookie
  ;(await
    // Update cookie
    cookieStore).set("total_paid_posts", newTotalPaidPosts.toString(), {
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: "/",
  })

  // Return updated status
  const status = await checkPostsStatus()
  return status
}

// Update the payment processing to handle fixed packages
export async function processPayment(params: PaymentParams): Promise<PaymentResult> {
  try {
    // For fixed packages, we use the total amount directly
    const totalAmount = params.amount

    // Hardcoded Chapa API key for testing
    // In production, you should use environment variables
    const chapaSecretKey = "CHASECK_TEST-VZgrmu0vKJKLqdlI1o98q4RFoR4a4mCr"

    console.log("Using Chapa key:", chapaSecretKey ? "Key is set" : "Key is not set")

    if (!chapaSecretKey) {
      throw new Error("Chapa API key not configured")
    }

    // Generate a unique transaction reference
    const tx_ref = `tx-${Date.now()}-${Math.floor(Math.random() * 1000000)}`

    // Prepare the request to Chapa API
    const response = await fetch("https://api.chapa.co/v1/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${chapaSecretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: totalAmount.toString(), // Chapa expects amount as string
        currency: params.currency,
        tx_ref: tx_ref,
        callback_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/payment/callback`,
        return_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/payment/success`,
        first_name: params.customerName?.split(" ")[0] || "Customer",
        last_name: params.customerName?.split(" ").slice(1).join(" ") || "",
        email: params.customerEmail || "customer@example.com",
        title: `Payment for ${params.planName} Plan (${params.numberOfPosts} Posts)`,
        description: `Purchase of ${params.planName} Plan with ${params.numberOfPosts} posts for ${totalAmount} ETB`,
        // Add phone number field if available
        phone_number: "0900000000", // Default phone number (you can make this dynamic if needed)
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Chapa API error:", errorData)
      throw new Error(errorData.message || "Failed to initialize payment")
    }

    const data = await response.json()

    // Return the checkout URL from Chapa
    return {
      success: true,
      redirectUrl: data.data.checkout_url,
      transactionId: tx_ref,
    }
  } catch (error) {
    console.error("Payment processing error:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

// For backward compatibility
export async function checkRemainingPosts(): Promise<{ remainingPosts: number; totalUsed: number }> {
  const status = await checkPostsStatus()
  return {
    remainingPosts: status.remainingFreePosts,
    totalUsed: status.totalFreePosts - status.remainingFreePosts,
  }
}

export async function checkUserFreeStatus(): Promise<{ hasUsedFreeTier: boolean }> {
  const status = await checkPostsStatus()
  return { hasUsedFreeTier: status.remainingFreePosts < status.totalFreePosts }
}