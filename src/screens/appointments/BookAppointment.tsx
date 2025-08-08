import React, {useEffect, useMemo, useRef, useState} from 'react'
import {
  IAppointment as OriginalIAppointment,
  TimeSlotPicker,
} from '@dgreasi/react-native-time-slot-picker'
import {useNavigation} from '@react-navigation/native'
import {View} from 'react-native'
import BackIcon from '~/components/BackIcon'
import ScreenWrapperWithScrollView from '~/components/ScreenWrapperWithScrollView'
import {statusBarHeight} from '~/lib/platform/detection'
import {cn} from '~/lib/utils'
import {
  CommonNavigatorParams,
  NativeStackScreenProps,
  NavigationAuthProp,
} from '~/types/navigationTypes'
import {bookedData} from '~/utils/slotData'
import {Controller, useForm} from 'react-hook-form'
import {Button} from '~/components/ui/button'
import {Text} from '~/components/ui/text'
import {Textarea} from '~/components/ui/textarea'
import {Label} from '@rn-primitives/dropdown-menu'
import InputErrorMessage from '~/components/inputErrorMessage/InputErrorMessage'
import {useMutation, useQuery} from '@tanstack/react-query'
import {
  serviceBookAppointment,
  serviceGetAppointmentAvailable,
} from '~/services/doctor.services'
import {FETCH_APPOINTMENT_AVAILABLE} from '~/query-data/querykeys'
import {SelectedTimeSlot} from './SelectedTimeSlot'
import {ContentLoader} from '~/components/loader/ContentLoader'
import {Input} from '~/components/ui/input'
import {toast} from 'sonner-native'
import {IBookAppointment} from '~/types'
import {useRefreshOnFocus} from '~/hooks/useRefreshOnFocus'

// ----- types -----
interface Slot {
  _id: string
  doctorId: string
  slotStart: string // ISO string
  slotEnd: string // ISO string
  status: string
  patientId: string | null
  __v: number
}

interface IAppointment extends OriginalIAppointment {
  slotId: string
  appointmentDate: string
  appointmentTime: string
}

interface AvailableDate {
  date: string // ISO date string for the day (midnight)
  slotTimes: string[] // "HH:MM-HH:MM"
}

interface IFormInputs {
  email: string
  firstName: string
  lastName: string
}

