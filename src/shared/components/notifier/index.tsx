import { notification } from 'antd'

export const Notifier = (error: IError, type?: string) => {
  const notificationKey = 'singleErrorNotification'

  notification.error({
    key: notificationKey,
    message: type || 'error',
    description: error.message || 'An error occurred',
    placement: 'topRight',
    duration: 2,
  })
}
