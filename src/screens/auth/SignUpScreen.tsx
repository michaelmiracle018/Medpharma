import {useMemo, useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {View} from 'react-native'
import BackgroundInput from '~/components/customInput/BackgroundInput'
import InputErrorMessage from '~/components/inputErrorMessage/InputErrorMessage'
import ScreenWrapperWithScrollView from '~/components/ScreenWrapperWithScrollView'
import {Label} from '~/components/ui/label'
import Colors from '~/constants/Colors'
import {cn} from '~/lib/utils'
import {SignUpFormProps} from '~/types'
import countriesJson from '~/assets/countries.json'
import DropDownHeader from '~/components/DropDownHeader'
import {Text} from '~/components/ui/text'
import {Input} from '~/components/ui/input'
import BackIcon from '~/components/BackIcon'
import {useNavigation} from '@react-navigation/native'
import {NavigationAuthProp} from '~/types/navigationTypes'
import PasswordValidateCheck from '~/components/PasswordValidateCheck/PasswordValidateCheck'
import CustomTouchable from '~/components/CustomTouchable'
import Selector from '~/components/Selector/DropDownSelector/Selector'
import {Button} from '~/components/ui/button'
import {CircleLoading} from '~/components/loader/CircleLoading'
import {statusBarHeight} from '~/lib/platform/detection'
import {getStatusBarHeight} from '~/lib/platform/statusBarHeight'

export const SignUpScreen = () => {
  const [validated, setValidated] = useState(false)

  const {
    control,
    handleSubmit,
    trigger,
    watch,
    setError,
    setValue,
    reset,
    resetField,
    formState: {errors},
  } = useForm<SignUpFormProps>({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      country: null,
    },
  })

  const watchEmail = watch('email')
  const watchCountry = watch('country')
  const watchPhoneNumber = watch('phoneNumber')

  const watchPassword = watch('password')
  const dialCode = `+${watchCountry?.dialCode}`
  const navigation = useNavigation<NavigationAuthProp>()

  const listCountries = useMemo(() => {
    const getFilterItems = countriesJson.filter(item => item.isActive === true)
    return getFilterItems.map(item => ({
      label: `${item?.name}`,
      value: `${item?.name}`,
      id: `${item.phoneCode}`,
      country: `${item.name}`,
      dialCode: `${item.phoneCode}`,
      countryCode: `${item?.countryCode}`,
    }))
  }, [])

  return (
    <>
      <View className="flex-1 bg-white" style={{paddingTop: statusBarHeight}}>
        <View className="mb-5 spacing-1">
          <BackIcon text={`Sign Up`} onPress={() => navigation.goBack()} />
        </View>
        <ScreenWrapperWithScrollView isStatusBarHeight={false}>
          <View className={cn('spacing-1')}>
            <Text className="mb-4 font-semibold">
              Please fill this form to sign up.
            </Text>
            <View>
              <BackgroundInput
                trimText={true}
                nativeID="fullName"
                control={control}
                name="fullName"
                label={`Full Name`}
                placeholder={`Enter your full name`}
                errors={errors}
                inputErr={errors.fullName?.type === 'required'}
                required={`This field is required.`}
              />
            </View>
            <View className="mt-5">
              <BackgroundInput
                trimText={true}
                nativeID="email"
                control={control}
                name="email"
                patterValue={/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/}
                patterMessage={`Please enter a valid email`}
                label={`Email`}
                placeholder={`Enter your email`}
                errors={errors}
                inputErr={errors.email?.type === 'required'}
                required={`This field is required.`}
              />
            </View>
            <View className="mt-5">
              <View className="bg-transparent/5 p-2 rounded-2xl w-full mb-7">
                <Controller
                  control={control}
                  rules={{
                    required: `This field is required.`,
                    maxLength: 12,
                  }}
                  render={({field: {onChange, onBlur, value}}: any) => (
                    <Selector
                      selectedValue={value}
                      onValueChange={(value: string) => {
                        // selectPaymentType(value);
                        onChange(value)
                      }}
                      placeholder={`Select an option`}
                      canUnSelect={true}
                      label={`Country`}
                      options={listCountries}
                      labelStyle={{
                        fontWeight: '500',
                        fontSize: 17,
                        color: 'black',
                      }}
                      dropdownStyle={{
                        borderColor:
                          errors.phoneNumber?.type === 'required'
                            ? '#ef4444'
                            : '#3C50E0',
                        minHeight: 48,
                        maxHeight: 30,
                        // maxWidth: 100,
                        paddingVertical: 8,
                        paddingHorizontal: 10,
                        borderRadius: 6,
                        backgroundColor: Colors.white,
                        marginTop: -10,
                      }}
                      primaryColor={Colors.darkMint}
                      // isSearchable
                      placeholderStyle={{
                        color: 'gray',
                        fontWeight: '400',
                      }}
                      modalOptionsContainerStyle={{maxHeight: '88%'}}
                      listHeaderComponent={
                        <DropDownHeader>
                          <Text className="mt-1 text-lg font-bold">
                            Select a country
                          </Text>
                        </DropDownHeader>
                      }
                    />
                  )}
                  name="country"
                />
                <InputErrorMessage errors={errors} name="country" />
              </View>

              <View>
                <View className="bg-transparent/5 p-2 rounded-2xl w-full mb-2">
                  <Label
                    className={cn('pb-2 native:pb-1 pl-0.5')}
                    nativeID={'phone'}>
                    Phone Number
                  </Label>
                  <View className="flex-row gap-2">
                    <View className="flex-row native:h-14 web:w-full rounded-md border border-info bg-background">
                      <View className={cn('flex-center px-2')}>
                        <Text
                          className={cn(
                            'native:text-md font-bold flex-center',
                          )}>
                          {watchCountry ? dialCode : '____'}
                        </Text>
                      </View>
                    </View>
                    <View className="w-[83%]">
                      <Controller
                        control={control}
                        rules={{
                          required: `This field is required.`,
                        }}
                        render={({field: {onChange, onBlur, value}}: any) => (
                          <Input
                            placeholder={`Enter your phone number`}
                            keyboardType="numeric"
                            onBlur={onBlur}
                            value={value}
                            onChangeText={text => onChange(text.trim())}
                            className={cn({
                              'border-destructive':
                                errors.phoneNumber?.type === 'required',
                            })}
                            placeholderClassName="text-center"
                          />
                        )}
                        name="phoneNumber"
                      />
                    </View>
                  </View>
                  <InputErrorMessage errors={errors} name="phoneNumber" />
                </View>
              </View>
            </View>
            <View>
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
                  secureTextEntry={false}
                  required={`This field is required.`}
                />
                {watchPassword.length > 0 && (
                  <PasswordValidateCheck
                    newPassword={watchPassword}
                    onPasswordValidateChange={validatedBoolean =>
                      setValidated(validatedBoolean)
                    }
                    iconStyle={{width: 17, height: 17}}
                    validationRules={[
                      {
                        key: 'MIN_LENGTH',
                        ruleValue: 8,
                        label: `Should contain more than 8 characters`,
                      },
                      {
                        key: 'UPPERCASE_LETTER',
                        label: `Password contains at least one uppercase letter`,
                      },
                      {
                        key: 'LOWERCASE_LETTER',
                        label: `Password contains at least one lowercase letter`,
                      },
                      {
                        key: 'NUMERIC',
                        label: `Password contains at least one numeric`,
                      },
                      {
                        key: 'SPECIAL_CHARS',
                        label: `Password contains at least one special character`,
                      },
                    ]}
                  />
                )}
                <View className="pt-5">
                  <BackgroundInput
                    trimText={true}
                    nativeID="confirmPassword"
                    control={control}
                    name="confirmPassword"
                    label={`Retype Password`}
                    placeholder={`Enter your password`}
                    errors={errors}
                    inputErr={errors.confirmPassword?.type === 'required'}
                    secureTextEntry={false}
                    validate={(value: string) =>
                      value === watchPassword || `password does not match`
                    }
                    required={`This field is required.`}
                  />
                </View>
              </View>
            </View>
            <Button
              variant="primary"
              className="shadow shadow-foreground/1 w-full mt-10 mb-20 flex-1"
              onPress={() => {}}
              size="default"
              disabled={false}>
              {false ? (
                <CircleLoading color={Colors.textHighlightColor} size={25} />
              ) : (
                <Text className="font-bold text-white">Submit</Text>
              )}
            </Button>
          </View>
        </ScreenWrapperWithScrollView>
      </View>
    </>
  )
}
