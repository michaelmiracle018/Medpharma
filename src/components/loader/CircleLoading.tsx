import {
  View,
  ActivityIndicator,
  ActivityIndicatorProps,
  ColorValue,
} from 'react-native'

interface Props {
  color?: ColorValue | undefined
}

export const CircleLoading: React.FC<ActivityIndicatorProps> = ({
  color,
}: Props) => {
  return (
    <View>
      <ActivityIndicator size={30} color={color} />
    </View>
  )
}
