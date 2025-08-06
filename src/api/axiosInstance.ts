import {
  getCurrentAccessToken,
  logout,
  getCurrentRefreshToken,
  setRefreshedTokens,
  REFRESH_TOKEN_URL,
  BASE_URL,
} from '~/api/apiStorage'
import {createAxiosClient} from './axiosClient'

// * CALL CREATE AXIOS CLIENT TO MAKE REQUEST
export const axiosInstance = createAxiosClient({
  options: {
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  },
  getCurrentAccessToken,
  getCurrentRefreshToken,
  refreshTokenUrl: REFRESH_TOKEN_URL,
  logout,
  setRefreshedTokens,
})
