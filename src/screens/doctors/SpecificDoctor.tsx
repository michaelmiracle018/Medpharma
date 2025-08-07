import {useNavigation} from '@react-navigation/native'
import {View} from 'react-native'
import BackIcon from '~/components/BackIcon'
import ScreenWrapperWithScrollView from '~/components/ScreenWrapperWithScrollView'
import {Text} from '~/components/ui/text'
import {statusBarHeight} from '~/lib/platform/detection'
import {cn} from '~/lib/utils'
import {NavigationAuthProp} from '~/types/navigationTypes'

export const SpecificDoctor = () => {
  const navigation = useNavigation<NavigationAuthProp>()

  return (
    <View className="flex-1 bg-white" style={{paddingTop: statusBarHeight}}>
      <View className="mb-5 spacing-1">
        <BackIcon text={`Sign Up`} onPress={() => navigation.goBack()} />
      </View>
      <ScreenWrapperWithScrollView isStatusBarHeight={false}>
        <View className={cn('spacing-1')}></View>
      </ScreenWrapperWithScrollView>
    </View>
  )
}
