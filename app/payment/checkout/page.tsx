"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { processPayment } from "@/lib/actions"
import { toast } from "sonner"

interface Plan {
  id: string
  name: string
  price: number
  description: string
  features: string[]
  posts: number
  isPopular?: boolean
}

export default function CheckoutPage() {
  const [plan, setPlan] = useState<Plan | null>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Get plan data from session storage
    const planData = sessionStorage.getItem("selectedPlan")
    if (planData) {
      setPlan(JSON.parse(planData))
    } else {
      // If no plan data, redirect back to plan selection
      router.push("/")
    }
  }, [router])

  const handlePayment = async () => {
    if (!plan) {
      toast.error("Plan information not found. Please select a plan again.")
      router.push("/")
      return
    }

    // Validate form
    if (!name.trim()) {
      toast.error("Please provide your name to continue.")
      return
    }

    if (!email.trim()) {
      toast.error("Please provide your email to continue.")
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast.error("Please provide a valid email address.")
      return
    }

    setIsProcessing(true)
    try {
      // Store customer info for receipt before payment processing
      sessionStorage.setItem(
        "customerInfo",
        JSON.stringify({
          name,
          email,
          phone,
          plan: plan.name,
          price: plan.price,
          postsCount: plan.posts,
          date: new Date().toISOString(),
          transactionId: "pending", // Will be updated after payment
        }),
      )

      const result = await processPayment({
        amount: plan.price,
        planName: plan.name,
        currency: "ETB",
        customerName: name,
        customerEmail: email,
        numberOfPosts: plan.posts,
      })

      if (result.success) {
        // Update transaction ID in session storage
        const customerInfo = JSON.parse(sessionStorage.getItem("customerInfo") || "{}")
        customerInfo.transactionId = result.transactionId || "TX-" + Date.now()
        sessionStorage.setItem("customerInfo", JSON.stringify(customerInfo))

        // Redirect to Chapa payment page
        window.location.href = result.redirectUrl || "/payment/success"
      } else {
        toast.error(result.message || "There was an error processing your payment. Please try again.")
      }
    } catch (error) {
      console.error("Payment error:", error)
      toast.error("There was an error processing your payment. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-md mx-auto">
        <Button
          variant="ghost"
          className="mb-6 text-teal-500 hover:text-teal-600 hover:bg-teal-50 -ml-2"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Plans
        </Button>
<Card>
          <CardHeader>
            <CardTitle>Complete Your Purchase</CardTitle>
            <CardDescription>Enter your details to continue with the {plan.name} plan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="09XXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="pt-2">
                <div className="flex justify-between font-medium">
                  <span>Plan:</span>
                  <span>{plan.name}</span>
                </div>
                <div className="flex justify-between font-medium mt-1">
                  <span>Number of posts:</span>
                  <span>{plan.posts}</span>
                </div>
                <div className="flex justify-between font-bold text-teal-600 pt-2 border-t mt-2">
                  <span>Total:</span>
                  <span>{plan.price} ETB</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-teal-500 hover:bg-teal-600" onClick={handlePayment} disabled={isProcessing}>
              {isProcessing ? "Processing..." : "Pay Now"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}