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

const numColumns = 2
const cardSpacing = 12
const cardWidth = (Screen_width - (numColumns + 1) * cardSpacing) / numColumns

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
            numColumns={numColumns}
            contentContainerStyle={{paddingBottom: 300}}
            renderItem={({item}) => (
              <View style={[styles.cardContainer, {width: cardWidth}]}>
                <Card className="bg-white rounded-xl shadow p-2 items-center">
                  <Image
                    source={images.doctor_img}
                    className="w-16 h-16 rounded-full mb-2"
                  />
                  <Text className="text-base font-semibold">{item?.name}</Text>
                  <Text className="text-gray-500">{item?.role}</Text>
                  <Text className="text-gray-500">
                    <Text className="text-primary font-bold">GhS 50</Text> per
                    session
                  </Text>
                  <Button
                    onPress={() =>
                      navigation.navigate('BookAppointment', {id: item?._id})
                    }
                    variant="primary"
                    className="rounded-full h-8 w-full mt-2"
                    size="sm">
                    <Text className="text-white">Book</Text>
                  </Button>
                </Card>
              </View>
            )}
            ListHeaderComponent={<Header />}
            ListEmptyComponent={
              <View className="mt-10">
                <Text>No Doctor Found</Text>
              </View>
            }
            ListFooterComponent={<>{isFetchingDoctors && <ContentLoader />}</>}
            refreshControl={
              <RefreshControl
                onRefresh={() => {}}
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

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: cardSpacing,
    paddingTop: 12,
  },
  cardContainer: {
    marginBottom: cardSpacing,
  },
})

export default HomeScreen
