import {TouchableOpacity, View, ViewStyle} from 'react-native'
import {Card} from './ui/card'
import {ArrowLeft} from '../lib/icons/ArrowLeft'
import {buttonTextVariants} from './ui/button'
import {Text} from './ui/text'
import {cn} from '~/lib/utils'
import {ClassValue} from 'clsx'
import {ClassNameValue} from 'tailwind-merge'

type UserBackIconTypes = {
  text?: string
  onPress: () => void
  btnContainer?: ViewStyle
  iconStyle?: ClassValue
  textStyle?: ClassNameValue
}

export default function BackIcon({
  text,
  onPress,
  btnContainer,
  iconStyle,
  textStyle,
}: UserBackIconTypes) {
  return (
    <View className="flex-row items-center gap-3">
      <TouchableOpacity onPress={onPress} activeOpacity={1}>
        <Card className={cn('w-11 h-10 rounded-md flex-center', btnContainer)}>
          <ArrowLeft
            className={cn(
              buttonTextVariants({
                variant: 'secondary',
                className: 'opacity-100',
              }),
              iconStyle,
            )}
          />
        </Card>
      </TouchableOpacity>
      <Text className={cn('native:text-md font-bold', textStyle)}>{text}</Text>
    </View>
  )
}
