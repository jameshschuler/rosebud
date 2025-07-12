import { Activity, CheckIn } from '@/types/checkIns';
import dayjs from 'dayjs';
import { useMemo } from 'react';

const monthOrder = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function useTransformCheckIns(
  data?: CheckIn[]
) {
  const checkIns = useMemo(() => {
    const checkIns = new Map<
      string,
      Map<string, Map<string, { id: number, activity: Activity }[]>>
    >()

    if (!data) {
      return checkIns
    }

    data.forEach((d) => {
      const date = dayjs(d.checkInDate)
      const year = date.format('YYYY')
      const month = date.format('MMMM')

      if (!checkIns.has(year)) {
        checkIns.set(year, new Map())
      }

      const yearMap = checkIns.get(year)
      const monthCheckIns = yearMap?.get(month)
      if (!monthCheckIns) {
        yearMap?.set(month, new Map([
          [dayjs(d.checkInDate).format('MM-DD-YYYY'), [{ id: d.id, activity: d.activity }]],
        ]))
      }
      else {
        const existingDate = monthCheckIns.get(dayjs(d.checkInDate).format('MM-DD-YYYY'))
        if (existingDate) {
          existingDate.push({ id: d.id, activity: d.activity })
        } else {
          monthCheckIns.set(dayjs(d.checkInDate).format('MM-DD-YYYY'), [{ id: d.id, activity: d.activity }])
        }
      }
    })

    // Iterate over each year's map and sort its months and dates
    checkIns.forEach((yearMap, year) => {
      yearMap.forEach((monthMap, month) => {
        const sortedDateEntries = [...monthMap.entries()].sort((a, b) => {
          const dateStringA = a[0];
          const dateStringB = b[0];

          const dateA = dayjs(dateStringA, 'MM-DD-YYYY');
          const dateB = dayjs(dateStringB, 'MM-DD-YYYY');

          return dateB.valueOf() - dateA.valueOf();
        });

        yearMap.set(month, new Map(sortedDateEntries));
      });

      const sortedMonthEntries = [...yearMap.entries()].sort((a, b) => {
        const monthA = a[0];
        const monthB = b[0];

        return monthOrder.indexOf(monthB) - monthOrder.indexOf(monthA);
      });

      checkIns.set(year, new Map(sortedMonthEntries));
    });

    return checkIns
  }, [data])

  return {
    checkIns,
    hasCheckIns: checkIns.size > 0,
  }
}
