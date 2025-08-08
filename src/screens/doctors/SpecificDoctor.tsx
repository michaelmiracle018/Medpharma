import {useNavigation} from '@react-navigation/native'
import {Image, View} from 'react-native'
import BackIcon from '~/components/BackIcon'
import ScreenWrapperWithScrollView from '~/components/ScreenWrapperWithScrollView'
import {Text} from '~/components/ui/text'
import {H1, H2} from '~/components/ui/typography'
import images from '~/constants/images'
import {statusBarHeight} from '~/lib/platform/detection'
import {cn} from '~/lib/utils'
import {
  CommonNavigatorParams,
  NativeStackScreenProps,
  NavigationAuthProp,
} from '~/types/navigationTypes'
import {CircleCheckBig} from '~/lib/icons/CircleCheckBig'
import {Card} from '~/components/ui/card'
import {Calendar} from '~/lib/icons/Calendar'
import CountTimer from '~/components/Timer/CountTimer'
import {Button} from '~/components/ui/button'
import {useDetachModalControls} from '~/context/DetachModal'
import {useQuery} from '@tanstack/react-query'
import {FETCH_APPOINTMENT_QUEUE_INFO} from '~/query-data/querykeys'
import {serviceAppointmentQueueInfo} from '~/services/doctor.services'
import {ContentLoader} from '~/components/loader/ContentLoader'
import {useRefreshOnFocus} from '~/hooks/useRefreshOnFocus'
import {useMemo} from 'react'
import {parseTimeSlot} from '~/utils/parseTimeSlot'
import {User} from 'lucide-react-native'

export const SpecificDoctor = ({
  route,
}: NativeStackScreenProps<CommonNavigatorParams, 'SpecificDoctor'>) => {
  const navigation = useNavigation<NavigationAuthProp>()
  const {closeAllDetachModals, openDetachModal} = useDetachModalControls()
  const {item} = route.params

  const {
    isLoading: isFetchingAppointmentQueueInfo,
    data: appointmentQueueInfo,
    isRefetching: isRefetchingAppointmentQueueInfo,
    refetch: refetchAppointmentQueueInfo,
  } = useQuery({
    queryKey: [FETCH_APPOINTMENT_QUEUE_INFO, item?._id],
    queryFn: () => serviceAppointmentQueueInfo(item?._id),
    enabled: !!item?._id,
  })

  const {date, startTime, endTime} = parseTimeSlot(
    appointmentQueueInfo?.scheduledStart,
    appointmentQueueInfo?.scheduledEnd,
  )
  const now = new Date()
  const currentTime = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })

  useRefreshOnFocus(refetchAppointmentQueueInfo)

  return (
    <View className="flex-1 bg-white" style={{paddingTop: statusBarHeight}}>
      <View className="mb-5 spacing-1">
        <BackIcon
          text={`${item?.patientId?.name}`}
          onPress={() => navigation.goBack()}
        />
      </View>
      <ScreenWrapperWithScrollView isStatusBarHeight={false}>
        <View className={cn('spacing-1')}>
          <View className="flex-center mt-10">
            <View className="rounded-full bg-gray-100 h-20 w-20 flex-center">
              <User size={40} />
            </View>
            <H2 className="text-xl font-bold text-black">
              {item?.patientId?.name}
            </H2>
            <Text className="text-base">{item?.patientId?.role}</Text>
            <Text className="text-base ">{item?.patientId?.email}</Text>
          </View>

          {isFetchingAppointmentQueueInfo ? (
            <View>
              <ContentLoader />
            </View>
          ) : (
            <>
              <View className="flex-center my-5">
                <Text className="font-bold text-3xl text-primary">
                  {item.index}
                </Text>
                <Text className="text-gray-500 ">
                  You are{' '}
                  {item.index === 1
                    ? '1st'
                    : item.index === 2
                      ? '2nd'
                      : `${item.index}th`}{' '}
                  in the queue
                </Text>
              </View>
              <View>
                <View
                  className={cn(
                    'flex-row mt-5 items-center p-4 rounded-lg bg-green-50 borde',
                    item.status === 'BOOKED'
                      ? 'bg-blue-50 border-blue-200'
                      : item.status === 'ONGOING'
                        ? 'bg-green-50 border-green-200'
                        : item.status === 'DELAYED' &&
                          'bg-red-50 border-red-200',
                  )}>
                  <View
                    className={cn(
                      'w-12 h-12 flex-shrink-0 rounded-full bg-green-100 flex items-center justify-center mr-4',
                      item.status === 'BOOKED'
                        ? 'bg-blue-100'
                        : item.status === 'ONGOING'
                          ? 'bg-green-100'
                          : item.status === 'DELAYED' && 'bg-red-100',
                    )}>
                    <CircleCheckBig
                      size={20}
                      className={cn(
                        'text-green-700',
                        item.status === 'BOOKED'
                          ? 'text-primary'
                          : item.status === 'ONGOING'
                            ? 'text-green-400'
                            : item.status === 'DELAYED' && 'text-red-600',
                      )}
                    />
                  </View>
                  <View>
                    <Text
                      className={cn(
                        'font-bold text-green-700',
                        item.status === 'BOOKED'
                          ? 'text-blue-700'
                          : item.status === 'ONGOING'
                            ? 'text-green-700'
                            : item.status === 'DELAYED' && 'text-destructive',
                      )}>
                      {item.status === 'BOOKED'
                        ? 'On Time'
                        : item.status === 'ONGOING'
                          ? 'Ongoing'
                          : item.status === 'DELAYED' && 'Delayed'}
                    </Text>
                    <Text
                      className={cn(
                        'text-sm text-green-600',
                        item.status === 'BOOKED'
                          ? 'text-blue-600'
                          : item.status === 'ONGOING'
                            ? 'text-green-600'
                            : item.status === 'DELAYED' && 'text-red-600',
                      )}>
                      {item.status === 'BOOKED'
                        ? 'The doctor is running on schedule.'
                        : item.status === 'ONGOING'
                          ? 'The doctor is currently in session.'
                          : item.status === 'DELAYED' &&
                            'The doctor is running late'}
                    </Text>
                  </View>
                </View>
                <View className="mt-5">
                  <Card className="p-2 flex-row  justify-between">
                    <View>
                      <Text className="text-lg font-semibold ">
                        Appointment Details
                      </Text>

                      <View className="flex-row justify-between items-end">
                        <View className="flex-row items-center gap-4 mt-5">
                          <View className="bg-gray-100 w-10 h-10 items-center justify-center rounded-lg">
                            <Calendar className="text-black" size={19} />
                          </View>
                          <View>
                            <Text className="text-gray-50 text-slg">
                              {date}
                            </Text>
                            <Text className="text-gray-100 text-slg">
                              {startTime} - {endTime}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>

                    <View className="justify-between items-center">
                      <Text className="font-semibold text-lg">Join In</Text>
                      <CountTimer
                        timeStamp={appointmentQueueInfo?.scheduledStart}
                      />
                    </View>
                  </Card>
                </View>
              </View>
            </>
          )}
        </View>
      </ScreenWrapperWithScrollView>
    </View>
  )
}
