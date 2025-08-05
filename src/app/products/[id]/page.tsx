import { notFound } from 'next/navigation'
import { getProductById, getRelatedProducts } from '@/lib/data'
import { isValidProductId } from '@/lib/utils'
import { generateProductMetadata } from '@/lib/metadata'
import { Metadata } from 'next'
import ClientProductPage from './ClientProductPage'

interface ProductPageProps {
  params: {
    id: string
  }
}

// Generate metadata for SEO (server-side)
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  // Validate product ID
  if (!isValidProductId(params.id)) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.'
    }
  }

  const product = getProductById(params.id)
  
  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.'
    }
  }

  return generateProductMetadata(product)
}

// Server component that handles data fetching and passes to client component
export default function ProductPage({ params }: ProductPageProps) {
  // Validate product ID
  if (!isValidProductId(params.id)) {
    notFound()
  }

  const product = getProductById(params.id)
  const relatedProducts = getRelatedProducts(params.id, 4)
  
  if (!product) {
    notFound()
  }

  // Pass data to client component
  return (
    <ClientProductPage 
      product={product} 
      relatedProducts={relatedProducts} 
    />
  )
}
