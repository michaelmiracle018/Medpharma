import {Dimensions, Image, ScrollView, StyleSheet, View} from 'react-native'
import {HelloWave} from '~/components/HelloWave'
import ScreenWrapperWithScrollView from '~/components/ScreenWrapperWithScrollView'
import {Text} from '~/components/ui/text'
import {H1, H3} from '~/components/ui/typography'
import {cn} from '~/lib/utils'
import {Bell} from '~/lib/icons/Bell'
import {Input} from '~/components/ui/input'
import CustomTouchable from '~/components/CustomTouchable'
import images from '~/constants/images'
import {Button} from '~/components/ui/button'
import DoctorTabs from './components/DoctorTabs'
import {Card} from '~/components/ui/card'
import {Separator} from '~/components/ui/separator'
import {Calendar} from '~/lib/icons/Calendar'
import {AlarmClock} from '~/lib/icons/AlarmClock'
import {useNavigation} from '@react-navigation/native'
import {MainNavigatorParams, NavigationMainProp} from '~/types/navigationTypes'

const numColumns = 2 // Number of items per row
const itemMargin = 15
const itemSize =
  (Dimensions.get('window').width - itemMargin * (numColumns + 1)) / numColumns

const HomeScreen = () => {
  const navigation = useNavigation<NavigationMainProp>()

  return (
    <ScreenWrapperWithScrollView>
      <View className="native:ios:mt-10">
        <View className={cn('spacing-1')}>
          <View className="flex justify-between flex-row items-center">
            <View>
              <View className="flex-row gap-1">
                <H3 className="text-black text-center">Good Morning</H3>
                <HelloWave />
              </View>
              <Text className="font-semibold mt-2">Miracle Michael</Text>
            </View>
            <Bell className="size-5" />
          </View>

          {/* Search Bar */}
          <View className="mt-4 mb-6">
            <Input
              placeholder="Search Doctors..."
              className="bg-gray-100 rounded-xl px-4 py-2"
            />
          </View>

          {/* Upcoming Appointment */}
          <View className="flex justify-between flex-row mt-5 mb-3 items-center">
            <Text className="font-semibold">Upcoming Appointments</Text>
            <CustomTouchable>
              <Text>Seel All</Text>
            </CustomTouchable>
          </View>
          <View className="bg-blue-500 rounded-xl p-4 mb-6">
            <View className="flex-row items-center">
              <Image
                source={images.miracle}
                className="w-14 h-14 rounded-full mr-4"
              />
              <View>
                <Text className="text-lg text-white font-semibold">
                  Dr. Miracle Michael
                </Text>
                <Text className="text-white">Cardiologist</Text>
              </View>
            </View>
            <Separator className="bg-white/60 my-3" />
            <View className="my-3 flex-row justify-between">
              <View className="flex flex-row items-center gap-2">
                <View className="w-8 h-8 flex-center rounded-full bg-white/20">
                  <Calendar className="text-white" size={16} />
                </View>
                <View>
                  <Text className="text-gray-50 text-sm">Date</Text>
                  <Text className="text-gray-100 text-sm">
                    16 May, Friday 2025
                  </Text>
                </View>
              </View>
              <View className="flex flex-row items-center gap-2">
                <View className="w-8 h-8 flex-center rounded-full bg-white/20">
                  <AlarmClock className="text-white" size={16} />
                </View>
                <View>
                  <Text className="text-gray-50 text-sm">Time</Text>
                  <Text className="text-gray-100 text-sm">08 PM - 09 PM</Text>
                </View>
              </View>
            </View>
            <View className="flex-row justify-between mt-4">
              <CustomTouchable
                activeOpacity={1}
                className="bg-white px-4 py-3  rounded-xl border-0">
                <Text className="text-blue-600 font-semibold">Re-Schedule</Text>
              </CustomTouchable>
              <Button
                variant={'primary'}
                className="rounded-xl bg-white/40 border-0 hover:bg-white/40">
                <Text className="text-white font-semibold">View Profile</Text>
              </Button>
            </View>
          </View>

          {/* Specialization Tabs */}
          <View>
            <DoctorTabs />
          </View>

          {/* Popular Healers */}
          <Text className="text-lg font-semibold mt-5 mb-3">
            Popular Healers
          </Text>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 50}}>
            <View className="pb-20">
              <View style={styles.container}>
                {[1, 2].map(item => (
                  <Card
                    key={item}
                    className="bg-white rounded-xl shadow p-2 items-center"
                    style={styles.item}>
                    <Image
                      source={images.miracle}
                      className="w-16 h-16 rounded-full mb-2"
                    />
                    <Text className="text-base font-semibold">
                      Dr. Michael Avidan
                    </Text>
                    <Text className="text-gray-500">Medical Oncology</Text>
                    <Text className="text-gray-500">
                      <Text className="text-primary font-bold">GhS 50</Text>{' '}
                      {''}
                      per session
                    </Text>
                    <Button
                      onPress={() => navigation.navigate('SpecificDoctor')}
                      variant={'primary'}
                      className="rounded-full h-8 w-full mt-2"
                      size={'sm'}>
                      <Text className="text-white">Book</Text>
                    </Button>
                  </Card>
                ))}
              </View>
              <View className="mt-5">
                <Button>
                  <Text>View More</Text>
                </Button>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </ScreenWrapperWithScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item: {
    width: itemSize,
    height: 185,
    marginBottom: itemMargin,
    borderRadius: 8,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
})
export default HomeScreen
