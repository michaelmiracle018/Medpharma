/* eslint-disable @typescript-eslint/no-unused-vars */
import {Fragment, useEffect, useRef} from 'react'
import {StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'

import {FullWindowOverlay} from '~/components/FullWindowOverlay'
import {useDetachModalControls, useDetachModals} from '~/context/DetachModal'
import * as CancelAppointMentModal from './CancelAppointMentModal'

import BottomSheet from '@gorhom/bottom-sheet'
import {createCustomBackdrop} from './BottomSheetCustomBackdrop'

const DEFAULT_SNAPPOINTS = ['90%']
const HANDLE_HEIGHT = 24
const DEFAULT_PAN_DOWN_TO_CLOSE = true
const DEFAULT_DEACTIVATE_BACKDROP = false
const DEFAULT_DETACH = true
const DEFAULT_BOTTOM_INSET = 15
const DEFAULT_MARGIN_HORIZONTAL = 15
const ENABLE_DYNAMIC_SIZING = false

export function BottomSheetDetachModalsContainer() {
  const {isModalActive, activeModals} = useDetachModals()
  const {closeDetachModal} = useDetachModalControls()
  const bottomSheetRef = useRef<BottomSheet>(null)
  const activeModal = activeModals[activeModals.length - 1]

  const onBottomSheetChange = async (snapPoint: number) => {
    if (snapPoint === -1) {
      closeDetachModal()
    }
  }

  const onClose = () => {
    bottomSheetRef.current?.close()
    closeDetachModal()
  }

  useEffect(() => {
    if (isModalActive) {
      bottomSheetRef.current?.snapToIndex(0)
    } else {
      bottomSheetRef.current?.close()
    }
  }, [isModalActive, bottomSheetRef, activeModal?.name])

  let detach: boolean = DEFAULT_DETACH
  let snapPoints: (string | number)[] = DEFAULT_SNAPPOINTS
  let enablePanDownToClose: boolean = DEFAULT_PAN_DOWN_TO_CLOSE
  let deactivateBackDrop: boolean = DEFAULT_DEACTIVATE_BACKDROP
  let bottomInset: number = DEFAULT_BOTTOM_INSET
  let marginHorizontal: number = DEFAULT_MARGIN_HORIZONTAL
  let enableDynamicSizing: boolean = ENABLE_DYNAMIC_SIZING

  let element
  if (activeModal?.name === 'cancel-appointment-modal') {
    snapPoints = CancelAppointMentModal.snapPoints
    enablePanDownToClose = CancelAppointMentModal.enablePanDownToClose
    deactivateBackDrop = CancelAppointMentModal.deactivateBackDrop
    detach = CancelAppointMentModal.detach
    bottomInset = CancelAppointMentModal.bottomInset
    marginHorizontal = CancelAppointMentModal.marginHorizontal
    enableDynamicSizing = CancelAppointMentModal.enableDynamicSizing
    element = <CancelAppointMentModal.Component />
  } else {
    return null
  }

  if (snapPoints[0] === 'fullscreen') {
    return (
      <SafeAreaView
        style={[styles.fullscreenContainer, {backgroundColor: '#fff'}]}>
        {element}
      </SafeAreaView>
    )
  }

  const Container = activeModal ? FullWindowOverlay : Fragment

  return (
    <Container>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        // handleHeight={HANDLE_HEIGHT}
        index={isModalActive ? 0 : -1}
        enablePanDownToClose={enablePanDownToClose}
        android_keyboardInputMode="adjustResize"
        keyboardBlurBehavior="restore"
        enableDynamicSizing={enableDynamicSizing}
        backdropComponent={
          deactivateBackDrop
            ? createCustomBackdrop()
            : isModalActive
              ? createCustomBackdrop(onClose)
              : undefined
        }
        detached={detach}
        bottomInset={bottomInset}
        style={{marginHorizontal: marginHorizontal}}
        handleIndicatorStyle={{backgroundColor: '#000', marginTop: 7}}
        handleStyle={[styles.handle]}
        onChange={onBottomSheetChange}>
        {element}
      </BottomSheet>
    </Container>
  )
}

const styles = StyleSheet.create({
  handle: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  fullscreenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
})
