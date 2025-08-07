import AsyncStorage from '@react-native-async-storage/async-storage'
import {create} from 'zustand'
import {removeDataFromStorage, storeDataInStorage} from '~/utils/storageData'

const ACCESS_TOKEN = 'thisisjustarandomstring'

interface AuthUser {
  accountNo: string
  email: string
  role: string[]
  exp: number
}

interface AuthState {
  auth: {
    user: AuthUser | null
    setUser: (user: AuthUser | null) => void
    accessToken: string
    setAccessToken: (accessToken: string) => void
    resetAccessToken: () => void
    reset: () => void
  }
}

export const useAuthStore = create<AuthState>(set => {
  return {
    auth: {
      user: null,
      accessToken: '',
      setUser: user => set(state => ({...state, auth: {...state.auth, user}})),
      setAccessToken: async accessToken => {
        await storeDataInStorage(ACCESS_TOKEN, accessToken)
        set(state => ({...state, auth: {...state.auth, accessToken}}))
      },
      resetAccessToken: async () => {
        await removeDataFromStorage(ACCESS_TOKEN)
        set(state => ({...state, auth: {...state.auth, accessToken: ''}}))
      },
      reset: async () => {
        await removeDataFromStorage(ACCESS_TOKEN)
        set(state => ({
          ...state,
          auth: {...state.auth, user: null, accessToken: ''},
        }))
      },
    },
  }
})
