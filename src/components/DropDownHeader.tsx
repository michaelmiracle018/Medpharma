import {View} from 'react-native'

export default function DropDownHeader({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <View className="spacing-1 sticky">
      <View>
        <View className="flex-center">
          <View className="h-[4px] w-8 bg-black rounded-md mb-2" />
        </View>
        {children}
      </View>
    </View>
  )
}
