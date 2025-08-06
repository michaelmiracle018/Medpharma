/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/display-name */
import React from 'react'
import {View} from 'react-native'
import Modal from 'react-native-modal'
import {cn} from '~/lib/utils'
import type BaseModalProps from '~/types/modalTypes'

const ModalDisplay = React.forwardRef<
  React.ElementRef<typeof Modal>,
  BaseModalProps
>(
  (
    {
      isVisible,
      onBackdropPress,
      onBackButtonPress,
      onModalHide,
      onModalShow,
      animationInTiming,
      animationOutTiming,
      useNativeDriver = true,
      useNativeDriverForBackdrop = true,
      hideModalContentWhileAnimating = false,
      backdropOpacity = 0.4,
      backdropColor,
      swipeDirection,
      swipeThreshold,
      onSwipeComplete,
      avoidKeyboard = false,
      propagateSwipe = false,
      statusBarTranslucent = true,
      deviceHeight,
      deviceWidth,
      className,
      style,
      children,
      backdropTransitionInTiming,
      backdropTransitionOutTiming,
      enableBottomSheet = false,
      fullscreen,
      hasBackdrop = true,
      coverScreen = true,
      animationIn = 'fadeInUp',
      animationOut = 'slideOutDown',
    },
    ref,
  ) => {
    return (
      <Modal
        ref={ref}
        isVisible={isVisible}
        onBackdropPress={onBackdropPress}
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
        backdropColor={backdropColor}
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
        style={[style, enableBottomSheet || fullscreen ? {margin: 0} : {}]}>
        <View
          className={cn(
            `${enableBottomSheet ? 'justify-end items-end' : 'justify-center items-center'}`,
            'flex-1 ',
          )}>
          <View
            className={cn(
              `${fullscreen && 'h-full'}`,
              'bg-background rounded-2xl  border border-border shadow-lg shadow-foreground/5 w-full',
              className,
            )}>
            {children}
          </View>
        </View>
      </Modal>
    )
  },
)

export default ModalDisplay
