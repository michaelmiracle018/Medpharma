import {
  ParamListBase,
  StackActionHelpers,
  StackNavigationState,
  StackRouter,
  StackRouterOptions,
  useNavigationBuilder,
} from '@react-navigation/native'
import {NativeStackView} from '@react-navigation/native-stack'
import type {NativeStackNavigatorProps} from '@react-navigation/native-stack/src/types'
import type {
  NativeStackNavigationEventMap,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack'

function CreateNativeStackNavigator({
  initialRouteName,
  children,
  screenOptions,
  ...rest
}: NativeStackNavigatorProps) {
  const {state, descriptors, navigation, NavigationContent} =
    useNavigationBuilder<
      StackNavigationState<ParamListBase>,
      StackRouterOptions,
      StackActionHelpers<ParamListBase>,
      NativeStackNavigationOptions,
      NativeStackNavigationEventMap
    >(StackRouter, {
      initialRouteName,
      children,
      screenOptions,
    })
  // const {state, descriptors, navigation, NavigationContent} =
  //   useNavigationBuilder(StackRouter, {
  //     initialRouteName,
  //     children,
  //     screenOptions,
  //   })

  return (
    <NavigationContent>
      <NativeStackView
        {...rest}
        state={state}
        navigation={navigation}
        descriptors={descriptors}
      />
    </NavigationContent>
  )
}

export default CreateNativeStackNavigator
