import type { AppLinkData } from './types'
import { faBullseye, faCalendarDays, faHome, faMountain, faTrophy } from '@fortawesome/free-solid-svg-icons'

export const navLinks: AppLinkData[] = [
  { icon: faHome, to: '/dashboard', label: 'Dashboard' },
  { icon: faCalendarDays, to: '/checkIns', label: 'Check Ins' },
  { icon: faMountain, to: '/milestones', label: 'Milestones' },
  { icon: faBullseye, to: '/goals', label: 'Goals' },
  { icon: faTrophy, to: '/achievements', label: 'Achievements' },
]
