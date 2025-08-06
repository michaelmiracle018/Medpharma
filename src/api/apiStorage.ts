import {
  getDataFromStorage,
  removeDataFromStorage,
  storeDataInStorage,
} from '~/utils/storageData'
import {STORAGE_KEY} from './common/secretKeys'
import {responseToBooleanForObject} from '~/utils/checkValueForStorage'

export const SECRET_KEY_1 = process.env.EXPO_PUBLIC_APP_SECRET_KEY_1

// * BASE URL
export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.EXPO_PUBLIC_API_PROD_BASE_URL
    : process.env.EXPO_PUBLIC_APP_BASE_URL

export const REFRESH_TOKEN_URL = `${BASE_URL}/auth/refresh`

// * SET AUTHENTICATED TOKENS HERE FOR BOTH REFRESH AND ACCESS TOKEN
export const setAuthTokens = async (tokens: any) => {
  await storeDataInStorage(STORAGE_KEY, tokens)
}

//* SET AUTHENTICATED TOKENS HERE
export const getAuthTokens = async () => {
  const tokens = await getDataFromStorage(STORAGE_KEY)
  return tokens
}
// * GET CURRENT REFRESH TOKEN
export const getCurrentRefreshToken = async () => {
  const tokens = await getAuthTokens()
  if (tokens) return tokens.refreshToken
  return null
}

// * GET CURRENT ACCESS TOKEN

export const getCurrentAccessToken = async () => {
  const tokens = await getAuthTokens()
  return responseToBooleanForObject(tokens) ? tokens.accessToken : null
}

// * SET NEW REFRESH ACCESS TOKEN

export async function setRefreshedTokens(tokens: any) {
  await setAuthTokens(tokens)
}

export const clearAuthTokens = async () =>
  await removeDataFromStorage(STORAGE_KEY)

// * CLEAR TOKENS TO LOGOUT USER
export async function logout() {
  await clearAuthTokens()
}
