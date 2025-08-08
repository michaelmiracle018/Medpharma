import {Toaster} from 'sonner-native'
import {Text} from '../ui/text'
import {
  ToastErrorSign,
  ToastPendingSign,
  ToastSuccessSign,
} from '../orderMessageSign'

export default function Toastify() {
  return (
    <Toaster
      position="bottom-center"
      duration={3000}
      swipeToDismissDirection="up"
      visibleToasts={1}
      autoWiggleOnUpdate="toast-change"
      theme="system"
      icons={{
        error: <ToastErrorSign />,
        loading: <Text>🔄</Text>,
        success: <ToastSuccessSign />,
        warning: <ToastPendingSign />,
      }}
      toastOptions={{
        actionButtonStyle: {
          paddingHorizontal: 20,
        },
      }}
      // ToastWrapper={ToastWrapper}
      pauseWhenPageIsHidden
    />
  )
}
