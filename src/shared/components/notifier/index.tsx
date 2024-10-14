import { notification } from 'antd'
type NotificationType = 'success' | 'info' | 'warning' | 'error'

export const Notifier = (error: IError, type: NotificationType = 'error') => {
  const notificationKey = 'singleErrorNotification'

  notification[type]({
    key: notificationKey,
    message: type,
    description: error.message || 'An error occurred',
    placement: 'topRight',
    duration: 2,
  })
}
