import CreateNativeStackNavigator from './CreateNativeStackNavigator'
import {createNavigatorFactory} from '@react-navigation/native'
import {SpecificDoctor} from '~/screens/doctors/SpecificDoctor'
import {BookAppointment} from '~/screens/appointments/BookAppointment'
import HomeScreen from '~/screens/home/HomeScreen'
import {AllAppointment} from '~/screens/appointments/AllAppointment'

const createMyNavigator = createNavigatorFactory(CreateNativeStackNavigator)

const Stack = createMyNavigator()
export default function MainNavigation() {
  return (
    <>
      <Stack.Navigator initialRouteName="HomeScreen">
        <>
          <Stack.Screen
            name="HomeScreen"
            getComponent={() => HomeScreen}
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
          <Stack.Screen
            name="BookAppointment"
            getComponent={() => BookAppointment as any}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AllAppointment"
            getComponent={() => AllAppointment as any}
            options={{
              headerShown: false,
            }}
          />
        </>
      </Stack.Navigator>
    </>
  )
}
