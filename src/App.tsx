import {enableFreeze} from 'react-native-screens'
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context'
import {StatusBar} from 'expo-status-bar'
import '../global.css'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import Splash from './lib/Splash'

import React from 'react'
import {PortalHost} from '@rn-primitives/portal'
import {QueryProvider} from './query-data/react-query'
// import {BottomSheetDetachModalsContainer} from './bottomSheetModals/DetachModal'
import Toastify from './components/Toast/Toastify'
import '../reanimatedConfig'
import AllNavigation from './navigation/AllNavigation'
import Navigation from './navigation/Navigation'
import {Provider as DoctorCategoryProvider} from './context/doctorCategoryContext/index'
import {BottomSheetDetachModalsContainer} from './bottomSheetModals/DetachModal'
import {Provider as DetachModalStateProvider} from './context/DetachModal'
import {Provider as PortalProvider} from './bottomSheetModals/Portal'
import {BottomSheetProvider} from './bottomSheetModals/BottomSheetPortal'

function InnerApp() {
  enableFreeze(true)

  return (
    <>
      <SafeAreaProvider
        initialMetrics={initialWindowMetrics}
        className="bg-white">
        <GestureHandlerRootView className="bg-white flex-1">
          <React.Fragment key={'kkk'}>
            <QueryProvider currentDid={'Jejjj'}>
              <Splash>
                <AllNavigation>
                  <Navigation />
                  <BottomSheetDetachModalsContainer />

                  <PortalHost />
                  <Toastify />
                </AllNavigation>
              </Splash>
            </QueryProvider>
          </React.Fragment>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </>
  )
}

export default function App() {
  return (
    <>
      <DoctorCategoryProvider>
        <DetachModalStateProvider>
          <PortalProvider>
            <BottomSheetProvider>
              <InnerApp />
            </BottomSheetProvider>
          </PortalProvider>
        </DetachModalStateProvider>
      </DoctorCategoryProvider>
    </>
  )
}
