import * as React from 'react'
import { Button, Col, Form, FormProps, Input, Row, Space, Upload } from 'antd'
import { ErrorMessage, Loading, RenderIf } from '~ek/shared/components'
import { NOTIFICATION } from '~ek/shared/const/constants'
import { useFormStyle } from '~ek/shared/utilities/formStyles'
import {
  beforeUploadHandler,
  createFormData,
  handleFileData,
  notifier,
  pick,
} from '~ek/shared/helpers'
import type { IBlogPage } from '~ek/types/blog'
import { UploadOutlined } from '@ant-design/icons'
import {
  useEditBlogPageMutation,
  useGetBlogPageQuery,
} from '~ek/redux/api/blog'

export function BlogPage(): React.ReactElement {
  const { data, isError, isLoading } = useGetBlogPageQuery()
  const [editBlogPage, { isLoading: editLoading }] = useEditBlogPageMutation()

  const [form] = Form.useForm()
  const formStyle = useFormStyle()
  const [image, setImage] = React.useState<IFile>({
    file: [],
    fileList: [],
  })

  const initialValues = pick({
    source: data as IBlogPage,
    fields: ['title'],
  })

  React.useEffect(() => {
    handleFileData(data?.image as IFileProperties[], setImage)
  }, [data])

  const handleSubmit: FormProps<IBlogPage>['onFinish'] = async (
    data: IBlogPage,
  ) => {
    const formValues = {
      ...data,
      image: image.file,
    }
    const formData = createFormData(formValues)
    try {
      await editBlogPage(formData).unwrap()
      notifier('Dəyişiklik uğurla icra edildi.', NOTIFICATION.success)
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : 'An unexpected error occurred'
      notifier(errorMessage, NOTIFICATION.error)
    }
  }

  return (
    <>
      <RenderIf condition={isError}>
        <ErrorMessage message='Məlumatların yüklənməsində xəta baş verdi' />
      </RenderIf>
      <RenderIf condition={isLoading}>
        <Loading />
      </RenderIf>
      <RenderIf condition={!isError && !isLoading}>
        <Form
          layout='vertical'
          form={form}
          initialValues={initialValues}
          onFinish={handleSubmit}
          style={formStyle}
        >
          <RenderIf condition={isLoading}>
            <Loading />
          </RenderIf>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item<IBlogPage>
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
            <Col span={8}>
              <Form.Item<IBlogPage>
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
            <Col span={8}>
              <Form.Item<IBlogPage>
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
          <Row>
            <Col span={12}>
              <Form.Item<IBlogPage>
                name='image'
                label='Image'
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
            <Col
              span={12}
              className='flex justify-end items-end'
            >
              <Form.Item wrapperCol={{ span: 12 }}>
                <Space>
                  <Button
                    disabled={editLoading}
                    loading={editLoading}
                    type='primary'
                    htmlType='submit'
                  >
                    Submit
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </RenderIf>
    </>
  )
}
