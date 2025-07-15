import { User } from '@/types/note'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type AuthStoreType = {
  isAuthenticated: boolean
  user: User | null
  setUser: (user: User) => void
  clearAuth: () => void
}

export const useAuth = create<AuthStoreType>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      setUser: (user: User) => set({ user, isAuthenticated: true }),
      clearAuth: () =>
        set({
          isAuthenticated: false,
          user: null,
        }),
    }),
    {
      name: 'auth-storage', // назва ключа в localStorage
    }
  )
)