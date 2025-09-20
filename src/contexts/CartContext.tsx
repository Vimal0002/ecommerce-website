'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from './AuthContext'

interface Product {
  id: string
  name: string
  description?: string
  price: number
  image?: string
  categoryId: string
  category: {
    id: string
    name: string
  }
}

interface CartItem {
  id: string
  quantity: number
  userId: string
  productId: string
  product: Product
  createdAt: string
  updatedAt: string
}

interface CartContextType {
  cartItems: CartItem[]
  total: number
  loading: boolean
  addToCart: (productId: string, quantity?: number) => Promise<void>
  updateCartItem: (cartItemId: string, quantity: number) => Promise<void>
  removeFromCart: (cartItemId: string) => Promise<void>
  refreshCart: () => Promise<void>
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  const refreshCart = async () => {
    if (!user) {
      setCartItems([])
      setTotal(0)
      return
    }

    try {
      setLoading(true)
      const response = await axios.get('/api/cart')
      setCartItems(response.data.cartItems)
      setTotal(response.data.total)
    } catch (error) {
      console.error('Error fetching cart:', error)
      setCartItems([])
      setTotal(0)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshCart()
  }, [user])

  const addToCart = async (productId: string, quantity: number = 1) => {
    if (!user) {
      toast.error('Please login to add items to cart')
      return
    }

    try {
      await axios.post('/api/cart', { productId, quantity })
      await refreshCart()
      toast.success('Item added to cart!')
    } catch (error: any) {
      const message = error.response?.data?.error || 'Failed to add item to cart'
      toast.error(message)
      throw error
    }
  }

  const updateCartItem = async (cartItemId: string, quantity: number) => {
    try {
      await axios.put(`/api/cart/${cartItemId}`, { quantity })
      await refreshCart()
    } catch (error: any) {
      const message = error.response?.data?.error || 'Failed to update cart item'
      toast.error(message)
      throw error
    }
  }

  const removeFromCart = async (cartItemId: string) => {
    try {
      await axios.delete(`/api/cart/${cartItemId}`)
      await refreshCart()
      toast.success('Item removed from cart!')
    } catch (error: any) {
      const message = error.response?.data?.error || 'Failed to remove item from cart'
      toast.error(message)
      throw error
    }
  }

  const clearCart = () => {
    setCartItems([])
    setTotal(0)
  }

  const value = {
    cartItems,
    total,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    refreshCart,
    clearCart
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}