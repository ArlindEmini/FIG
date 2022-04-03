import AsyncStorage from '@react-native-async-storage/async-storage'
import create from 'zustand'
import { devtools, persist } from "zustand/middleware"

let store = (set => ({
  bears: 0,
  message: "Message",
  increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 })
}))

store = devtools(store)

export const useStore = create(store)

export const usePersistedStore = create(persist(
  (set) => ({
    auth_token: "",
    setAuthToken: (token) => set(({ auth_token: token })),
  }),
  {
    name: "fig-storage", // unique name
    getStorage: () => AsyncStorage, // Add this here!
  }))

