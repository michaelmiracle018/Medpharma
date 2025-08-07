import {useNavigation} from '@react-navigation/native'
import {Image, View} from 'react-native'
import BackIcon from '~/components/BackIcon'
import ScreenWrapperWithScrollView from '~/components/ScreenWrapperWithScrollView'
import {Text} from '~/components/ui/text'
import {H1, H2} from '~/components/ui/typography'
import images from '~/constants/images'
import {statusBarHeight} from '~/lib/platform/detection'
import {cn} from '~/lib/utils'
import {NavigationAuthProp} from '~/types/navigationTypes'
import {CircleCheckBig} from '~/lib/icons/CircleCheckBig'
import {Card} from '~/components/ui/card'
import {Calendar} from '~/lib/icons/Calendar'
import CountTimer from '~/components/Timer/CountTimer'
import {Button} from '~/components/ui/button'

export const SpecificDoctor = () => {
  const navigation = useNavigation<NavigationAuthProp>()

  return (
    <View className="flex-1 bg-white" style={{paddingTop: statusBarHeight}}>
      <View className="mb-5 spacing-1">
        <BackIcon
          text={`Miracle Michael`}
          onPress={() => navigation.goBack()}
        />
      </View>
      <ScreenWrapperWithScrollView isStatusBarHeight={false}>
        <View className={cn('spacing-1')}>
          <View className="flex-center mt-10">
            <Image
              source={images.doctor_img}
              className="w-32 h-32 rounded-full mb-4 object-cover"
            />
            <H2 className="text-xl font-bold text-black">Dr. Amelia Harper</H2>
            <Text className="text-base">Internal Medicine</Text>
            <Text className="text-base ">5 years experience</Text>
          </View>
          <View>
            <View className="flex-row mt-5 items-center p-4 rounded-lg bg-green-50 border border-green-200">
              <View className="w-12 h-12 flex-shrink-0 rounded-full bg-green-100 flex items-center justify-center mr-4">
                <CircleCheckBig size={20} className="text-green-700" />
              </View>
              <View>
                <Text className="font-bold text-green-700">On Time</Text>
                <Text className="text-sm text-green-600">
                  The doctor is running on schedule.
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
                          16 May, Friday 2025
                        </Text>
                        <Text className="text-gray-100 text-slg">08:00 PM</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View className="justify-between items-center">
                  <Text className="font-semibold text-lg">Join In</Text>

                  <CountTimer timeStamp="2025-08-07T18:45:00.000Z" />
                </View>
              </Card>
            </View>

            <View className="mt-20">
              <Button
                variant={'primary'}
                className="bg-primary active:bg-primary">
                <Text className="text-white">Join Call</Text>
              </Button>
            </View>
          </View>
        </View>
      </ScreenWrapperWithScrollView>
    </View>
  )
}
