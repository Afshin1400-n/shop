// store/cartStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Product {
  id: number
  name: string
  price: number
  description: string
  category: string
  rating: number
  stock: number
}

interface CartItem extends Product {
  quantity: number
}

interface CartStore {
  items: CartItem[]
  userId: string | null

  setUserId: (userId: string) => void
  loadCart: (userId: string) => void
  addToCart: (product: Product) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  totalItems: () => number
  totalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  (set, get) => ({
    items: [],
    userId: null,

    setUserId: (userId) => {
      set({ userId })
      // Load user's cart
      const saved = localStorage.getItem(`cart_${userId}`)
      if (saved) {
        try {
          set({ items: JSON.parse(saved) })
        } catch {
          set({ items: [] })
        }
      } else {
        set({ items: [] })
      }
    },

    loadCart: (userId) => {
      const saved = localStorage.getItem(`cart_${userId}`)
      if (saved) {
        try {
          set({ items: JSON.parse(saved) })
        } catch {
          set({ items: [] })
        }
      } else {
        set({ items: [] })
      }
    },

    addToCart: (product) =>
      set((state) => {
        const existing = state.items.find((item) => item.id === product.id)
        let newItems
        if (existing) {
          newItems = state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        } else {
          newItems = [...state.items, { ...product, quantity: 1 }]
        }
        // Save to localStorage with user-specific key
        if (state.userId) {
          localStorage.setItem(`cart_${state.userId}`, JSON.stringify(newItems))
        }
        return { items: newItems }
      }),

    removeFromCart: (id) =>
      set((state) => {
        const newItems = state.items.filter((item) => item.id !== id)
        if (state.userId) {
          localStorage.setItem(`cart_${state.userId}`, JSON.stringify(newItems))
        }
        return { items: newItems }
      }),

    updateQuantity: (id, quantity) =>
      set((state) => {
        const newItems = state.items.map((item) =>
          item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
        )
        if (state.userId) {
          localStorage.setItem(`cart_${state.userId}`, JSON.stringify(newItems))
        }
        return { items: newItems }
      }),

    clearCart: () =>
      set((state) => {
        if (state.userId) {
          localStorage.removeItem(`cart_${state.userId}`)
        }
        return { items: [] }
      }),

    totalItems: () => {
      const state = get()
      return state.items.reduce((total, item) => total + item.quantity, 0)
    },

    totalPrice: () => {
      const state = get()
      return state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      )
    },
  })
)