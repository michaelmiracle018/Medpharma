import {PropsWithChildren, ReactElement} from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native'
import {colors} from '../../styles/colors'
import {TCustomModalControls} from '../../types/index.types'
import Modal from 'react-native-modal'
import type BaseModalProps from '~/types/modalTypes'

// In iOS, `SafeAreaView` does not automatically account on keyboard.
// Therefore, for iOS we need to wrap the content in `KeyboardAvoidingView`.
const ModalContentWrapper = ({children}: PropsWithChildren): ReactElement => {
  return Platform.OS === 'ios' ? (
    <KeyboardAvoidingView style={[{flex: 1}]} behavior="padding">
      {children}
    </KeyboardAvoidingView>
  ) : (
    <>{children}</>
  )
}

const CustomModal = ({
  isVisible,
  onBackButtonPress,
  onModalHide,
  onModalShow,
  animationInTiming,
  animationOutTiming,
  useNativeDriver = true,
  useNativeDriverForBackdrop = true,
  hideModalContentWhileAnimating = false,
  backdropOpacity = 0.3,
  backdropColor,
  swipeDirection,
  swipeThreshold,
  onSwipeComplete,
  avoidKeyboard = false,
  propagateSwipe = false,
  statusBarTranslucent = true,
  deviceHeight,
  deviceWidth,
  style,
  backdropTransitionInTiming,
  backdropTransitionOutTiming,
  hasBackdrop = true,
  coverScreen = true,
  animationIn = 'fadeIn',
  animationOut = 'fadeOutDown',
  onRequestClose,
  modalOptionsContainerStyle, // for backward compatibility
  modalControls,
  //  onBackdropPress,
  children,
}: TCustomModalControls & BaseModalProps) => {
  return (
    <Modal
      visible={isVisible}
      testID="react-native-input-select-modal"
      transparent={true}
      animationType="fade"
      isVisible={isVisible}
      onBackButtonPress={onBackButtonPress}
      onModalHide={onModalHide}
      onModalShow={onModalShow}
      animationIn={animationIn}
      animationOut={animationOut}
      animationInTiming={animationInTiming}
      animationOutTiming={animationOutTiming}
      useNativeDriver={useNativeDriver}
      useNativeDriverForBackdrop={useNativeDriverForBackdrop}
      hideModalContentWhileAnimating={hideModalContentWhileAnimating}
      backdropOpacity={backdropOpacity}
      swipeDirection={swipeDirection}
      swipeThreshold={swipeThreshold}
      onSwipeComplete={onSwipeComplete}
      avoidKeyboard={avoidKeyboard}
      propagateSwipe={propagateSwipe}
      statusBarTranslucent={statusBarTranslucent}
      deviceHeight={deviceHeight}
      hasBackdrop={hasBackdrop}
      coverScreen={coverScreen}
      deviceWidth={deviceWidth}
      backdropTransitionInTiming={backdropTransitionInTiming}
      backdropTransitionOutTiming={backdropTransitionOutTiming}
      onBackdropPress={onRequestClose}
      style={[style, {margin: 0}]}
      {...modalControls?.modalProps}>
      {/*Used to fix the select with search box behavior in iOS*/}
      <ModalContentWrapper>
        <TouchableOpacity
          onPress={onRequestClose}
          style={[
            styles.modalContainer,
            styles.modalBackgroundStyle,
            modalControls?.modalBackgroundStyle,
          ]}
          activeOpacity={1}
          aria-label="close modal">
          {/* Added this `TouchableWithoutFeedback` wrapper because of the closing modal on expo web */}
          <TouchableWithoutFeedback accessible={false}>
            <SafeAreaView
              style={[
                styles.modalOptionsContainer,
                modalControls?.modalOptionsContainerStyle ||
                  modalOptionsContainerStyle,
              ]}
              testID="react-native-input-select-modal-body">
              {children}
            </SafeAreaView>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </ModalContentWrapper>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackgroundStyle: {backgroundColor: 'rgba(0, 0, 0, 0.5)'},
  modalOptionsContainer: {
    maxHeight: '90%',
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    zIndex: 5,
    paddingBottom: 30,
  },
})

export default CustomModal
