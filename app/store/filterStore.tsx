// store/filterStore.ts
import { create } from 'zustand'


export const useFilterStore = create((set) => ({
  filter: 'ALL',
  searchTerm: '',  // ✅ مقدار اولیه
  setFilter: (filter) => set({ filter }),
  setSearchTerm: (searchTerm) => set({ searchTerm }),  // ✅ تابع جستجو
}))