import * as React from 'react'
import {
  Button,
  Col,
  Drawer,
  Form,
  FormProps,
  Input,
  Row,
  Space,
  Upload,
} from 'antd'
import { Loading, RenderIf } from '~ek/shared/components'
import {
  beforeUploadHandler,
  createFormData,
  notifier,
} from '~ek/shared/helpers'
import { NOTIFICATION } from '~ek/shared/const/constants'
import type { IFormSlider } from '~ek/types/home/slider'
import { UploadOutlined } from '@ant-design/icons'
import { usePostSliderMutation } from '~ek/redux/api/home/slider'
import { useFormStyle } from '~ek/shared/utilities/formStyles'

interface IDrawerProps {
  open: boolean
  onClose: () => void
}

export function AddSlider({ open, onClose }: IDrawerProps): React.ReactElement {
  const [form] = Form.useForm()
  const formStyle = useFormStyle()
  const [addSlider, { isLoading }] = usePostSliderMutation()
  const [image, setImage] = React.useState<IFile>({
    file: [],
    fileList: [],
  })

  const initialValues = {
    title: {
      az: '',
      en: '',
      ru: '',
    },
    excerpt: {
      az: '',
      en: '',
      ru: '',
    },
  }

  const onFinish: FormProps<IFormSlider>['onFinish'] = async (
    values: IFormSlider,
  ) => {
    const formValues = {
      ...values,
      image: image.file,
    }
    const formData = createFormData(formValues)
    try {
      await addSlider(formData).unwrap()
      notifier('Dəyişiklik uğurla icra edildi', NOTIFICATION.success)
      onClose()
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : 'An unexpected error occurred'
      notifier(errorMessage, NOTIFICATION.error)
    }
  }
  return (
    <Drawer
      title='Yeni Sldier'
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
        initialValues={initialValues}
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
            <Form.Item<IFormSlider>
              name={['title', 'az']}
              label='Başlıq(az)'
              rules={[
                {
                  required: true,
                  whitespace: true,
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
            <Form.Item<IFormSlider>
              name={['title', 'en']}
              label='Başlıq(en)'
              rules={[
                {
                  required: true,
                  whitespace: true,
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
            <Form.Item<IFormSlider>
              name={['title', 'ru']}
              label='Başlıq(ru)'
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: 'Zəhmət olmasa başlıq əlavə edin(ru)',
                },
              ]}
            >
              <Input placeholder='Başlıq(ru)' />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16 }}>
          <Col
            xs={24}
            sm={12}
            md={8}
          >
            <Form.Item<IFormSlider>
              name={['excerpt', 'az']}
              label='Alt başlıq(az)'
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: 'Zəhmət olmasa başlıq əlavə edin(az)',
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
            <Form.Item<IFormSlider>
              name={['excerpt', 'en']}
              label='Alt başlıq(en)'
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: 'Zəhmət olmasa başlıq əlavə edin(en)',
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
            <Form.Item<IFormSlider>
              name={['excerpt', 'ru']}
              label='Alt başlıq(ru)'
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: 'Zəhmət olmasa başlıq əlavə edin(ru)',
                },
              ]}
            >
              <Input placeholder='Alt başlıq(ru)' />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col
            xs={24}
            sm={12}
          >
            <Form.Item<IFormSlider>
              name='image'
              label='Slider Image (1920x600)'
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
                beforeUpload={file => beforeUploadHandler(file, setImage)}
                fileList={image.fileList}
                onRemove={() => setImage({ file: [], fileList: [] })}
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
