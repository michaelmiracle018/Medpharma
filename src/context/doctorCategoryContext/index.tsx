/* eslint-disable @typescript-eslint/no-empty-object-type */
import React, {useState} from 'react'

const DoctorCategoryContext = React.createContext<{
  selectDoctor: string | null
}>({
  selectDoctor: 'All',
})

const DoctorCatgoryControlContext = React.createContext<{
  setSelectDoctor: (value: string | null) => void
}>({
  setSelectDoctor: () => {},
})

export function Provider({children}: React.PropsWithChildren<{}>) {
  const [selectDoctor, setSelectDoctor] = useState<string | null>('All')

  const state = React.useMemo(
    () => ({
      selectDoctor,
    }),
    [selectDoctor],
  )

  const methods = React.useMemo(
    () => ({
      setSelectDoctor,
    }),
    [setSelectDoctor],
  )

  return (
    <DoctorCategoryContext.Provider value={state}>
      <DoctorCatgoryControlContext.Provider value={methods}>
        {children}
      </DoctorCatgoryControlContext.Provider>
    </DoctorCategoryContext.Provider>
  )
}

export function useDotorCategorySelector() {
  return React.useContext(DoctorCategoryContext)
}

export function useDotorCategorySelectorControl() {
  return React.useContext(DoctorCatgoryControlContext)
}
