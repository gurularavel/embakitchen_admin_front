import { notification } from 'antd'
import { NOTIFICATION } from '~ek/shared/const/constants'

type NotificationType = keyof typeof NOTIFICATION

export const Notifier = (message: string, type: NotificationType = 'error') => {
  const notificationKey = 'singleErrorNotification'

  notification[type]({
    key: notificationKey,
    message: type,
    description: message,
    placement: 'topRight',
    duration: 2,
  })
}
