import CreateNativeStackNavigator from './CreateNativeStackNavigator'
import {createNavigatorFactory} from '@react-navigation/native'
import TabsNavigator from './TabsNavigator'
import {SpecificDoctor} from '~/screens/doctors/SpecificDoctor'

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
      <Stack.Navigator initialRouteName="HomeScreen">
        <>
          <Stack.Screen
            name="HomeScreen"
            getComponent={() => TabsNavigator}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="SpecificDoctor"
            getComponent={() => SpecificDoctor}
            options={{
              headerShown: false,
            }}
          />
        </>
      </Stack.Navigator>
    </>
  )
}
