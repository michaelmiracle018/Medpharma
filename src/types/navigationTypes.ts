import type {NativeStackNavigationProp} from '@react-navigation/native-stack'

import {QueryObserverResult, RefetchOptions} from '@tanstack/react-query'

export type {NativeStackScreenProps} from '@react-navigation/native-stack'

export type CommonNavigatorParams = {}

export type BottomTabNavigatorParams = CommonNavigatorParams & {}

export type MainNavigatorParams = {
  SpecificDoctor: undefined
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
