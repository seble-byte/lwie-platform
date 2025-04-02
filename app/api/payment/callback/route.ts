import { type NextRequest, NextResponse } from "next/server"
import { addPurchasedPosts } from "@/lib/actions"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    console.log("Chapa callback received:", data)

    // Verify the payment with Chapa
    const chapaSecretKey = "CHASECK_TEST-VZgrmu0vKJKLqdlI1o98q4RFoR4a4mCr"

    if (!chapaSecretKey) {
      throw new Error("Chapa API key not configured")
    }

    // Extract the transaction reference from the callback data
    const { tx_ref } = data

    if (!tx_ref) {
      throw new Error("Transaction reference not found")
    }

    // Verify the transaction with Chapa
    const verifyResponse = await fetch(`https://api.chapa.co/v1/transaction/verify/${tx_ref}`, {
      headers: {
        Authorization: `Bearer ${chapaSecretKey}`,
      },
    })

    if (!verifyResponse.ok) {
      console.error("Chapa verification failed:", await verifyResponse.text())
      throw new Error("Failed to verify transaction")
    }

    const verifyData = await verifyResponse.json()
    console.log("Chapa verification response:", verifyData)

    // Check if the payment was successful
    if (verifyData.status === "success") {
      // Get the number of posts from the transaction metadata
      // In a real application, you would store this in your database
      // For now, we'll extract it from the title or use a default
      let numberOfPosts = 5 // Default to basic package

      const title = verifyData.data?.title || ""
      const postMatch = title.match(/$$(\d+) Posts$$/)

      if (postMatch && postMatch[1]) {
        numberOfPosts = Number.parseInt(postMatch[1], 10)
      }

      // Add the purchased posts to the user's account
      await addPurchasedPosts(numberOfPosts)

      return NextResponse.json({ success: true })
    } else {
      throw new Error("Payment verification failed")
    }
  } catch (error) {
    console.error("Payment callback error:", error)
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "An unknown error occurred" },
      { status: 400 },
    )
  }
}