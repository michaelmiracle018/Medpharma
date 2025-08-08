import {Separator} from '@rn-primitives/dropdown-menu'
import {Image, View} from 'react-native'
import {Calendar} from '~/lib/icons/Calendar'
import {AlarmClock} from '~/lib/icons/AlarmClock'
import {Text} from '~/components/ui/text'
import images from '~/constants/images'
import {Button} from '~/components/ui/button'
import {IAllAppointment} from '~/types'
import {parseTimeSlot} from '~/utils/parseTimeSlot'
import {Card} from '~/components/ui/card'
import {Badge} from '~/components/ui/badge'
import {cn} from '~/lib/utils'
import {useNavigation} from '@react-navigation/native'
import {NavigationMainProp} from '~/types/navigationTypes'
import {Check} from '~/lib/icons/Check'
import {User} from 'lucide-react-native'

export const RenderAppointmentCard = (item: IAllAppointment) => {
  const {date, startTime, endTime} = parseTimeSlot(
    item?.slotStart,
    item?.slotEnd,
  )

  const navigation = useNavigation<NavigationMainProp>()

  return (
    <View>
      <Card className=" rounded-xl  mb-6 pb-5">
        <View className="items-end">
          <Badge
            className={cn(
              ' border-0 text-white',
              item.status === 'BOOKED'
                ? 'bg-primary'
                : item.status === 'ONGOING'
                  ? 'bg-green-400'
                  : item.status === 'DELAYED' && 'bg-destructive',
            )}
            variant="default">
            <Text>{item.status}</Text>
          </Badge>
        </View>
        <View className="px-3">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-5">
              <View className="rounded-full bg-gray-100 h-14 w-14 flex-center">
                <User size={30} />
              </View>
              <View>
                <Text className="text-lg text-black font-semibold">
                  {item?.patientId?.name}
                </Text>
                <Text className="text-black">{item?.patientId?.role}</Text>
                <Text className="text-black">{item?.patientId?.email}</Text>
              </View>
            </View>
          </View>

          <Separator className="bg-gray-200 h-0.5 my-3" />
          <View className="my-3 flex-row justify-between">
            <View className="flex flex-row items-center gap-2">
              <View className="w-8 h-8 flex-center rounded-full bg-white/20">
                <Calendar className="text-black" size={16} />
              </View>
              <View>
                <Text className="text-black text-sm">Date</Text>
                <Text className="text-black text-sm">{date}</Text>
              </View>
            </View>
            <View className="flex flex-row items-center gap-2">
              <View className="w-8 h-8 flex-center rounded-full bg-white/20">
                <AlarmClock className="text-black" size={16} />
              </View>
              <View>
                <Text className="text-black text-sm">Time</Text>
                <Text className="text-black text-sm">
                  {startTime} - {endTime}
                </Text>
              </View>
            </View>
          </View>
          <View>
            <Button
              className="pb-5"
              onPress={() => navigation.navigate('SpecificDoctor', {item})}>
              <Text>View</Text>
            </Button>
          </View>
        </View>
      </Card>
    </View>
  )
}