// ----- component -----
export const BookAppointment = ({
  route,
}: NativeStackScreenProps<CommonNavigatorParams, 'BookAppointment'>) => {
  const {id} = route.params
  const navigation = useNavigation<NavigationAuthProp>()

  // state (renamed setter to avoid prop collision)
  const [selectedAppointment, setSelectedAppointment] =
    useState<IAppointment | null>(null)

  const {
    isLoading: isFetchingAvailableSlots,
    data: availableSlots,
    isRefetching: isRefetchingAvailableSlots,
    refetch: refetchAvailableSlots,
  } = useQuery({
    queryKey: [FETCH_APPOINTMENT_AVAILABLE, id],
    queryFn: () => serviceGetAppointmentAvailable(id),
    enabled: !!id,
  })

  const timeToIdMap = useRef<Record<string, string>>({})

  const autoSelectedRef = useRef(false)

  const formatTimeLabel = (isoDate: string) =>
    new Date(isoDate).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })

  const slotsArray: Slot[] = useMemo(() => {
    if (!availableSlots) return []
    if (Array.isArray(availableSlots)) return availableSlots as Slot[]
    if (Array.isArray((availableSlots as any).data))
      return (availableSlots as any).data
    if (Array.isArray((availableSlots as any).slots))
      return (availableSlots as any).slots
    // fallback: unknown shape
    return []
  }, [availableSlots])

  // Build availableDates for the picker and populate timeToIdMap
  const availableDates: AvailableDate[] = useMemo(() => {
    timeToIdMap.current = {} // reset map

    if (!slotsArray || slotsArray.length === 0) return []

    const now = Date.now()

    // keep only future WAITING slots and sort by start time
    const futureSlots = slotsArray
      .filter(s => {
        const end = new Date(s.slotEnd).getTime()
        return end > now && String(s.status).toUpperCase() === 'WAITING'
      })
      .sort(
        (a, b) =>
          new Date(a.slotStart).getTime() - new Date(b.slotStart).getTime(),
      )

    // group by UTC date (YYYY-MM-DD)
    const grouped = futureSlots.reduce<Record<string, Slot[]>>((acc, s) => {
      const dateKey = new Date(s.slotStart).toISOString().split('T')[0] // YYYY-MM-DD (UTC)
      acc[dateKey] = acc[dateKey] || []
      acc[dateKey].push(s)
      return acc
    }, {})

    // map to picker format; build keys in multiple shapes for robust lookup
    return Object.keys(grouped)
      .sort()
      .map(dateKey => {
        const daySlots = grouped[dateKey].sort(
          (a, b) =>
            new Date(a.slotStart).getTime() - new Date(b.slotStart).getTime(),
        )

        const isoMidnight = new Date(`${dateKey}T00:00:00.000Z`).toISOString()

        const slotTimes = daySlots.map(s => {
          const startLabel = formatTimeLabel(s.slotStart)
          const endLabel = formatTimeLabel(s.slotEnd)
          const label = `${startLabel}-${endLabel}`
          const localDateKey = new Date(s.slotStart).toISOString().split('T')[0]

          timeToIdMap.current[`${dateKey}_${label}`] = s._id
          timeToIdMap.current[`${isoMidnight}_${label}`] = s._id
          timeToIdMap.current[`${localDateKey}_${label}`] = s._id

          return label
        })

        return {date: isoMidnight, slotTimes}
      })
  }, [slotsArray])

  // When slots load, auto-select the first available slot (only once)
  useEffect(() => {
    if (isFetchingAvailableSlots || isRefetchingAvailableSlots) return
    if (autoSelectedRef.current) return // already auto-selected once
    if (!availableDates || availableDates.length === 0) return

    // get first date & time
    const firstDateISO = availableDates[0].date // ISO midnight
    const firstTime = availableDates[0].slotTimes?.[0]
    if (!firstDateISO || !firstTime) return

    // try to find slotId
    const dateKey = firstDateISO.split('T')[0] // YYYY-MM-DD
    const slotId =
      timeToIdMap.current[`${dateKey}_${firstTime}`] ||
      timeToIdMap.current[`${firstDateISO}_${firstTime}`] ||
      timeToIdMap.current[
        `${new Date(firstDateISO).toISOString().split('T')[0]}_${firstTime}`
      ]

    if (slotId) {
      autoSelectedRef.current = true
      setSelectedAppointment({
        appointmentDate: firstDateISO,
        appointmentTime: firstTime,
        slotId,
      } as IAppointment)
    }
  }, [availableDates, isFetchingAvailableSlots, isRefetchingAvailableSlots])

  // handler for TimeSlotPicker selection — robust mapping with fallback search
  const handlePickerSelect = (
    data: {
      appointmentDate?: string | null
      appointmentTime?: string | null
    } | null,
  ) => {
    // picker may pass `null` (user cleared selection) — handle it
    if (!data || !data.appointmentDate || !data.appointmentTime) {
      // user cleared the selection = set state null (but don't re-auto-select)
      setSelectedAppointment(null)
      autoSelectedRef.current = true // don't auto-select again after user clears
      return
    }

    const isoAppointmentDate = data.appointmentDate
    const appointmentDateKey = isoAppointmentDate.split('T')[0]
    const timeLabel = data.appointmentTime

    // try direct lookup (several key shapes)
    let slotId =
      timeToIdMap.current[`${appointmentDateKey}_${timeLabel}`] ||
      timeToIdMap.current[`${isoAppointmentDate}_${timeLabel}`]

    // fallback search: find matching slot in slotsArray
    if (!slotId) {
      const found = slotsArray.find(s => {
        const sDate = new Date(s.slotStart).toISOString().split('T')[0]
        const label = `${formatTimeLabel(s.slotStart)}-${formatTimeLabel(s.slotEnd)}`
        return sDate === appointmentDateKey && label === timeLabel
      })
      slotId = found?._id
    }
    if (!slotId) {
      setSelectedAppointment({
        appointmentDate: isoAppointmentDate,
        appointmentTime: timeLabel,
        slotId: '',
      } as IAppointment)
      return
    }

    // user selected valid slot -> store it
    setSelectedAppointment({
      appointmentDate: isoAppointmentDate,
      appointmentTime: timeLabel,
      slotId,
    } as IAppointment)
  }

  useRefreshOnFocus(refetchAvailableSlots)
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<IFormInputs>({
    defaultValues: {email: '', firstName: '', lastName: ''},
  })

  //  IMPORT QUERIES
  const {mutate, isPending} = useMutation({
    mutationFn: (value: IBookAppointment) => serviceBookAppointment(value),
    onSuccess: async response => {
      console.log(response, 'llll')

      toast.success(`Appointment booked successfully`)
    },
    onError: (error: any) => {
      const {data} = error.response
      toast.error(data?.message || 'An error occurred while booking')
    },
  })

  const onSubmit = (vals: IFormInputs) => {
    mutate({...vals, slotId: selectedAppointment?.slotId})
  }

  return (
    <View className="flex-1 bg-white" style={{paddingTop: statusBarHeight}}>
      <View className="mb-5 spacing-1">
        <BackIcon text="Appointment" onPress={() => navigation.goBack()} />
      </View>

      <ScreenWrapperWithScrollView isStatusBarHeight={false}>
        <View className={cn('spacing-1')}>
          {isFetchingAvailableSlots || isRefetchingAvailableSlots ? (
            <View className="flex-center flex-1">
              <ContentLoader />
              <Text>Loading Appointment</Text>
            </View>
          ) : (
            <>
              {availableDates.length === 0 ? (
                <Text className="font-bold text-center text-lg">
                  No available slots
                </Text>
              ) : (
                <TimeSlotPicker
                  availableDates={availableDates}
                  scheduledAppointment={bookedData}
                  setDateOfAppointment={handlePickerSelect}
                />
              )}

              {/* <SelectedTimeSlot dateOfAppointment={selectedAppointment} /> */}

              <View className="mt-5">
                <Label className="mb-2 font-medium text-lg">Email</Label>
                <Controller
                  control={control}
                  rules={{required: 'This field is required.'}}
                  name="email"
                  render={({field: {onChange, onBlur, value}}) => (
                    <Input
                      placeholder="your email"
                      value={value}
                      onBlur={onBlur}
                      onChangeText={text => onChange(text.trim())}
                    />
                  )}
                />
                <InputErrorMessage errors={errors} name="email" />
              </View>
              <View className="mt-5">
                <Label className="mb-2 font-medium text-lg">First Name</Label>
                <Controller
                  control={control}
                  rules={{required: 'This field is required.'}}
                  name="firstName"
                  render={({field: {onChange, onBlur, value}}) => (
                    <Input
                      placeholder="your first name"
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                    />
                  )}
                />
                <InputErrorMessage errors={errors} name="firstName" />
              </View>
              <View className="mt-5">
                <Label className="mb-2 font-medium text-lg">Last Name</Label>
                <Controller
                  control={control}
                  rules={{required: 'This field is required.'}}
                  name="lastName"
                  render={({field: {onChange, onBlur, value}}) => (
                    <Input
                      placeholder="your last name"
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                    />
                  )}
                />
                <InputErrorMessage errors={errors} name="lastName" />
              </View>

              <View className="mb-20 mt-10">
                <Button
                  onPress={handleSubmit(onSubmit)}
                  disabled={!selectedAppointment?.slotId || isPending}>
                  {isPending ? (
                    <ContentLoader />
                  ) : (
                    <Text>
                      {selectedAppointment?.slotId
                        ? 'Book Session'
                        : 'Select a slot'}
                    </Text>
                  )}
                </Button>
              </View>
            </>
          )}
        </View>
      </ScreenWrapperWithScrollView>
    </View>
  )
}
