import { notFound } from 'next/navigation'
import { getProductById, getRelatedProducts } from '@/lib/data'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import AddToCartButton from '@/components/AddToCartButton'
import ProductCard from '@/components/ProductCard'
import BackToTop from '@/components/BackToTop'

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id)
  const relatedProducts = getRelatedProducts(params.id, 4)
  
  if (!product) {
    notFound()
  }
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header - Design Guidelines */}
      <header className="header-bg border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="header-logo hover:text-red-600 transition-colors">
                Exclusive
              </Link>
            </div>
            
            {/* Centered Search Input */}
            <div className="flex-1 flex justify-center mx-8">
              <div className="relative w-80">
                <input
                  type="search"
                  placeholder="What are you looking for?"
                  className="search-input w-full text-sm"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Right Side - Action Icons */}
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 9H19" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
                  2
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Breadcrumb - Design Guidelines */}
      <nav className="breadcrumb-bg border-b border-gray-300">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-12">
            <Link href="/" className="breadcrumb-text hover:text-red-600">
              Home
            </Link>
            <span className="mx-2 breadcrumb-text">/</span>
            <Link href="/" className="breadcrumb-text hover:text-red-600">
              Products
            </Link>
            <span className="mx-2 breadcrumb-text">/</span>
            <span className="breadcrumb-current font-medium">{product.name}</span>
          </div>
        </div>
      </nav>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Product Detail Layout - Three Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Product Thumbnails */}
          <div className="lg:col-span-1">
            <div className="product-thumbnails">
              {/* Main product thumbnail (active) */}
              <div className="product-thumbnail active">
                <Image
                  src={product.image}
                  alt={`${product.name} thumbnail 1`}
                  fill
                  className="object-contain"
                />
              </div>
              {/* Additional thumbnails */}
              {[...Array(3)].map((_, i) => (
                <div key={i} className="product-thumbnail">
                  <Image
                    src={product.image}
                    alt={`${product.name} thumbnail ${i + 2}`}
                    fill
                    className="object-contain opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Center Column - Main Product Image */}
          <div className="lg:col-span-6">
            <div className="product-container aspect-square relative">
              <Image
                src={product.image}
                alt={`${product.name} main image`}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="lg:col-span-5 space-y-4">
            {/* Product Title */}
            <div>
              <h1 className="text-2xl font-semibold mb-2 text-black">
                {product.name}
              </h1>
              
              {/* Rating and Reviews */}
              <div className="flex items-center space-x-3 mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span 
                      key={i} 
                      className={`text-sm ${
                        i < Math.floor(product.rating.average) ? 'star-rating-active' : 'star-rating-inactive'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm secondary-text">
                  ({product.rating.count} Reviews)
                </span>
                <span className="text-sm text-green-600">
                  | In Stock
                </span>
              </div>
              
              {/* Price */}
              <div className="mb-4">
                <span className="text-2xl font-semibold text-black">
                  {formatPrice(product.price)}
                </span>
              </div>
              
              {/* Description */}
              <p className="text-sm secondary-text leading-relaxed mb-4">
                {product.description}
              </p>
              
              {/* Divider */}
              <hr className="border-gray-300 my-4" />
            </div>

            {/* Colors Section */}
            <div>
              <div className="flex items-center space-x-4 mb-3">
                <span className="text-sm font-medium text-black">Colours:</span>
                <div className="flex items-center space-x-2">
                  <button className="w-5 h-5 rounded-full bg-gray-800 border-2 border-transparent ring-2 ring-red-600 ring-offset-1"></button>
                  <button className="w-5 h-5 rounded-full bg-red-600 border-2 border-transparent hover:ring-2 hover:ring-red-600 hover:ring-offset-1 transition-all"></button>
                </div>
              </div>
            </div>

            {/* Size Section */}
            <div>
              <div className="flex items-center space-x-4 mb-3">
                <span className="text-sm font-medium text-black">Size:</span>
                <div className="flex items-center space-x-2">
                  {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                    <button
                      key={size}
                      className={`px-3 py-1 border text-xs font-medium transition-colors ${
                        size === 'M' 
                          ? 'border-red-600 bg-red-600 text-white' 
                          : 'border-gray-300 text-black hover:border-red-600'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center space-x-3 mt-6">
              <div className="flex items-center border border-gray-300">
                <button className="px-3 py-2 text-lg font-medium hover:bg-gray-100 transition-colors">-</button>
                <span className="px-4 py-2 border-x border-gray-300 text-sm font-medium min-w-[50px] text-center">2</span>
                <button className="px-3 py-2 text-lg font-medium text-red-600 hover:bg-gray-100 transition-colors">+</button>
              </div>
              
              <AddToCartButton
                productId={product.id}
                productName={product.name}
                inStock={product.inStock}
                className="flex-1"
              />
              
              <button className="p-2 border border-gray-300 hover:border-red-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            {/* Delivery Information */}
            <div className="border border-gray-300 rounded mt-6">
              <div className="flex items-center p-3 border-b border-gray-300">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-black">Free Delivery</h4>
                  <p className="text-xs secondary-text">Enter your postal code for Delivery Availability</p>
                </div>
              </div>
              <div className="flex items-center p-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-black">Return Delivery</h4>
                  <p className="text-xs secondary-text">Free 30 Days Delivery Returns. Details</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center mb-8">
              <div className="w-5 h-10 bg-red-600 rounded-sm mr-4"></div>
              <h2 className="text-h2 text-black font-semibold">
                Related Item
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="group">
                  <div className="product-image-container aspect-square mb-4 group-hover:shadow-lg transition-shadow">
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      fill
                      className="object-contain p-4"
                    />
                    <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                    <button className="absolute top-12 right-3 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </div>
                  <div className="space-y-2">
                    <h3 className="product-title line-clamp-2">{relatedProduct.name}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="product-price">{formatPrice(relatedProduct.price)}</span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <span 
                            key={i} 
                            className={`text-sm ${
                              i < Math.floor(relatedProduct.rating.average) ? 'star-rating-active' : 'star-rating-inactive'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                        <span className="text-body-small secondary-text ml-1">
                          ({relatedProduct.rating.count})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Back to Top Button */}
      <BackToTop />
    </div>
  )
}
