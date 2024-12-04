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
  Switch,
  Upload,
} from 'antd'
import { NOTIFICATION } from '~ek/shared/const/constants'
import type { ISlider } from '~ek/types/home/slider'
import { UploadOutlined } from '@ant-design/icons'
import {
  beforeUploadHandler,
  createFormData,
  handleFileData,
  handleRemoveFile,
  notifier,
} from '~ek/shared/helpers'
import { useFileRemoveMutation } from '~ek/redux/api/fileRemove'
import { useEditSliderMutation } from '~ek/redux/api/home/slider'
import { useFormStyle } from '~ek/shared/utilities/formStyles'

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
  const [form] = Form.useForm()
  const formStyle = useFormStyle()
  const [switchChecked, setSwitchChecked] = React.useState<boolean>(
    slider.status,
  )
  const [image, setImage] = React.useState<IFile>({
    file: [],
    fileList: [],
  })

  const [editSlider, { isLoading }] = useEditSliderMutation()
  const [deleteFile] = useFileRemoveMutation()

  React.useEffect(() => {
    handleFileData(slider.image, setImage)
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

  const handleSubmit: FormProps<IFieldForm>['onFinish'] = async (
    data: IFieldForm,
  ) => {
    const formValues = {
      ...data,
      status: data.status ? '1' : '0',
      _method: 'PUT',
      image: image.file,
    }
    const formData = createFormData(formValues)
    try {
      await editSlider({ id: slider.id, formData })
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
            <Form.Item<IFieldForm>
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
            <Form.Item<IFieldForm>
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
                  whitespace: true,
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
                  whitespace: true,
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
                  whitespace: true,
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
              beforeUpload={file => beforeUploadHandler(file, setImage)}
              fileList={image.fileList}
              onRemove={file => handleRemoveFile(deleteFile, file, setImage)}
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
