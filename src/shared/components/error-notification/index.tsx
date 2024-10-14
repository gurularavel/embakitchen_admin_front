import { notification } from 'antd'

export const errorNotifier = (message?: string) => {
  const notificationKey = 'singleErrorNotification'

  notification.error({
    key: notificationKey,
    message: 'Error',
    description: message || 'An error occurred',
    placement: 'topRight',
    duration: 2,
  })
}
