import {View} from 'react-native'
import {CircleLoading} from '~/components/loader/CircleLoading'
import {Text} from '~/components/ui/text'
import {ModalSheetScrollView} from './ModalsExport'
import {H4} from '~/components/ui/typography'
import {Button} from '~/components/ui/button'
import Colors from '~/constants/Colors'
import {useDetachModalControls} from '~/context/DetachModal'

export const snapPoints = ['40%']
export const enablePanDownToClose = false
export const deactivateBackDrop = false
export const detach = false
export const bottomInset = 0
export const marginHorizontal = 0
export const enableDynamicSizing = true

export function Component() {
  const {closeAllDetachModals} = useDetachModalControls()

  return (
    <>
      <ModalSheetScrollView>
        <View className="inner-pb">
          <View className="spacing-1 mb-3">
            <View className="flex flex-row justify-between items-center ">
              <H4 className="text-black font-bold text-xl pb-2">
                Cancel Appointment
              </H4>
            </View>
          </View>
          <View>
            <View>
              <View className="spacing-1">
                <Text className="font-medium text-lg">
                  Do you want to cancel this appointment?
                </Text>
                <Text className="font-medium  text-lg">
                  You would have to set a new one.
                </Text>

                <View className="flex-row justify-between mt-5 mb-3 gap-2">
                  {!false && (
                    <Button
                      variant="primary"
                      className="flex-1"
                      onPress={closeAllDetachModals}>
                      <Text className="text-white">Close</Text>
                    </Button>
                  )}
                  <Button
                    variant="primary"
                    className="flex-1 mb-2"
                    disabled={false}
                    onPress={() => {}}>
                    {false ? (
                      <CircleLoading
                        color={Colors.textHighlightColor}
                        size={25}
                      />
                    ) : (
                      <Text className="text-white">Cancel</Text>
                    )}
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ModalSheetScrollView>
    </>
  )
}
