import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {Platform, StyleSheet} from 'react-native'

const Tab = createBottomTabNavigator()

export default function TabsNavigator() {
  // const {getUserAccountType} = useAppSelector(state => state.authStore)

  return (
    <Tab.Navigator
      initialRouteName="AllPaymentDetails"
      backBehavior="initialRoute"
      screenOptions={{
        headerShown: false,
        lazy: true,
        tabBarShowLabel: true,
        tabBarStyle: styles.tabBar,
        tabBarHideOnKeyboard: true,
      }}>
      hello
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    ...Platform.select({
      ios: {
        height: 70,
      },
      android: {
        height: 60,
        paddingBottom: 15,
      },
    }),
    backgroundColor: 'white',
  },
})
