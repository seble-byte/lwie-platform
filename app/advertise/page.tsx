import type { Metadata } from "next"
import AdvertisementForm from "@/components/advertisement-form"

export const metadata: Metadata = {
  title: "Advertise With Us",
  description: "Promote your company's products on our e-commerce platform",
}

export default function AdvertisePage() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
       
        <AdvertisementForm />
      </div>
    </div>
  )
}

