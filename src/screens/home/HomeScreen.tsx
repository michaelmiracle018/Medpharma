import {Image, RefreshControl, StyleSheet, View} from 'react-native'
import ScrollableFlashList from '~/components/List/ScrollableFlashList'
import ScreenWrapperWithoutScrollView from '~/components/ScreenWrapperWithoutScrollView'
import {Button} from '~/components/ui/button'
import {Card} from '~/components/ui/card'
import {Text} from '~/components/ui/text'
import Colors from '~/constants/Colors'
import images from '~/constants/images'
import {isIOS, statusBarHeight} from '~/lib/platform/detection'
import {Screen_width} from '~/lib/platform/statusBarHeight'
import {useQuery} from '@tanstack/react-query'
import {serviceGetAllDoctors} from '~/services/doctor.services'
import {FETCH_ALL_DOCTORS} from '~/query-data/querykeys'
import {ContentLoader} from '~/components/loader/ContentLoader'
import {useMemo} from 'react'
import {Header} from './components/Header'
import {NavigationMainProp} from '~/types/navigationTypes'
import {useNavigation} from '@react-navigation/native'
import {useRefreshOnFocus} from '~/hooks/useRefreshOnFocus'
import {Separator} from '~/components/ui/separator'
import {Stethoscope} from '~/lib/icons/Stethoscope'
import CustomTouchable from '~/components/CustomTouchable'
import {id} from '@gorhom/bottom-sheet/src/utilities/id'

const HomeScreen = () => {
  const navigation = useNavigation<NavigationMainProp>()

  const {
    isLoading: isFetchingDoctors,
    data: allDoctors,
    isRefetching: isRefetchingDoctors,
    refetch: refetchDoctors,
  } = useQuery({
    queryKey: [FETCH_ALL_DOCTORS],
    queryFn: () => serviceGetAllDoctors(),
  })

  const newData = useMemo(() => {
    return allDoctors?.data
  }, [allDoctors])

  useRefreshOnFocus(refetchDoctors)

  return (
    <ScreenWrapperWithoutScrollView>
      <View style={{paddingTop: statusBarHeight}}>
        <View style={{width: Screen_width}} className="h-full spacing-1">
          <ScrollableFlashList
            data={newData}
            keyExtractor={item => item?._id}
            removeClippedSubviews={true}
            estimatedItemSize={200}
            scrollEnabled
            contentInsetAdjustmentBehavior="always"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 300}}
            renderItem={({item}) => (
              <View className="my-5">
                <Card className="bg-white rounded-xl shadow p-2">
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center">
                      <Image
                        source={images.doctor_img}
                        className="w-14 h-14 rounded-full mr-4"
                      />
                      <View>
                        <Text className="text-base font-semibold">
                          {item?.name}
                        </Text>
                        <Text className="text-gray-500">{item?.role}</Text>
                        <Text className="text-gray-500">
                          <Text className="text-primary font-bold">GhS 50</Text>{' '}
                          per session
                        </Text>
                      </View>
                    </View>
                    <CustomTouchable
                      className="w-10 h-10 flex-center rounded-full bg-gray-200"
                      onPress={() =>
                        navigation.navigate('AllAppointment', {id: item?._id})
                      }>
                      <Stethoscope className="text-black" size={20} />
                    </CustomTouchable>
                  </View>
                  <Separator className="bg-gray-200 my-4" />

                  <View className="flex-row items-center gap-5 justify-between mt-4">
                    <Button
                      variant={'primary'}
                      className="rounded-xl bg-primary border-0 active:bg-primary/80"
                      onPress={() =>
                        navigation.navigate('BookAppointment', {id: item?._id})
                      }>
                      <Text className="text-white font-semibold">Book</Text>
                    </Button>
                    <Button
                      variant={'primary'}
                      onPress={() =>
                        navigation.navigate('AllAppointment', {id: item?._id})
                      }
                      className="rounded-xl flex-1 bg-primary border-0 active:bg-primary/80">
                      <Text className="text-white font-semibold">
                        View Sessions
                      </Text>
                    </Button>
                  </View>
                </Card>
              </View>
            )}
            ListHeaderComponent={<Header />}
            ListEmptyComponent={
              <View className="mt-10">
                {!isFetchingDoctors && !isFetchingDoctors && (
                  <Text>No Doctor Found</Text>
                )}
              </View>
            }
            ListFooterComponent={<>{isFetchingDoctors && <ContentLoader />}</>}
            refreshControl={
              <RefreshControl
                onRefresh={refetchDoctors}
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
      </View>
    </ScreenWrapperWithoutScrollView>
  )
}

export default HomeScreen
