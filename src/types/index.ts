import {Entypo} from '@expo/vector-icons'
import {ViewStyle} from 'react-native'
import {ClassNameValue} from 'tailwind-merge'

export type userLoginForm = {
  emailOrPhone: string | any
  password: string
}
export type SignUpFormProps = {
  fullName: string
  email: string
  phoneNumber: string
  country: null | any
  confirmPassword: string
  password: string
}

export type TabNavProps = {
  id: string
  tabName: string
  icon: keyof typeof Entypo.glyphMap
  component: React.ComponentType<any>
}

export interface IBookAppointment {
  email: string
  firstName: string
  lastName: string
  slotId: string | undefined
}
