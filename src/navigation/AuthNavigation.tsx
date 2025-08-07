import LoginScreen from '~/screens/auth/LoginScreen'
import CreateNativeStackNavigator from './CreateNativeStackNavigator'
import {createNavigatorFactory} from '@react-navigation/native'
import {SignUpScreen} from '~/screens/auth/SignUpScreen'

const createMyNavigator = createNavigatorFactory(CreateNativeStackNavigator)

const Stack = createMyNavigator()
export default function AuthNavigation() {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <>
        <Stack.Screen
          name="LoginScreen"
          getComponent={() => LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUpScreen"
          getComponent={() => SignUpScreen}
          options={{
            headerShown: false,
          }}
        />
      </>
    </Stack.Navigator>
  )
}
