import { User } from '@/types/note'
import { create } from 'zustand'

export type AuthStoreType = {
  isAuthenticated: boolean
  user: User | null
  setUser: (user: User) => void
  clearAuth: () => void
}

export const useAuth = create<AuthStoreType>()((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user: User) => set({ user, isAuthenticated: true }),
  clearAuth: () =>
    set({
      isAuthenticated: false,
      user: null,
    }),
}))