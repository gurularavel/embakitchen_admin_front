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
import { NOTIFICATION } from '~ek/shared/const/constants'
import { createFormData, notifier } from '~ek/shared/helpers'
import type { ICategory } from '~ek/types/product'
import { usePostCategoryMutation } from '~ek/redux/api/product/product-category'
import { useFormStyle } from '~ek/shared/utilities/formStyles'
import type { UploadFile } from 'antd/lib'
import { UploadOutlined } from '@ant-design/icons'

interface IDrawerProps {
  open: boolean
  onClose: () => void
}

export function AddCategory({
  open,
  onClose,
}: IDrawerProps): React.ReactElement {
  const [addCategory, { isLoading }] = usePostCategoryMutation()
  const [form] = Form.useForm()
  const formStyle = useFormStyle()

  const handleSubmit: FormProps<ICategory>['onFinish'] = async (
    data: ICategory,
  ) => {
    const formData = createFormData(data)
    try {
      await addCategory(formData).unwrap()
      notifier('Yeni kateqoriya əlavə edildi', NOTIFICATION.success)
      onClose()
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : 'An unexpected error occurred'
      notifier(errorMessage, NOTIFICATION.error)
    }
  }

  return (
    <Drawer
      title='Yeni kateqoriya'
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
        onFinish={handleSubmit}
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
            <Form.Item<ICategory>
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
            <Form.Item<ICategory>
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
            <Form.Item<ICategory>
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
          <Col
            xs={24}
            sm={12}
          >
            <Form.Item<ICategory>
              name='bannerImage'
              label='Banner şəkil(1900x400)'
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
        </Row>
      </Form>
    </Drawer>
  )
}
