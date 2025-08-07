import MainNavigation from './MainNavigation'
import AuthNavigation from './AuthNavigation'
import {useEffect} from 'react'
import {useModalControls} from '~/context/BottomModal'

const AuthorizedNavigation = () => {
  const isUserAuthenticated = false
  const {openModal} = useModalControls()

  if (isUserAuthenticated) {
    return (
      <>
        <MainNavigation />
      </>
    )
  } else {
    return <AuthNavigation />
  }
}

export default function Navigation() {
  return (
    <>
      <AuthorizedNavigation />
    </>
  )
}
