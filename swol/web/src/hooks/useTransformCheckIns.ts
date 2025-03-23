import dayjs from 'dayjs'
import { useMemo } from 'react'

export function useTransformCheckIns(
  data?:
    | {
        id: number
        checkin_date: string
      }[]
    | undefined,
) {
  const checkIns = useMemo(() => {
    const checkIns = new Map<
      string,
      Map<string, { id: number; checkInDate: string }[]>
    >()

    if (!data) {
      return checkIns
    }

    data.forEach((d) => {
      const date = dayjs(d.checkin_date)
      const year = date.format('YYYY')
      const month = date.format('MMMM')

      if (!checkIns.has(year)) {
        checkIns.set(year, new Map())
      }

      const yearMap = checkIns.get(year)
      const monthCheckIns = yearMap?.get(month)
      if (!monthCheckIns) {
        yearMap?.set(month, [
          { id: d.id, checkInDate: dayjs(d.checkin_date).format('MM-DD-YYYY') },
        ])
      } else {
        monthCheckIns.push({
          id: d.id,
          checkInDate: dayjs(d.checkin_date).format('MM-DD-YYYY'),
        })
      }
    })

    return checkIns
  }, [data])

  return {
    checkIns,
    hasCheckIns: checkIns.size > 0,
  }
}
