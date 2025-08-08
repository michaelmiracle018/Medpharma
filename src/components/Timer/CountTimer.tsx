import {useState, useEffect, memo, useRef} from 'react'
import {Text} from '../ui/text'
import {Pressable, TouchableOpacity, View, ViewStyle} from 'react-native'
import {cn} from '~/lib/utils'
import {Tooltip, TooltipContent, TooltipTrigger} from '../ui/tooltip'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

interface Props {
  timeStamp: string
  timerContainerStyle?: ViewStyle
}

const CountTimer = ({timeStamp, timerContainerStyle}: Props) => {
  const triggerRef = useRef<React.ElementRef<typeof TooltipTrigger>>(null)
  const insets = useSafeAreaInsets()
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  }
  const calculateTimeLeft = () => {
    const targetTime = new Date(timeStamp).getTime()
    const currentTime = new Date(new Date().toUTCString()).getTime()
    return targetTime - currentTime
  }

  const [timeLeft, setTimeLeft] = useState<number>(calculateTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = calculateTimeLeft()
      setTimeLeft(remaining)
      if (remaining <= 0) {
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [timeStamp])

  const formatTime = (timeInMs: number) => {
    const days = Math.floor(timeInMs / (1000 * 60 * 60 * 24))
    const hours = Math.floor(timeInMs / (1000 * 60 * 60))
    const minutes = Math.floor((timeInMs % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((timeInMs % (1000 * 60)) / 1000)

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }
  if (timeLeft <= 0) {
    return
  }

  return (
    <>
      <Pressable
        className="absolute top-0 right-0 w-16 h-16 active:bg-stone-200"
        onPress={() => {
          // open programmatically
          triggerRef.current?.open()
        }}
      />
      <Tooltip delayDuration={150}>
        <TooltipTrigger ref={triggerRef} asChild>
          <TouchableOpacity>
            <View
              className={cn(
                'bg-stone-100 px-2 py-1 rounded-md',
                timerContainerStyle,
              )}>
              <Text className="text-timer">{formatTime(timeLeft)}</Text>
            </View>
          </TouchableOpacity>
        </TooltipTrigger>
        <TooltipContent insets={contentInsets}>
          <Text>Your call will start in:</Text>
        </TooltipContent>
      </Tooltip>
    </>
  )
}

export default memo(CountTimer)
