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

function InnerApp() {
  enableFreeze(true)

  return (
    <>
      <SafeAreaProvider
        initialMetrics={initialWindowMetrics}
        className="bg-white">
        <StatusBar style="dark" backgroundColor="#fff" />

        <GestureHandlerRootView className="bg-white flex-1">
          <React.Fragment key={'kkk'}>
            <QueryProvider currentDid={'Jejjj'}>
              <Splash>
                <PortalHost />
                <Toastify />
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
      <InnerApp />
    </>
  )
}
