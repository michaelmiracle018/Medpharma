import CreateNativeStackNavigator from './CreateNativeStackNavigator'
import {createNavigatorFactory} from '@react-navigation/native'
import TabsNavigator from './TabsNavigator'

import {useEffect} from 'react'
import {isAndroid} from '~/lib/platform/detection'
import {BackHandler} from 'react-native'

const createMyNavigator = createNavigatorFactory(CreateNativeStackNavigator)

const Stack = createMyNavigator()
export default function MainNavigation() {
  // const {getUserAccountType} = useAppSelector(state => state.authStore)
  // const closeAnyActiveElement = useCloseAnyActiveElement()

  // useEffect(() => {
  //   if (isAndroid) {
  //     const listener = BackHandler.addEventListener('hardwareBackPress', () => {
  //       return closeAnyActiveElement()
  //     })

  //     return () => {
  //       listener.remove()
  //     }
  //   }
  // }, [closeAnyActiveElement])

  return (
    <>
      <Stack.Navigator initialRouteName="HomeScreen">jeekkk</Stack.Navigator>
    </>
  )
}
