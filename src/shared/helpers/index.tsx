import dayjs from 'dayjs'
import { Modal, notification, UploadFile } from 'antd'
import { NOTIFICATION } from '~ek/shared/const/constants'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useFileRemoveMutation } from '~ek/redux/api/fileRemove'

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
      file: [],
      fileList: fileList,
    })
  }
}

export const createFormData = (formValues: object): FormData => {
  const formData = new FormData()

  Object.entries(formValues).forEach(([key, value]) => {
    if (Array.isArray(value) && (key === 'image' || key === 'video')) {
      value.forEach(file => {
        formData.append(key, file)
      })
    } else if (typeof value === 'object') {
      Object.entries(value).forEach(([subKey, subValue]) => {
        formData.append(`${key}[${subKey}]`, subValue as string | Blob)
      })
    } else {
      formData.append(`${key}`, value)
    }
  })

  return formData
}

export const beforeUploadHandler = (
  file: File,
  setFileState: React.Dispatch<React.SetStateAction<IFile>>,
) => {
  setFileState({
    file: [file],
    fileList: [{ uid: file.name, name: file.name, status: 'done' }],
  })
  return false
}

type DeleteFileMutationTrigger = ReturnType<typeof useFileRemoveMutation>[0]
export const handleRemoveFile = async (
  deleteFile: DeleteFileMutationTrigger,
  file: UploadFile,
  setFileState: React.Dispatch<React.SetStateAction<IFile>>,
) => {
  confirmModal({
    title: 'Bu faylı silmək istədiyinizdən əminsiniz?',
    onOk: async () => {
      await deleteFile({ mediaIDS: [file.uid] }).unwrap()
      setFileState({ file: [], fileList: [] })
    },
    onCancel: () => {},
  })
}
