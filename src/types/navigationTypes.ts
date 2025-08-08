import type {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {IAllAppointment} from '~/types/index'

export type {NativeStackScreenProps} from '@react-navigation/native-stack'

export type CommonNavigatorParams = {
  BookAppointment: {id: string}
  AllAppointment: {id: string}
  SpecificDoctor: {item: IAllAppointment}
}

export type BottomTabNavigatorParams = CommonNavigatorParams & {}

export type MainNavigatorParams = {
  SpecificDoctor: {item: IAllAppointment}
  Doctors: undefined
  BookAppointment: {id: string}
  AllAppointment: {id: string}
}

export type AuthNavigatorParams = {
  LoginScreen: undefined
  SignUpScreen: undefined
  ForgetPassword: undefined
}

export type NavigationAuthProp = NativeStackNavigationProp<AuthNavigatorParams>

export type NavigationMainProp = NativeStackNavigationProp<MainNavigatorParams>
