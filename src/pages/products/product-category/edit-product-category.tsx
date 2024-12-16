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
import { createFormData, notifier } from '~ek/shared/helpers'
import { NOTIFICATION } from '~ek/shared/const/constants'
import type { ICategory } from '~ek/types/product'
import { useEditCategoryMutation } from '~ek/redux/api/product/product-category'
import { useFormStyle } from '~ek/shared/utilities/formStyles'
import type { UploadFile } from 'antd/lib'
import { UploadOutlined } from '@ant-design/icons'

interface IDrawerProps {
  open: boolean
  onClose: () => void
  category: ICategory
}

type IFieldForm = Omit<ICategory, 'id'>

export function EditCategory({
  open,
  onClose,
  category,
}: IDrawerProps): React.ReactElement {
  const [form] = Form.useForm()
  const formStyle = useFormStyle()
  const [switchChecked, setSwitchChecked] = React.useState<boolean>(
    category.status,
  )

  const [editCategory, { isLoading }] = useEditCategoryMutation()

  React.useEffect(() => {
    form.setFieldsValue({
      title: category.title,
      status: category.status,
      bannerImage: category.bannerImage?.map(image => ({
        uid: image?.uuid,
        name: image?.name,
        url: image?.original_url,
      })),
    })
  }, [category, form])

  const handleSwitchChange = (checked: boolean) => {
    setSwitchChecked(checked)
    form.setFieldsValue({ status: checked })
  }

  const handleSubmit: FormProps<IFieldForm>['onFinish'] = async (
    data: IFieldForm,
  ) => {
    try {
      const formValues = {
        ...data,
        _method: 'PUT',
        status: switchChecked ? '1' : '0',
      }
      const formData = createFormData(formValues)
      await editCategory({ id: category.id, formData }).unwrap()
      notifier('Dəyişiklik uğurla icra olundu', NOTIFICATION.success)
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
        style={formStyle}
      >
        <Row gutter={16}>
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
          <Col
            xs={24}
            sm={12}
          >
            <Form.Item<ICategory>
              name='bannerImage'
              label='Əsas şəkil'
              valuePropName='fileList'
              getValueFromEvent={e => {
                const fileList = Array.isArray(e) ? e : e?.fileList
                return fileList?.map(
                  (fileItem: UploadFile) => fileItem.originFileObj || fileItem,
                )
              }}
              rules={[
                {
                  required: true,
                  validator: (_, value) =>
                    value && value.length > 0
                      ? Promise.resolve()
                      : Promise.reject(
                        new Error('Zəhmət olmasa şəkil yükləyin'),
                      ),
                },
              ]}
            >
              <Upload
                name='bannerImage'
                accept='image/*'
                listType='picture'
              >
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
          </Col>
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
