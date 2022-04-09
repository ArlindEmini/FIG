import AsyncStorage from '@react-native-async-storage/async-storage'
import create from 'zustand'
import { devtools, persist } from "zustand/middleware"

let client = (set => ({
  priveLoading: false,
  enterpriseLoading: false,
  priveClients: [],
  enterpriseClients: [{
    id: 1,
    name: "TestClient"
  }],
  togglePriveLoading: () => set(state => ({ priveLoading: !state.priveLoading })),
  toggleEnterpriseLoading: () => set(state => ({ enterpriseLoading: !state.enterpriseLoading })),
  setClients: (clientsList, type = "prive") => set({ [`${type}Clients`]: clientsList }),
  addClient: (newClient, type) => set(state => set({[`${type}Clients`]: [...state[`${type}Clients`], newClient]}))
}));

export const clientStore = create(devtools(client));
clientStore.subscribe(console.log);

export const usePersistedStore = create(devtools(persist(
  (set) => ({
    auth_token: "",
    setAuthToken: (token) => set(({ auth_token: token })),
  }),
  {
    name: "fig-storage", // unique name
    getStorage: () => AsyncStorage, // Add this here!
  })))

