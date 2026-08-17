// store/cartStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'


export const useCartStore = create()(
  (set, get) => ({
    items: [],
    userId: null,

    setUserId: (userId) => {
      set({ userId })
      // بارگذاری سبد خرید کاربر
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
        // ذخیره در localStorage با کلید کاربر
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