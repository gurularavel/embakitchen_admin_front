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
import { NOTIFICATION } from '~ek/shared/const/constants'
import { ISlider } from '~ek/types/home/slider'
import { UploadOutlined } from '@ant-design/icons'
import { confirmModal, notifier } from '~ek/shared/helpers'
import { useFileRemoveMutation } from '~ek/redux/api/fileRemove'
import { useEditSliderMutation } from '~ek/redux/api/home/slider'

interface IDrawerProps {
  open: boolean
  onClose: () => void
  slider: ISlider
}

interface IFieldForm {
  title: ILangContent
  excerpt: ILangContent
  image: IFile
  status: boolean
}

export function EditSlider({
  open,
  onClose,
  slider,
}: IDrawerProps): React.ReactElement {
  const { token } = theme.useToken()
  const [form] = Form.useForm()
  const [switchChecked, setSwitchChecked] = React.useState<boolean>(
    slider.status,
  )
  const [image, setImage] = React.useState<IFile>({
    file: null,
    fileList: [],
  })

  const [editSlider, { isLoading }] = useEditSliderMutation()
  const [deleteFile] = useFileRemoveMutation()

  const formStyle: React.CSSProperties = {
    maxWidth: 'none',
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  }

  React.useEffect(() => {
    if (slider?.image && typeof slider.image === 'object') {
      const imageKeys = Object.keys(slider.image)
      if (imageKeys.length > 0) {
        const firstImageKey = imageKeys[0]
        const imageData = slider.image[firstImageKey]

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
  }, [slider])

  const initialValues = {
    title: {
      az: slider.title.az,
      en: slider.title.en,
      ru: slider.title.ru,
    },
    excerpt: {
      az: slider.excerpt.az,
      en: slider.excerpt.en,
      ru: slider.excerpt.ru,
    },
    status: slider.status,
    id: slider.id,
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
    confirmModal({
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
    formData.append('excerpt[az]', data.excerpt.az)
    formData.append('excerpt[en]', data.excerpt.en)
    formData.append('excerpt[ru]', data.excerpt.ru)
    formData.append('status', data.status ? '1' : '0')
    formData.append('_method', 'PUT')
    if (image.file) formData.append('image', image.file)

    try {
      await editSlider({ id: slider.id, formData })
      onClose()
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : 'An unexpected error occurred'
      notifier(errorMessage, NOTIFICATION.error)
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
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col
            xs={24}
            sm={12}
            md={8}
          >
            <Form.Item<IFieldForm>
              name={['excerpt', 'az']}
              label='Alt başlıq(az)'
              rules={[
                {
                  required: true,
                  message: 'Zəhmət olmasa alt başlıq əlavə edin(az)',
                },
              ]}
            >
              <Input placeholder='Alt başlıq(az)' />
            </Form.Item>
          </Col>
          <Col
            xs={24}
            sm={12}
            md={8}
          >
            <Form.Item<IFieldForm>
              name={['excerpt', 'en']}
              label='Alt başlıq(en)'
              rules={[
                {
                  required: true,
                  message: 'Zəhmət olmasa alt başlıq əlavə edin(en)',
                },
              ]}
            >
              <Input placeholder='Alt başlıq(en)' />
            </Form.Item>
          </Col>
          <Col
            xs={24}
            sm={12}
            md={8}
          >
            <Form.Item<IFieldForm>
              name={['excerpt', 'ru']}
              label='Alt başlıq(ru)'
              rules={[
                {
                  required: true,
                  message: 'Zəhmət olmasa alt başlıq əlavə edin(ru)',
                },
              ]}
            >
              <Input placeholder='Alt başlıq(ru)' />
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
