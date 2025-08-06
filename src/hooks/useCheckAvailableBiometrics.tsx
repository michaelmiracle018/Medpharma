/* eslint-disable @typescript-eslint/no-unused-vars */
import * as LocalAuthentication from 'expo-local-authentication'
import {useLingui} from '@lingui/react'
import {t} from '@lingui/core/macro'
import {toast} from 'sonner-native'

export function useCheckAvailableBiometrics() {
  const {i18n} = useLingui()

  const checkAvailableBiometrics = async () => {
    toast.dismiss()
    try {
      const savedBiometric = await LocalAuthentication.isEnrolledAsync()
      if (!savedBiometric) {
        toast.error(
          t(
            i18n,
          )`No biometric records found. Enable one in your phone settings`,
        )
        return
      }
      return savedBiometric
    } catch (error) {
      toast.error(t(i18n)`An error occurred`)
    }
  }

  return {checkAvailableBiometrics}
}
