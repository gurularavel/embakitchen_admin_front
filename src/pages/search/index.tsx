import * as React from 'react'
import { Button, Col, Form, FormProps, Input, Row, Space, Upload } from 'antd'
import {
  ErrorMessage,
  FormGroup,
  Loading,
  RenderIf,
} from '~ek/shared/components'
import { NOTIFICATION } from '~ek/shared/const/constants'
import { useFormStyle } from '~ek/shared/utilities/formStyles'
import {
  beforeUploadHandler,
  createFormData,
  handleFileData,
  notifier,
  pick,
} from '~ek/shared/helpers'
import type { ISearchPage } from '~ek/types/search'
import { UploadOutlined } from '@ant-design/icons'
import {
  useEditSearchPageMutation,
  useGetSearchPageQuery,
} from '~ek/redux/api/search'

type FormField = Omit<ISearchPage, 'id'>

export function SearchPage(): React.ReactElement {
  const { data, isError, isLoading } = useGetSearchPageQuery()
  const [editSearchPage, { isLoading: editLoading }] =
    useEditSearchPageMutation()

  const [form] = Form.useForm()
  const formStyle = useFormStyle()
  const [image, setImage] = React.useState<IFile>({
    file: [],
    fileList: [],
  })

  const initialValues = pick({
    source: data as FormField,
    fields: ['title'],
  })

  React.useEffect(() => {
    handleFileData(data?.image as IFileProperties[], setImage)
  }, [data])

  const handleSubmit: FormProps<FormField>['onFinish'] = async (
    data: FormField,
  ) => {
    const formValues = {
      ...data,
      image: image.file,
    }
    const formData = createFormData(formValues)
    try {
      await editSearchPage(formData).unwrap()
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

          <Row gutter={[24, 24]}>
            <FormGroup col={24}>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item<FormField>
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
                  <Form.Item<FormField>
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
                  <Form.Item<FormField>
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
            </FormGroup>

            <FormGroup col={24}>
              <Row>
                <Col span={24}>
                  <Form.Item<FormField>
                    name='image'
                    label='Banner şəkli(1900x400)'
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
            </FormGroup>

            <Col
              span={24}
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
