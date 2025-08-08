import {RefreshControl, View} from 'react-native'
import ScrollableFlashList from '~/components/List/ScrollableFlashList'
import {ContentLoader} from '~/components/loader/ContentLoader'
import ScreenWrapperWithoutScrollView from '~/components/ScreenWrapperWithoutScrollView'
import {Text} from '~/components/ui/text'
import Colors from '~/constants/Colors'
import {isIOS, statusBarHeight} from '~/lib/platform/detection'
import {Screen_width} from '~/lib/platform/statusBarHeight'
import {RenderAppointmentCard} from './RenderAppointmentCard'
import BackIcon from '~/components/BackIcon'
import {useNavigation} from '@react-navigation/native'
import {
  CommonNavigatorParams,
  NativeStackScreenProps,
  NavigationMainProp,
} from '~/types/navigationTypes'
import {H3} from '~/components/ui/typography'
import {useQuery} from '@tanstack/react-query'
import {FETCH_ALL_APPOINTMENT} from '~/query-data/querykeys'
import {serviceGetAllAppointment} from '~/services/doctor.services'
import {useRefreshOnFocus} from '~/hooks/useRefreshOnFocus'
import {useCallback, useMemo} from 'react'
import {IAllAppointment} from '~/types'

export const AllAppointment = ({
  route,
}: NativeStackScreenProps<CommonNavigatorParams, 'AllAppointment'>) => {
  const navigation = useNavigation<NavigationMainProp>()
  const {id} = route.params

  const {
    isLoading: isFetchingAllAppointments,
    data: allAppointments,
    isRefetching: isRefetchingAllAppointments,
    refetch: refetchAllAppointments,
  } = useQuery({
    queryKey: [FETCH_ALL_APPOINTMENT, id],
    queryFn: () => serviceGetAllAppointment(id),
    enabled: !!id,
  })

  const newData = useMemo(() => {
    if (allAppointments) {
      return allAppointments
    }
  }, [allAppointments])

  const renderMarketItem = useCallback(
    ({item, index}: {item: IAllAppointment | any; index: number}) => {
      return <RenderAppointmentCard {...item} index={index + 1} />
    },
    [id],
  )
  useRefreshOnFocus(refetchAllAppointments)

  return (
    <View style={{paddingTop: statusBarHeight}} className="bg-white flex-1">
      <ScreenWrapperWithoutScrollView>
        <View className="mb-5 spacing-1">
          <BackIcon
            text="Active Appointments"
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={{width: Screen_width}} className="h-full spacing-1">
          <ScrollableFlashList
            contentContainerStyle={{paddingBottom: 300}}
            data={newData}
            keyExtractor={item => (item as unknown as IAllAppointment)._id}
            removeClippedSubviews={true}
            showsVerticalScrollIndicator={false}
            estimatedItemSize={500}
            renderItem={item => <View>{renderMarketItem(item)}</View>}
            scrollEnabled={!false}
            contentInsetAdjustmentBehavior="always"
            ListEmptyComponent={
              <View className="mt-10">
                {!isRefetchingAllAppointments && !isFetchingAllAppointments && (
                  <Text className="text-center font-bold">No Doctor Found</Text>
                )}
              </View>
            }
            ListHeaderComponent={
              <H3 className="text-center my-5">Active Appointment</H3>
            }
            ListFooterComponent={
              <>{isFetchingAllAppointments && <ContentLoader />}</>
            }
            refreshControl={
              <RefreshControl
                onRefresh={refetchAllAppointments}
                refreshing={false}
                tintColor={Colors.primary}
                title="Refreshing..."
                colors={[Colors.primary]}
                progressBackgroundColor="#fff"
                progressViewOffset={isIOS ? -10 : 30}
              />
            }
          />
        </View>
      </ScreenWrapperWithoutScrollView>
    </View>
  )
}
