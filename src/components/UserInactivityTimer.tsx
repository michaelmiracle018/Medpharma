/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useMemo, useState} from 'react'
import {View} from 'react-native'
import UserInactivity from 'react-native-user-inactivity'
import {useModalControls} from '~/context/BottomModal'
import ModalDisplay from './ui/modal'
import {
  useLockScreenModalSelector,
  useLockScreenModalSelectorControl,
} from '~/context/LockScreenModal'
import {Text} from './ui/text'
import {useGetProfileData} from '~/query-data/queries'
import {useAuthSelector} from '~/context/AuthProvider'
import {CircleLoading} from './loader/CircleLoading'
import CustomScrollView from './View/CustomScrollView'
import VerifyPin from '~/pinLock/VerifyPin'
import PhoneLock from '~/screens/LockScreen/PhoneLock'

export const UserInactivityTimer = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [active, setActive] = useState(true)
  const {closeAllModals} = useModalControls()
  const {openLockModal} = useLockScreenModalSelector()
  const {setOpenLockModal} = useLockScreenModalSelectorControl()
  const {canUseBiometric} = useAuthSelector()

  // FETCH USER DATA PROFILE
  const {data: profileData, isLoading: isLoadingProfileData} =
    useGetProfileData()

  const userData = useMemo(() => {
    if (profileData) {
      return profileData
    }
    return null
  }, [profileData])

  useEffect(() => {
    if (!active) {
      closeAllModals()
      setOpenLockModal(true)
    }
  }, [active])

  // TODO: replace 3000 with 60

  return (
    <View style={{flex: 1}}>
      <UserInactivity
        isActive={active}
        timeForInactivity={3000 * 60}
        onAction={isActive => {
          setActive(isActive)
        }}
        style={{flex: 1}}>
        {children}
      </UserInactivity>
      <ModalDisplay fullscreen isVisible={openLockModal}>
        {isLoadingProfileData ? (
          <View className="items-center justify-center flex-1">
            <CircleLoading />
            <Text>Please wait a moment...</Text>
          </View>
        ) : (userData?.userProfile?.isAppPinSet && canUseBiometric) ||
          userData?.userProfile?.isAppPinSet ? (
          <>
            <CustomScrollView className="mt-10">
              <VerifyPin />
            </CustomScrollView>
          </>
        ) : (
          <PhoneLock />
        )}
      </ModalDisplay>
    </View>
  )
}
