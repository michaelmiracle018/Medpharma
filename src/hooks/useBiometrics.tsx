/* eslint-disable @typescript-eslint/no-unused-vars */
import * as LocalAuthentication from 'expo-local-authentication'
import {useLingui} from '@lingui/react'
import {t} from '@lingui/core/macro'
import {isIOS} from '~/lib/platform/detection'
import {toast} from 'sonner-native'

export const useBiometrics = () => {
  const {i18n} = useLingui()

  // const [availableBiometrics, setAvailableBiometrics] = useState(false)

  const enableBiometricAuth = async (): Promise<boolean> => {
    toast.dismiss()
    try {
      const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync()
      if (!isBiometricAvailable) {
        toast.warning(
          t(i18n)`Your device does not support biometric authentication.`,
        )
        return false
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: t(i18n)`Verify your biometrics`,
        cancelLabel: 'Cancel',
        disableDeviceFallback: isIOS ? false : true,
        biometricsSecurityLevel: 'strong',
      })

      if (result.success) {
        return true
      } else {
        toast.dismiss()
        toast.error(t(i18n)`Authentication cancelled.`)

        return false
      }
    } catch (error) {
      toast.error(
        t(i18n)`An error occurred while enabling biometric authentication.`,
      )
      return false
    }
  }

  return {
    enableBiometricAuth,
  }
}
