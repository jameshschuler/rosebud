export interface Activity {
  name: string
  id: number
}

export interface CheckIn {
  id: number
  checkInDate: string
  activity: Activity
}

export type CheckInDisplayItem = Map<string, Map<string, Map<string, { id: number, activity: Activity }[]>>>
