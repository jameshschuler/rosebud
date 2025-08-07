import type { AppLinkData } from './types'
import { faHome } from '@fortawesome/free-solid-svg-icons'

export const navLinks: AppLinkData[] = [
  { icon: faHome, to: '/dashboard', label: 'Dashboard' },
  { icon: faHome, to: '/checkIns', label: 'Check Ins' },
  { icon: faHome, to: '/milestones', label: 'Milestones' },
  { icon: faHome, to: '/goals', label: 'Goals' },
  { icon: faHome, to: '/achievements', label: 'Achievements' },
]
