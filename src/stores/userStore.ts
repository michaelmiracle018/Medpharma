import {create} from 'zustand'
import {persist, PersistStorage} from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {decryptData, encryptData} from '~/utils/encryptions'
import {ZUSTAND_USER_DATA_STORAGE_KEY} from '~/api/common/secretKeys'
import {
  getDataFromStorage,
  removeDataFromStorage,
  storeDataInStorage,
} from '~/utils/storageData'

interface UserState {
  userData: any | null
  setUserData: (user: any | null) => void
}

const storage: PersistStorage<Pick<UserState, 'userData'>> = {
  getItem: async name => {
    const data = await getDataFromStorage(name)
    return data
  },
  setItem: async (name, value) => {
    storeDataInStorage(name, value)
  },
  removeItem: async name => {
    await removeDataFromStorage(name)
  },
}

export const useUserStore = create<UserState>()(
  persist(
    set => ({
      userData: null,
      setUserData: user => set({userData: user}),
    }),
    {
      name: ZUSTAND_USER_DATA_STORAGE_KEY,
      storage,
      partialize: state => ({userData: state.userData}),
    },
  ),
)

// Usage hooks
export const useUserData = () => useUserStore(state => state.userData)
export const useSetUserData = () => useUserStore(state => state.setUserData)
