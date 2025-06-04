import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface GlobalState {
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  price: number
  setPrice: (price: number) => void
  isAcceptingWater: boolean
  setIsAcceptingWater: (isAcceptingWater: boolean) => void
}

const initialState = {
  isLoading: true,
  price: 0,
  isAcceptingWater: false,
}

export const useGlobalStore = create<GlobalState>()(
  persist(
    (set) => ({
      ...initialState,

      // User actions
      setPrice: (price) =>
        set(() => ({
          price,
        })),
      setIsAcceptingWater: (isAcceptingWater) =>
        set(() => ({
          isAcceptingWater,
        })),

      // Loading actions
      setIsLoading: (isLoading) =>
        set(() => ({
          isLoading,
        })),
    }),
    {
      name: 'tumbuh-global-store',
    }
  )
)
