import type { AppLinkData } from './types'
import { faCalendarDays as faRegularCalendarDays, faFileLines as faRegularFileLines, faHouse as faRegularHouse } from '@fortawesome/free-regular-svg-icons'
import { faBullseye, faCalendarDays, faFileLines, faMountain, faHouse as faSolidHouse, faTrophy } from '@fortawesome/free-solid-svg-icons'

export const navLinks: AppLinkData[] = [
  { activeIcon: faSolidHouse, icon: faRegularHouse, to: '/dashboard', label: 'Dashboard' },
  { activeIcon: faCalendarDays, icon: faRegularCalendarDays, to: '/checkIns', label: 'Check Ins' },
  { activeIcon: faMountain, icon: faMountain, to: '/milestones', label: 'Milestones' },
  { activeIcon: faBullseye, icon: faBullseye, to: '/goals', label: 'Goals' },
  { activeIcon: faTrophy, icon: faTrophy, to: '/achievements', label: 'Achievements' },
  { activeIcon: faFileLines, icon: faRegularFileLines, to: '/programs', label: 'Programs' },
]
