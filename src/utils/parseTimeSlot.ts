type TimeSlot = {
  date: string
  startTime: string
  endTime: string
}

export function parseTimeSlot(slotStart: string, slotEnd: string): TimeSlot {
  const start = new Date(slotStart)
  const end = new Date(slotEnd)

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short', // e.g., "Fri"
    year: 'numeric',
    month: 'short', // e.g., "Aug"
    day: 'numeric', // e.g., "8"
  }

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }

  return {
    date: start.toLocaleDateString('en-US', dateOptions),
    startTime: start.toLocaleTimeString('en-US', timeOptions),
    endTime: end.toLocaleTimeString('en-US', timeOptions),
  }
}
