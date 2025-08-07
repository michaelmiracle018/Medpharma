import {TouchableOpacity, View} from 'react-native'
import {Text} from '~/components/ui/text'
import ScreenWrapperWithScrollView from '~/components/ScreenWrapperWithScrollView'
import {cn} from '~/lib/utils'
import {HelloWave} from '~/components/HelloWave'
import {useForm} from 'react-hook-form'
import BackgroundInput from '~/components/customInput/BackgroundInput'
import {Button} from '~/components/ui/button'
import {useNavigation} from '@react-navigation/native'
import {useQueryClient} from '@tanstack/react-query'
import {NavigationAuthProp} from '~/types/navigationTypes'

import {H1} from '~/components/ui/typography'
import {useModalControls} from '~/context/BottomModal'

import {CircleLoading} from '~/components/loader/CircleLoading'
import {useDeviceDetails} from '~/hooks/useDeviceDetails'
import {toast} from 'sonner-native'
import Colors from '~/constants/Colors'
import CustomTouchable from '~/components/CustomTouchable'
import {userLoginForm} from '~/types'

export default function LoginScreen() {
  const navigation = useNavigation<NavigationAuthProp>()
  const {deviceOS, deviceName, deviceId} = useDeviceDetails()
  const queryClient = useQueryClient()
  const {openModal} = useModalControls()
  const {
    control,
    handleSubmit,
    reset,
    setError,
    watch,
    formState: {errors},
  } = useForm<userLoginForm>({
    defaultValues: {
      emailOrPhone: '',
      password: '',
    },
  })
  const watchEmailOrPhone = watch('emailOrPhone')
  const watchPassword = watch('password')

  const onSubmit = async (value: userLoginForm) => {}

  return (
    <ScreenWrapperWithScrollView>
      <View className="native:ios:mt-10">
        <View className={cn('spacing-1')}>
          <View className="flex-row gap-1">
            <H1 className="text-foreground text-center">Welcome</H1>
            <HelloWave />
          </View>
          <Text className="native:text-xl font-normal pt-3 text-gray-400">
            Sign in with your email to continue.
          </Text>
          <View className="pt-14">
            <BackgroundInput
              trimText={true}
              nativeID="emailOrPhone"
              control={control}
              name="emailOrPhone"
              label={'Email / Phone Number'}
              placeholder={`Enter your email or phone number`}
              errors={errors}
              inputErr={errors.emailOrPhone?.type === 'required'}
              required={`This field is required.`}
            />
            <View className="pt-5">
              <BackgroundInput
                trimText={true}
                nativeID="password"
                control={control}
                name="password"
                label={`Password`}
                placeholder={`Enter your password`}
                errors={errors}
                inputErr={errors.password?.type === 'required'}
                secureTextEntry={true}
                required={`This field is required.`}
              />
            </View>
          </View>
          <CustomTouchable
            onPress={() => navigation.navigate('ForgetPassword')}>
            <Text className="text-primary font-semibold">Forgot Password?</Text>
          </CustomTouchable>
          <Button
            variant="primary"
            className="shadow shadow-foreground/1 w-full mt-5"
            onPress={handleSubmit(onSubmit)}
            size="default"
            disabled={false}>
            {false ? (
              <CircleLoading color={Colors.textHighlightColor} size={25} />
            ) : (
              <Text className="font-bold text-white">Login</Text>
            )}
          </Button>
          <View className="flex-row gap-1 justify-start items-center mt-3">
            <Text>Don't have an account?</Text>
            <CustomTouchable
              onPress={() => {
                reset()
                navigation.navigate('SignUpScreen')
              }}>
              <Text className="text-primary font-semibold">Sign Up</Text>
            </CustomTouchable>
          </View>
        </View>
      </View>
    </ScreenWrapperWithScrollView>
  )
}
