// store/cartStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'


export const useCartStore = create()(
  persist((set, get) => ({
      // 📦 State
      items: [],

      // 🛒 افزودن به سبد
      addToCart: (product) =>
        set((state) => {
          const existing = state.items.find((item) => item.id === product.id)
          if (existing) {
            // اگر محصول قبلاً هست، تعداد رو زیاد کن
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            }
          }
          // اگر محصول جدید هست، اضافه کن
          return {
            items: [...state.items, { ...product, quantity: 1 }],
          }
        }),

      // 🗑️ حذف از سبد
      removeFromCart: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      // ✏️ تغییر تعداد
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          ),
        })),

      // 🧹 خالی کردن سبد
      clearCart: () => set({ items: [] }),

      // 📊 تعداد کل آیتم‌ها
      totalItems: () => {
        const state = get()
        return state.items.reduce((total, item) => total + item.quantity, 0)
      },

      // 💰 قیمت کل
      totalPrice: () => {
        const state = get()
        return state.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )
      },

      // 🔍 بررسی وجود محصول در سبد
      isInCart: (id) => {
        const state = get()
        return state.items.some((item) => item.id === id)
      },
    }),
    {
      name: 'cart-storage', // ذخیره در localStorage
    }
  )
)