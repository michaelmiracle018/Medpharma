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
import DoctorTabs from '../home/components/DoctorTabs'

const data = Array.from({length: 10}).map((_, i) => ({
  id: i.toString(),
  title: `Card ${i + 1}`,
}))

const numColumns = 2
const cardSpacing = 12
const cardWidth = (Screen_width - (numColumns + 1) * cardSpacing) / numColumns

const DoctrsScreen = () => {
  return (
    <ScreenWrapperWithoutScrollView>
      <View className="spacing-1" style={{paddingTop: statusBarHeight}}>
        <Text className="font-bold text-2xl text-center mb-4">All Doctors</Text>
        <View className="mb-7">
          <DoctorTabs />
        </View>
      </View>

      <View style={{width: Screen_width}} className="h-full spacing-1">
        <ScrollableFlashList
          data={data}
          keyExtractor={item => item.id}
          removeClippedSubviews={true}
          estimatedItemSize={200}
          scrollEnabled
          contentInsetAdjustmentBehavior="always"
          numColumns={numColumns}
          contentContainerStyle={{paddingBottom: 300}}
          ItemSeparatorComponent={() => <View style={{height: cardSpacing}} />}
          //   columnWrapperStyle={{ justifyContent: 'space-between' }}
          onEndReached={() => {}}
          renderItem={({item}) => (
            <View style={[styles.cardContainer, {width: cardWidth}]}>
              <Card className="bg-white rounded-xl shadow p-2 items-center">
                <Image
                  source={images.miracle}
                  className="w-16 h-16 rounded-full mb-2"
                />
                <Text className="text-base font-semibold">
                  Dr. Michael Avidan
                </Text>
                <Text className="text-gray-500">Medical Oncology</Text>
                <Text className="text-gray-500">
                  <Text className="text-primary font-bold">GhS 50</Text> per
                  session
                </Text>
                <Button
                  variant="primary"
                  className="rounded-full h-8 w-full mt-2"
                  size="sm">
                  <Text className="text-white">Book</Text>
                </Button>
              </Card>
            </View>
          )}
          ListEmptyComponent={
            <View className="mt-10">
              <Text>No Doctor Found</Text>
            </View>
          }
          ListFooterComponent={<Text>Loading...</Text>}
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

export default DoctrsScreen
