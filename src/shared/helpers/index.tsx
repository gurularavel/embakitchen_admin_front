import dayjs from 'dayjs'
import { Modal, notification } from 'antd'
import { NOTIFICATION } from '~ek/shared/const/constants'
import { ExclamationCircleOutlined } from '@ant-design/icons'

type ConfirmModalOptions = {
  title: string
  onOk: () => void
  onCancel?: () => void
  okText?: string
  cancelText?: string
  icon?: React.ReactNode
}
export function confirmModal({
  title,
  onOk,
  onCancel,
  okText = 'OK',
  cancelText = 'Cancel',
  icon = <ExclamationCircleOutlined />,
}: ConfirmModalOptions): void {
  Modal.confirm({
    title,
    icon,
    okText,
    cancelText,
    onOk,
    onCancel,
  })
}

type NotificationType = keyof typeof NOTIFICATION
export function notifier(message: string, type: NotificationType = 'error') {
  notification[type]({
    message: type,
    description: message,
    placement: 'topRight',
    duration: 2,
  })
}

export const formatDate = (
  date: dayjs.ConfigType,
  dateFormat: string,
  format: string,
) => dayjs(date, dateFormat).format(format)

export const handleFileData = (
  fileData: IFileProperties[],
  setState: React.Dispatch<React.SetStateAction<IFile>>,
) => {
  if (fileData && fileData.length > 0) {
    const fileList = fileData.map(file => ({
      uid: file.uuid,
      name: file.file_name,
      status: 'done',
      url: file.original_url,
    }))

    setState({
      file: null,
      fileList: fileList,
    })
  }
}
