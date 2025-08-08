import type {NativeStackNavigationProp} from '@react-navigation/native-stack'

import {QueryObserverResult, RefetchOptions} from '@tanstack/react-query'

export type {NativeStackScreenProps} from '@react-navigation/native-stack'

export type CommonNavigatorParams = {
  BookAppointment: {id: string}
}

export type BottomTabNavigatorParams = CommonNavigatorParams & {}

export type MainNavigatorParams = {
  SpecificDoctor: undefined
  Doctors: undefined
  BookAppointment: {id: string}
}

type DeviceInfoProps = {
  deviceOS: string
  deviceName: string | null
  deviceId: string | null
}

export type AuthNavigatorParams = {
  LoginScreen: undefined
  SignUpScreen: undefined
  ForgetPassword: undefined
}

export type NavigationAuthProp = NativeStackNavigationProp<AuthNavigatorParams>

export type NavigationMainProp = NativeStackNavigationProp<MainNavigatorParams>
