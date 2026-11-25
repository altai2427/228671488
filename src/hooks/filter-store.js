import {create} from 'zustand'

export const useFilterStore = create((set) => ({
  filter: {
    category: null,
    searchQuery: '',
  },

  setCategory: (category) => set((state) => ({
    filter: { ...state.filter, category }
  })),

  setSearchQuery: (searchQuery) => set((state) => ({
    filter: { ...state.filter, searchQuery }
  })),
}));
