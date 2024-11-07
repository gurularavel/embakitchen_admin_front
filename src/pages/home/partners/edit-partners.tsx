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
import {
  beforeUploadHandler,
  createFormData,
  handleFileData,
  handleRemoveFile,
  notifier,
} from '~ek/shared/helpers'
import { IPartner } from '~ek/types/home/partners'
import { UploadOutlined } from '@ant-design/icons'
import { useEditPartnerMutation } from '~ek/redux/api/home/partner'
import { useFileRemoveMutation } from '~ek/redux/api/fileRemove'
import { useFormStyle } from '~ek/shared/utilities/formStyles'

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
  const [form] = Form.useForm()
  const formStyle = useFormStyle()
  const [switchChecked, setSwitchChecked] = React.useState<boolean>(
    partner.status,
  )
  const [image, setImage] = React.useState<IFile>({
    file: [],
    fileList: [],
  })

  const [editPartner, { isLoading }] = useEditPartnerMutation()
  const [deleteFile] = useFileRemoveMutation()

  React.useEffect(() => {
    handleFileData(partner.image, setImage)
  }, [partner])

  const initialValues: IPartner = {
    title: {
      az: partner.title.az,
      en: partner.title.en,
      ru: partner.title.ru,
    },
    status: partner.status,
    id: partner.id,
    image: partner.image,
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
      image: image.file,
      status: data.status ? '1' : '0',
      _method: 'PUT',
    }

    const formData = createFormData(formValues)
    try {
      await editPartner({ id: partner.id, formData }).unwrap()
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
