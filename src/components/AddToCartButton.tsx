'use client'

interface AddToCartButtonProps {
  productId: string
  productName: string
  inStock: boolean
  className?: string
}

export default function AddToCartButton({ 
  productId, 
  productName, 
  inStock, 
  className = '' 
}: AddToCartButtonProps) {
  const handleAddToCart = () => {
    if (inStock) {
      console.log('Added to cart:', productName)
      // Here you would typically dispatch to a cart context or state management
    }
  }

  return (
    <button 
      onClick={handleAddToCart}
      className={`w-full padding-button-v padding-button-h rounded font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-lg ${
        inStock
          ? 'primary-button focus:ring-2 focus:ring-red-600 focus:ring-offset-2'
          : 'bg-gray-400 text-gray-600 cursor-not-allowed'
      } ${className}`}
      disabled={!inStock}
      aria-label={inStock ? 'Add to cart' : 'Out of stock'}
    >
      <span className="flex items-center justify-center gap-2">
        {inStock ? (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 9H19" />
            </svg>
            Add to Cart
          </>
        ) : (
          'Out of Stock'
        )}
      </span>
    </button>
  )
}
