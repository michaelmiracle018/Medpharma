/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/display-name */
import React, {forwardRef, useCallback, useRef, useState} from 'react'
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ViewabilityConfig,
} from 'react-native'
import {FlashList, FlashListProps, ListRenderItem} from '@shopify/flash-list'
import ScrolToTop from '../ScrolToTop'
import Colors from '../../constants/Colors'
import {isIOS} from '../../lib/platform/detection'

interface ScrollableFlashListProps<T>
  extends Omit<FlashListProps<T>, 'renderItem'> {
  renderItem: ListRenderItem<T>
  showScrollTopThreshold?: number
  scrollTopButtonStyle?: StyleProp<ViewStyle>
  scrollTopButtonPosition?: {
    top: number
    right: number
    bottom?: number
    left?: number
  }
}

const ScrollableFlashList = forwardRef<
  FlashList<any>,
  ScrollableFlashListProps<any>
>((props, ref) => {
  const {
    renderItem,
    onScroll,
    showScrollTopThreshold = 400,
    scrollTopButtonStyle,
    scrollTopButtonPosition = {top: 600, right: 10},
    ...rest
  } = props

  const internalListRef = useRef<FlashList<any>>(null)
  const [showScrollToTop, setShowScrollToTop] = useState(false)

  // Combine internal and external refs
  React.useImperativeHandle(
    ref,
    () => internalListRef.current as FlashList<any>,
  )

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offset = event.nativeEvent.contentOffset.y
      if (offset > showScrollTopThreshold && !showScrollToTop) {
        setShowScrollToTop(true)
      } else if (offset <= showScrollTopThreshold && showScrollToTop) {
        setShowScrollToTop(false)
      }

      onScroll?.(event)
    },
    [showScrollToTop, onScroll],
  )

  const scrollToTop = () => {
    requestAnimationFrame(() => {
      internalListRef.current?.scrollToOffset({
        offset: 0,
        animated: true,
      })
    })
  }

  const viewabilityConfig = useRef<ViewabilityConfig>({
    waitForInteraction: true,
    itemVisiblePercentThreshold: 50,
    minimumViewTime: 1000,
  }).current

  return (
    <View style={styles.container}>
      <FlashList
        ref={internalListRef}
        onScroll={handleScroll}
        renderItem={renderItem}
        scrollEventThrottle={16}
        viewabilityConfig={viewabilityConfig}
        removeClippedSubviews={false}
        {...rest}
      />

      {showScrollToTop && (
        <ScrolToTop
          scrollTopHandler={scrollToTop}
          styles={[
            styles.scrollTopDefaultButton,
            scrollTopButtonPosition,
            scrollTopButtonStyle,
          ]}
        />
      )}
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  scrollTopButton: {
    position: 'absolute',
    backgroundColor: '#e0e0e0',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollTopDefaultButton: {
    position: 'absolute',
    top: 500,
    right: 10,
    backgroundColor: Colors.grayDark,
    width: isIOS ? 50 : 40,
    height: isIOS ? 50 : 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
})

export default ScrollableFlashList
