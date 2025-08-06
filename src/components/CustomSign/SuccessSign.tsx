import {View} from 'react-native'
import Colors from '~/constants/Colors'
import {Check} from '~/lib/icons/Check'
import {cn} from '~/lib/utils'

export default function SuccessSign() {
  return (
    <View className="w-20 h-20 rounded-full justify-center items-center bg-green-100">
      <View
        className={cn('w-16 h-16 rounded-full justify-center items-center')}
        style={{backgroundColor: Colors.light_green}}>
        <Check className="text-white" size={35} />
      </View>
    </View>
  )
}
