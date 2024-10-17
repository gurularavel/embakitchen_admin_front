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
  theme,
  Upload,
} from 'antd'
import { Loading, Notifier, RenderIf } from '~ek/shared/components'
import { usePostPartnerMutation } from '~ek/redux/api/home/partner'
import { NOTIFICATION } from '~ek/shared/const/constants'
import { IFormPartner } from '~ek/types/home/partners'
import { UploadOutlined } from '@ant-design/icons'

interface IDrawerProps {
  open: boolean
  onClose: () => void
}

export function AddPartnerDrawer({
  open,
  onClose,
}: IDrawerProps): React.ReactElement {
  const { token } = theme.useToken()
  const [addPartner, { isLoading }] = usePostPartnerMutation()
  const [form] = Form.useForm()
  const [image, setImage] = React.useState<IFile>({
    file: null,
    fileList: [],
  })

  const formStyle: React.CSSProperties = {
    maxWidth: 'none',
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  }

  const beforeUpload = (file: File, type: string) => {
    if (type === 'image') {
      setImage({
        file,
        fileList: [{ uid: file.name, name: file.name, status: 'done' }],
      })
    }
    return false
  }

  const onFinish: FormProps<IFormPartner>['onFinish'] = async (
    values: IFormPartner,
  ) => {
    if (image.file?.size === 0 || !image.fileList.length) {
      message.error('Please select image first!')
      return
    }

    const formData = new FormData()
    formData.append('title[az]', values.title.az)
    formData.append('title[en]', values.title.en)
    formData.append('title[ru]', values.title.ru)

    if (image.file) formData.append('image', image.file)

    try {
      await addPartner(formData).unwrap()
      Notifier('Dəyişiklik uğurla icra edildi', 'success')
      onClose()
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : 'An unexpected error occurred'
      Notifier(errorMessage, NOTIFICATION.error)
    }
  }
  return (
    <Drawer
      title='Yeni Tərəfdaş'
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
        onFinish={onFinish}
        style={formStyle}
      >
        <RenderIf condition={isLoading}>
          <Loading />
        </RenderIf>
        <Row gutter={{ xs: 8, sm: 16 }}>
          <Col
            xs={24}
            sm={12}
            md={8}
          >
            <Form.Item<IFormPartner>
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
            <Form.Item<IFormPartner>
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
            <Form.Item<IFormPartner>
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
        <Row>
          <Col
            xs={24}
            sm={12}
          >
            <Form.Item<IFormPartner>
              name='image'
              label='Partner Image'
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
                beforeUpload={file => beforeUpload(file, 'image')}
                fileList={image.fileList}
                onRemove={() => setImage({ file: null, fileList: [] })}
              >
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  )
}
