import { faCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { notifications } from '@mantine/notifications'

interface NotificationConfig {
  message: string
  title?: string
}

export function useNotifications() {
  const success = ({ message, title = 'Success!' }: NotificationConfig) => {
    notifications.show({
      title,
      message,
      color: 'green',
      icon: <FontAwesomeIcon icon={faCheck} />,
      withBorder: true,
      autoClose: 2000,
      radius: 'md',
    })
  }

  const error = ({ message, title = 'Error!' }: NotificationConfig) => {
    notifications.show({
      title,
      message,
      color: 'red',
      icon: <FontAwesomeIcon icon={faCircleExclamation} />,
      withBorder: true,
      autoClose: 2000,
      radius: 'md',
    })
  }

  return {
    error,
    success,
  }
}
