import CryptoJS from 'react-native-crypto-js'
import {ENCRYPTION_SECRET_KEY} from '~/api/common/secretKeys'

// Encrypt function
export const encryptData = (data: any) => {
  return CryptoJS.AES.encrypt(data, ENCRYPTION_SECRET_KEY).toString()
}

// Decrypt function
export const decryptData = (data: any) => {
  const bytes = CryptoJS.AES.decrypt(data, ENCRYPTION_SECRET_KEY)
  return bytes.toString(CryptoJS.enc.Utf8)
}
