import React from 'react'
import {
  TouchableOpacity,
  TouchableOpacityProps,
  GestureResponderEvent,
  Text,
} from 'react-native'

type CustomTouchableProps = {
  label?: string
  onCustomPress?: (event: GestureResponderEvent) => void
} & TouchableOpacityProps

const CustomTouchable: React.FC<CustomTouchableProps> = ({
  label,
  onCustomPress,
  onPress,
  children,
  ...rest
}) => {
  const handlePress = (e: GestureResponderEvent) => {
    if (onCustomPress) {
      onCustomPress(e)
    } else if (onPress) {
      onPress?.(e)
    }
  }

  return (
    <TouchableOpacity onPress={handlePress} {...rest}>
      {children ?? (label ? <Text>{label}</Text> : null)}
    </TouchableOpacity>
  )
}

export default CustomTouchable
