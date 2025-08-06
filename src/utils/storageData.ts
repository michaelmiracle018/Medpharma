/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import AsyncStorage from '@react-native-async-storage/async-storage'
import CryptoJS from 'react-native-crypto-js'
import {useReducer} from 'react'
import {APP_SECRET_ENCRYPTION} from '~/api/common/secretKeys'

export const storeDataInStorage = async (key: any, value: any) => {
  try {
    if (value == null) {
      removeDataFromStorage(key)
    } else {
      const jsonValue = JSON.stringify(value)
      let ciphertext = CryptoJS.AES.encrypt(
        JSON.stringify(jsonValue),
        `${APP_SECRET_ENCRYPTION}`,
      ).toString()
      await AsyncStorage.setItem(key, ciphertext)
    }
  } catch (error) {
    // throw error;
  }
}

export const getDataFromStorage = async (key: any) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    let bytes = CryptoJS.AES.decrypt(jsonValue!, `${APP_SECRET_ENCRYPTION}`)
    let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    return decryptedData != null ? JSON.parse(decryptedData) : null
  } catch (error) {
    // throw error;
  }
}

export const removeDataFromStorage = async (key: any) => {
  try {
    await AsyncStorage.removeItem(key)
  } catch (error) {
    // throw error;
  }
}

export const clearAllDataFromStorage = async () => {
  try {
    await AsyncStorage.clear()
  } catch (e) {
    throw e
  }
}
