import {View} from 'react-native'
import Colors from '~/constants/Colors'
import {X} from '~/lib/icons/X'
import {cn} from '~/lib/utils'

export default function ErrorSign() {
  return (
    <View className="w-20 h-20 rounded-full justify-center items-center bg-red-100">
      <View
        className={cn('w-16 h-16 rounded-full justify-center items-center')}
        style={{backgroundColor: Colors.danger}}>
        <X className="text-white" size={35} />
      </View>
    </View>
  )
}
