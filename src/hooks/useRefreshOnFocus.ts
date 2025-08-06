import {useFocusEffect} from '@react-navigation/native'
import {useCallback, useEffect, useRef} from 'react'

export function useRefreshOnFocus(refetch: () => Promise<unknown>) {
  const refetchRef = useRef(refetch)

  useEffect(() => {
    refetchRef.current = refetch
  }, [refetch])

  useFocusEffect(
    useCallback(() => {
      refetchRef.current()
    }, []),
  )
}
