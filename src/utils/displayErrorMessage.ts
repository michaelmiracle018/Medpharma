import {toast} from 'sonner-native'

export function displayErrorMessage(error: any) {
  const errorMessage = error?.response?.data?.message
  toast.dismiss()
  if (error?.response?.data?.name === 'TokenExpiredError') {
    toast.error('Session expired, please login to continue.')
    return
  }

  if (
    errorMessage === 'Invalid token' ||
    errorMessage === 'Invalid parameters' ||
    errorMessage.includes('Unauthorized')
  ) {
    return
  }
  if (error?.message.includes('Network Error')) {
    toast.error('An error occurred, please try again!')
  } else {
    toast.error(`${errorMessage}`)
  }
}
