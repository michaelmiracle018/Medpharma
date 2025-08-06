import {useEffect, useState} from 'react'
import * as Device from 'expo-device'
import * as Application from 'expo-application'
import {Platform} from 'react-native'

export interface DeviceDetails {
  deviceOS: string
  deviceName: string | null
  deviceId: string | null
}

export function useDeviceDetails(): DeviceDetails {
  const [details, setDetails] = useState<DeviceDetails>({
    deviceOS: Platform.OS,
    deviceName: null,
    deviceId: null,
  })

  useEffect(() => {
    async function fetchDeviceDetails() {
      const deviceName = Device.deviceName
      const deviceId =
        Platform.OS === 'ios'
          ? await Application.getIosIdForVendorAsync()
          : Application.getAndroidId() || null

      setDetails({
        deviceOS: Platform.OS,
        deviceName,
        deviceId,
      })
    }

    fetchDeviceDetails()
  }, [])

  return details
}
