// store/userStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'


export const useUserStore = create()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      login: (user) => set({ user, isLoggedIn: true }),
      logout: () => set({ user: null, isLoggedIn: false }),  // ✅ باید باشه
      setUser: (user) => set({ user, isLoggedIn: !!user }),
    }),
    {
      name: 'user-storage',
    }
  )
)