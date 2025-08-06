import {View} from 'react-native'
import {cn} from '~/lib/utils'
import Colors from '~/constants/Colors'
import {TriangleAlert} from '~/lib/icons/TriangleAlert'

export default function WarningSign() {
  return (
    <View className="w-20 h-20 rounded-full justify-center items-center bg-yellow-100">
      <View
        className={cn('w-16 h-16 rounded-full justify-center items-center')}
        style={{backgroundColor: Colors.light_warning}}>
        <TriangleAlert className="text-white" size={35} />
      </View>
    </View>
  )
}
