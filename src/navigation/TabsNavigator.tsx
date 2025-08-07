import {Entypo, FontAwesome} from '@expo/vector-icons'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {Platform, StyleSheet, View} from 'react-native'
import Colors from '~/constants/Colors'
import DoctrsScreen from '~/screens/doctors/DoctrsScreen'
import HomeScreen from '~/screens/home/HomeScreen'

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
      <Tab.Screen
        name="Home"
        getComponent={() => HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Entypo
                name="home"
                size={focused ? 20 : 22}
                color={focused ? '#3C50E0' : Colors.gray}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Doctors"
        getComponent={() => DoctrsScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <FontAwesome
                name="stethoscope"
                size={focused ? 20 : 22}
                color={focused ? '#3C50E0' : Colors.gray}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  )
}

{
  /* <FontAwesome name="stethoscope" size={24} color="black" /> */
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
