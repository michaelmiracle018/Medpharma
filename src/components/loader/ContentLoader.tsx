import {View, ActivityIndicator, ActivityIndicatorProps} from 'react-native'
import Colors from '~/constants/Colors'

export const ContentLoader: React.FC<ActivityIndicatorProps> = () => {
  return (
    <View>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  )
}
