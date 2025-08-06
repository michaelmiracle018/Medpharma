import React from 'react'
import {TouchableOpacity, TouchableOpacityProps} from 'react-native'
interface CustomTouchableOpacityProps extends TouchableOpacityProps {
  children?: React.ReactNode
}

const CustomTouchableOpacity: React.FC<CustomTouchableOpacityProps> = (
  props,
  ref,
) => {
  const {children, ...rest} = props

  return (
    <TouchableOpacity ref={ref} {...rest}>
      {children}
    </TouchableOpacity>
  )
}

export default CustomTouchableOpacity
