import axios from 'axios'
import {
  logUserOut,
  toggleUserVerificationAndSessionModal,
} from '~/reduxStore/features/authSlice'
import {store} from '~/reduxStore/store'
import {displayErrorMessage} from '~/utils/displayErrorMessage'
import {clearAllDataFromStorage} from '~/utils/storageData'
import * as Application from 'expo-application'
import {Platform} from 'react-native'

let failedQueue = []
let isRefreshing = false

export function createAxiosClient({
  options,
  getCurrentAccessToken,
  getCurrentRefreshToken,
  refreshTokenUrl,
  setRefreshedTokens,
}: any) {
  const client = axios.create(options)
  client.interceptors.request.use(
    async config => {
      const token = await getCurrentAccessToken()
      const deviceId =
        Platform.OS === 'ios'
          ? await Application.getIosIdForVendorAsync()
          : Application.getAndroidId() || null

      if (token) {
        config.headers.Authorization = 'Bearer ' + token
      }

      config.headers.deviceId = deviceId

      return config
    },
    error => {
      return Promise.reject(error)
    },
  )

  client.interceptors.response.use(
    response => {
      //* Any status code that lie within the range of 2xx cause this function to trigger
      //* Do something with response data
      return response
    },
    async error => {
      if (error?.response?.data?.name === 'UnauthorizedException') {
        await clearAllDataFromStorage()
        store.dispatch(logUserOut())
      }
      // YOU CAN ADD KYC CHECK HERE
      // if (error?.response?.data?.errorType === 'kyc_required') {
      //   store.dispatch(
      //     toggleUserVerificationAndSessionModal({
      //       userKycVerified: true,
      //       showKYCModal: true,
      //       showMainModal: true,
      //     }),
      //   )
      // }
      const refreshToken = await getCurrentRefreshToken()

      const originalRequest = error.config
      //* In "axios": "^1.1.3" there is an issue with headers, and this is the workaround.
      originalRequest.headers = JSON.parse(
        JSON.stringify(originalRequest.headers || {}),
      )
      if (error?.response?.data?.name === 'UnauthorizedException') {
        await clearAllDataFromStorage()
        store.dispatch(logUserOut())
      }

      if (error && error?.response?.data?.name !== 'TokenExpiredError') {
        displayErrorMessage(error)
        return Promise.reject(error)
      }

      const handleError = async (res: any) => {
        if (res?.data?.response?.errorType === 'jwt_expired') {
          store.dispatch(
            toggleUserVerificationAndSessionModal({
              sessionExpired: true,
              showSessionModal: true,
              showMainModal: true,
            }),
          )
        }
        return Promise.reject(error)
      }

      //* Refresh token conditions

      if (
        refreshToken &&
        error?.response?.data?.name === 'TokenExpiredError' &&
        originalRequest?.url !== refreshTokenUrl &&
        originalRequest?._retry !== true
      ) {
        if (isRefreshing) {
          return new Promise(function (resolve, reject) {
            failedQueue.push({resolve, reject})
          })
            .then(() => {
              return client(originalRequest)
            })
            .catch(err => {
              return Promise.reject(err)
            })
        }

        isRefreshing = true
        originalRequest._retry = true

        return client
          .get(refreshTokenUrl, {
            headers: {'Refresh-Token': refreshToken},
          })
          .then(res => {
            const {data} = res

            const tokens = {
              accessToken: data?.result?.accessToken,
              refreshToken: data?.result?.refreshToken,
            }

            setRefreshedTokens(tokens)

            return client(originalRequest)
          }, handleError)
          .catch(async err => {
            if (err?.response?.data?.name === 'TokenExpiredError') {
              await clearAllDataFromStorage()
              store.dispatch(logUserOut())
              displayErrorMessage(err)
            }

            return Promise.reject(error)
          })
          .finally(() => {
            isRefreshing = false
          })
      }

      //* Any status codes that falls outside the range of 2xx cause this function to trigger
      //* Do something with response error

      return Promise.reject(error)
    },
  )

  return client
}
