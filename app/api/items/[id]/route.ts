import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    // Here you would fetch the item data from your database
    // For demo purposes, we'll return mock data
    const item = {
      id: params.id,
      title: "Comfortable Leather Sofa",
      price: "10,500 ETB",
      location: "Addis Ababa",
      condition: "Used",
      description: "Lorem ipsum dolor sit amet...",
      images: ["/placeholder.svg"],
      owner: {
        name: "John Doe",
        image: "/placeholder.svg",
        verified: true,
        rating: 4.8,
      },
      relatedItems: [
        // Related items data
      ],
    }

    return NextResponse.json(item)
  } catch (error) {
    console.error("Error fetching item:", error)
    return NextResponse.json({ error: "Failed to fetch item details" }, { status: 500 })
  }
}

