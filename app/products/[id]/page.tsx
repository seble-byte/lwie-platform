import ProductDetail from "@/components/products-detail"

export default function ProductPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the product data based on the ID
  return (
    <main className="container mx-auto px-4 py-8">
       <ProductDetail productId={params.id} />
    </main>
  )
}
