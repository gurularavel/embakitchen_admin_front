import * as React from 'react'
import {
  Button,
  Col,
  Drawer,
  Form,
  FormProps,
  Input,
  message,
  Row,
  Space,
  Switch,
  theme,
  Upload,
  UploadFile,
} from 'antd'
import { useEditPartnerMutation } from '~ek/redux/api/home/partner'
import { Notifier } from '~ek/shared/components'
import { NOTIFICATION } from '~ek/shared/const/constants'
import { IPartner } from '~ek/types/home/partners'
import { UploadOutlined } from '@ant-design/icons'
import { ConfirmModal } from '~ek/shared/helpers'
import { useFileRemoveMutation } from '~ek/redux/api/fileRemove'

interface IDrawerProps {
  open: boolean
  onClose: () => void
  partner: IPartner
}

interface IFieldForm {
  title: ILangContent
  image: IFile
  status: boolean
}

export function EditPartner({
  open,
  onClose,
  partner,
}: IDrawerProps): React.ReactElement {
  const { token } = theme.useToken()
  const [form] = Form.useForm()
  const [switchChecked, setSwitchChecked] = React.useState<boolean>(
    partner.status,
  )
  const [image, setImage] = React.useState<IFile>({
    file: null,
    fileList: [],
  })

  const [editPartner, { isLoading }] = useEditPartnerMutation()
  const [deleteFile] = useFileRemoveMutation()

  const formStyle: React.CSSProperties = {
    maxWidth: 'none',
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  }

  React.useEffect(() => {
    if (partner?.image && typeof partner.image === 'object') {
      const imageKeys = Object.keys(partner.image)
      if (imageKeys.length > 0) {
        const firstImageKey = imageKeys[0]
        const imageData = partner.image[firstImageKey]

        setImage({
          file: null,
          fileList: [
            {
              uid: imageData.uuid,
              name: imageData.file_name,
              status: 'done',
              url: imageData.original_url,
            },
          ],
        })
      }
    }
  }, [partner])

  const initialValues = {
    title: {
      az: partner.title.az,
      en: partner.title.en,
      ru: partner.title.ru,
    },
    status: partner.status,
    id: partner.id,
  }

  const handleSwitchChange = (checked: boolean) => {
    setSwitchChecked(checked)
    form.setFieldsValue({ status: checked })
  }

  const beforeUpload = (file: File) => {
    setImage({
      file,
      fileList: [{ uid: file.name, name: file.name, status: 'done' }],
    })

    return false
  }

  const handleRemoveFile = async (file: UploadFile) => {
    ConfirmModal({
      title: 'Bu faylı silmək istədiyinizdən əminsiniz?',
      onOk: async () => {
        await deleteFile({
          mediaIDS: [file.uid],
        })
        setImage({ file: null, fileList: [] })
      },
      onCancel: () => {},
    })
  }

  const handleSubmit: FormProps<IFieldForm>['onFinish'] = async (
    data: IFieldForm,
  ) => {
    if (image.file?.size === 0 || !image.fileList.length) {
      message.error('Please select image first!')
      return
    }

    const formData = new FormData()
    formData.append('title[az]', data.title.az)
    formData.append('title[en]', data.title.en)
    formData.append('title[ru]', data.title.ru)
    formData.append('status', data.status ? '1' : '0')
    formData.append('_method', 'PUT')
    if (image.file) formData.append('image', image.file)

    try {
      await editPartner({ id: partner.id, formData })
      onClose()
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : 'An unexpected error occurred'
      Notifier(errorMessage, NOTIFICATION.error)
    }
  }

  return (
    <Drawer
      title='Düzəliş'
      onClose={onClose}
      open={open}
      size={'large'}
      footer={
        <Space className='py-4 flex justify-end'>
          <Button
            type='default'
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            disabled={isLoading}
            type='primary'
            onClick={() => form.submit()}
          >
            Submit
          </Button>
        </Space>
      }
    >
      <Form
        layout='vertical'
        form={form}
        onFinish={handleSubmit}
        initialValues={initialValues}
        style={formStyle}
      >
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col
            xs={24}
            sm={12}
            md={8}
          >
            <Form.Item<IFieldForm>
              name={['title', 'az']}
              label='Başlıq(az)'
              rules={[
                {
                  required: true,
                  message: 'Zəhmət olmasa başlıq əlavə edin(az)',
                },
              ]}
            >
              <Input placeholder='Başlıq(az)' />
            </Form.Item>
          </Col>
          <Col
            xs={24}
            sm={12}
            md={8}
          >
            <Form.Item<IFieldForm>
              name={['title', 'en']}
              label='Başlıq(en)'
              rules={[
                {
                  required: true,
                  message: 'Zəhmət olmasa başlıq əlavə edin(en)',
                },
              ]}
            >
              <Input placeholder='Başlıq(en)' />
            </Form.Item>
          </Col>
          <Col
            xs={24}
            sm={12}
            md={8}
          >
            <Form.Item<IFieldForm>
              name={['title', 'ru']}
              label='Başlıq(ru)'
              rules={[
                {
                  required: true,
                  message: 'Zəhmət olmasa başlıq əlavə edin(ru)',
                },
              ]}
            >
              <Input placeholder='Başlıq(ru)' />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Form.Item<IFieldForm>
            name='image'
            label='Banner Photo'
            valuePropName='image'
            rules={[
              {
                required: true,
                validator: () =>
                  image.fileList.length > 0
                    ? Promise.resolve()
                    : Promise.reject(
                      new Error('Zəhmət olmasa image fayl yükləyin!'),
                    ),
              },
            ]}
            getValueFromEvent={e => {
              return e?.fileList
            }}
          >
            <Upload
              name='image'
              accept='image/*'
              maxCount={1}
              listType='picture'
              beforeUpload={file => beforeUpload(file)}
              fileList={image.fileList}
              onRemove={file => handleRemoveFile(file)}
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
          <Col xs={4}>
            <Form.Item<IFieldForm>
              name='status'
              label='Status'
            >
              <Switch
                checked={switchChecked}
                style={{
                  backgroundColor: switchChecked ? '#52c41a' : '#ff4d4f',
                }}
                onChange={checked => handleSwitchChange(checked)}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  )
}
