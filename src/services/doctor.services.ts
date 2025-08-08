import {api} from '~/api/api'
import {IBookAppointment} from '~/types'

export function serviceGetAllDoctors() {
  return api.get('appointments')
}

export async function serviceGetAppointmentAvailable(id: string) {
  try {
    const result = await api.get(`appointments/available?doctorId=${id}`)
    if (result) return result?.data
    return null
  } catch (error) {
    throw error
  }
}

export function serviceBookAppointment(data: IBookAppointment) {
  return api.patch(`appointments/${data.slotId}/book`, {
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
  })
}

export function serviceAppointmentQueueInfo(id: string) {
  return api.get(`appointments/${id}/queue-info`)
}

export function serviceAppointmentCancel(id: string) {
  return api.patch(`appointments/${id}/cancel`)
}

export function serviceGetAllAppointment(id: string) {
  return api.get(`appointments/active/${id}`)
}
