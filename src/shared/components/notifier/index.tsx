import { notification } from 'antd'
type NotificationType = 'success' | 'info' | 'warning' | 'error'

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
