import type { IconDefinition } from '@fortawesome/free-solid-svg-icons'

export interface AppLinkData {
  activeIcon: IconDefinition
  icon: IconDefinition
  to: string
  label: string
}
