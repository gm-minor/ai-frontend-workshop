'use client'

import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import { Product } from '@/types'

interface AddToCartButtonProps {
  productId: string
  productName: string
  inStock: boolean
  className?: string
  product?: Product // Full product object for better cart integration
  selectedColor?: string
  selectedSize?: string
  quantity?: number
}

export default function AddToCartButton({ 
  productId, 
  productName, 
  inStock, 
  className = '',
  product,
  selectedColor,
  selectedSize,
  quantity = 1
}: AddToCartButtonProps) {
  const { addItem, isInCart } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const [justAdded, setJustAdded] = useState(false)
  
  const itemInCart = isInCart(productId)

  const handleAddToCart = async () => {
    if (!inStock || !product) return

    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API call
      addItem(product, quantity, selectedColor, selectedSize)
      
      setJustAdded(true)
      setTimeout(() => setJustAdded(false), 2000)
    } catch (error) {
      console.error('Error adding to cart:', error)
      // TODO: Show user-friendly error message
    } finally {
      setIsLoading(false)
    }
  }

  const getButtonText = () => {
    if (!inStock) return 'Out of Stock'
    if (isLoading) return 'Adding...'
    if (justAdded) return 'Added to Cart!'
    if (itemInCart) return 'Add More'
    return 'Add to Cart'
  }

  const getButtonIcon = () => {
    if (isLoading) {
      return (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
      )
    }
    
    if (justAdded) {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )
    }
    
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 9H19" />
      </svg>
    )
  }

  return (
    <button 
      onClick={handleAddToCart}
      className={`w-full padding-button-v padding-button-h rounded font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-lg ${
        inStock && !isLoading
          ? justAdded 
            ? 'bg-green-600 text-white focus:ring-2 focus:ring-green-600 focus:ring-offset-2'
            : 'primary-button focus:ring-2 focus:ring-red-600 focus:ring-offset-2'
          : 'bg-gray-400 text-gray-600 cursor-not-allowed'
      } ${className}`}
      disabled={!inStock || isLoading}
      aria-label={inStock ? 'Add to cart' : 'Out of stock'}
    >
      <span className="flex items-center justify-center gap-2">
        {getButtonIcon()}
        {getButtonText()}
      </span>
    </button>
  )
}
