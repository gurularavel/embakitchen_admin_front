import * as React from 'react'
import { DeleteOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Col, Form, FormProps, Input, Row, Space, Upload } from 'antd'
import {
  Loading,
  RenderIf,
  ErrorMessage,
  FormGroup,
} from '~ek/shared/components'
import { NOTIFICATION } from '~ek/shared/const/constants'
import {
  beforeUploadHandler,
  createFormData,
  handleFileData,
  handleRemoveFile,
  notifier,
  pick,
} from '~ek/shared/helpers'
import {
  useGetAboutQuery,
  usePostOrCreateAboutMutation,
} from '~ek/redux/api/about'
import { useFileRemoveMutation } from '~ek/redux/api/fileRemove'
import { RichTextEditor } from '~ek/shared/components/richtext'
import type { IAbout } from '~ek/types/about'

type FormField = Omit<IAbout<IFile>, 'id'>

export function AboutContent(): React.ReactElement {
  const [image, setImage] = React.useState<IFile>({
    file: [],
    fileList: [],
  })
  const [video, setVideo] = React.useState<IFile>({
    file: [],
    fileList: [],
  })
  const [contentRichText, setContentRichText] = React.useState<ILangContent>({
    az: '',
    ru: '',
    en: '',
  })

  const { data, isLoading, isError } = useGetAboutQuery()
  const [postAbout, { isLoading: postLoading }] = usePostOrCreateAboutMutation()
  const [deleteFile] = useFileRemoveMutation()

  const initialValues = pick({
    source: data as IAbout,
    fields: ['title', 'content', 'counter_info', 'solutions'],
  })

  React.useEffect(() => {
    handleFileData(data?.image as IFileProperties[], setImage)
    handleFileData(data?.video as IFileProperties[], setVideo)
    setContentRichText(() => ({
      az: data?.content.az as string,
      en: data?.content.en as string,
      ru: data?.content.ru as string,
    }))
  }, [data])

  const handleRichContent = (field: 'az' | 'ru' | 'en', content: string) => {
    setContentRichText(prevState => ({ ...prevState, [field]: content }))
  }

  const onFinish: FormProps<FormField>['onFinish'] = async (
    values: FormField,
  ) => {
    const formValues = {
      ...values,
      content: contentRichText,
      image: image.file,
      video: video.file,
    }
    const formData = createFormData(formValues)

    try {
      await postAbout(formData).unwrap()
      notifier('Dəyişiklik uğurla icra edildi.', NOTIFICATION.success)
    } catch (error) {
      console.error(error)
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
          name='about_form'
          layout='vertical'
          onFinish={onFinish}
          className='ml-auto mr-auto'
          initialValues={initialValues}
        >
          <Row
            gutter={24}
            style={{ flexFlow: 'column' }}
          >
            <FormGroup>
              <Form.Item<FormField>
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
                  onRemove={file =>
                    handleRemoveFile(deleteFile, file, setImage)
                  }
                >
                  <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
              </Form.Item>
            </FormGroup>

            <FormGroup>
              <Row gutter={16}>
                <Col
                  xs={24}
                  md={12}
                  lg={8}
                >
                  <Form.Item<FormField>
                    label='Başlıq(az)'
                    name={['title', 'az']}
                    rules={[
                      {
                        required: true,
                        message: 'Zəhmət olmasa boş saxlamayın',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col
                  xs={24}
                  md={12}
                  lg={8}
                >
                  <Form.Item
                    label='Başlıq(en)'
                    name={['title', 'en']}
                    rules={[
                      {
                        required: true,
                        message: 'Zəhmət olmasa boş saxlamayın',
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col
                  xs={24}
                  md={12}
                  lg={8}
                >
                  <Form.Item<FormField>
                    label='Başlıq(ru)'
                    name={['title', 'ru']}
                    rules={[
                      {
                        required: true,
                        message: 'Zəhmət olmasa boş saxlamayın',
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </FormGroup>

            <FormGroup>
              <Row gutter={16}>
                <Col
                  xs={24}
                  md={12}
                  lg={8}
                >
                  <Form.Item<FormField>
                    label='Sayğac başlığı(az)'
                    name={['counter_info', 'az']}
                    rules={[
                      {
                        required: true,
                        message: 'Zəhmət olmasa boş saxlamayın',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col
                  xs={24}
                  md={12}
                  lg={8}
                >
                  <Form.Item
                    label='Sayğac başlığı(en)'
                    name={['counter_info', 'en']}
                    rules={[
                      {
                        required: true,
                        message: 'Zəhmət olmasa boş saxlamayın',
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col
                  xs={24}
                  md={12}
                  lg={8}
                >
                  <Form.Item<FormField>
                    label='Sayğac başlığı(ru)'
                    name={['counter_info', 'ru']}
                    rules={[
                      {
                        required: true,
                        message: 'Zəhmət olmasa boş saxlamayın',
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </FormGroup>

            <FormGroup>
              <Row gutter={16}>
                <Col
                  xs={24}
                  md={12}
                  lg={8}
                >
                  <Form.Item<FormField>
                    label='Həllər başlığı(az)'
                    name={['solutions', 'title', 'az']}
                    rules={[
                      {
                        required: true,
                        message: 'Zəhmət olmasa boş saxlamayın',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col
                  xs={24}
                  md={12}
                  lg={8}
                >
                  <Form.Item
                    label='Həllər başlığı(en)'
                    name={['solutions', 'title', 'en']}
                    rules={[
                      {
                        required: true,
                        message: 'Zəhmət olmasa boş saxlamayın',
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col
                  xs={24}
                  md={12}
                  lg={8}
                >
                  <Form.Item<FormField>
                    label='Həllər başlığı(ru)'
                    name={['solutions', 'title', 'ru']}
                    rules={[
                      {
                        required: true,
                        message: 'Zəhmət olmasa boş saxlamayın',
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.List name={['solutions', 'options']}>
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <Row
                            key={key}
                            gutter={16}
                          >
                            <Col
                              xs={24}
                              md={12}
                              lg={6}
                            >
                              <Form.Item
                                label='Həllərə nümunə(az)'
                                name={[name, 'az']}
                                rules={[
                                  {
                                    required: true,
                                    message: 'Zəhmət olmasa boş saxlamayın',
                                  },
                                ]}
                                {...restField}
                              >
                                <Input />
                              </Form.Item>
                            </Col>
                            <Col
                              xs={24}
                              md={12}
                              lg={6}
                            >
                              <Form.Item
                                label='Həllərə nümunə(en)'
                                name={[name, 'en']}
                                rules={[
                                  {
                                    required: true,
                                    message: 'Zəhmət olmasa boş saxlamayın',
                                  },
                                ]}
                                {...restField}
                              >
                                <Input />
                              </Form.Item>
                            </Col>
                            <Col
                              xs={24}
                              md={12}
                              lg={6}
                            >
                              <Form.Item
                                label='Həllərə nümunə(ru)'
                                name={[name, 'ru']}
                                rules={[
                                  {
                                    required: true,
                                    message: 'Zəhmət olmasa boş saxlamayın',
                                  },
                                ]}
                                {...restField}
                              >
                                <Input />
                              </Form.Item>
                            </Col>
                            <Col
                              xs={24}
                              md={12}
                              lg={6}
                              style={{
                                display: 'flex',
                                alignItems: 'flex-end',
                              }}
                            >
                              <Form.Item
                                label=''
                                style={{ flex: '1 100%' }}
                              >
                                <Button
                                  color='danger'
                                  variant='outlined'
                                  onClick={() => remove(name)}
                                  block
                                >
                                  <DeleteOutlined />
                                  Sil
                                </Button>
                              </Form.Item>
                            </Col>
                          </Row>
                        ))}
                        <Form.Item>
                          <Button
                            color='primary'
                            variant='outlined'
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                          >
                            Əlavə et
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Col>
              </Row>
            </FormGroup>

            <FormGroup>
              <Row gutter={16}>
                <Col xs={24}>
                  <Form.Item<FormField>
                    name={['content', 'az']}
                    label='Kontent (az)'
                    rules={[
                      {
                        required: true,
                        validator: () => {
                          return contentRichText.az.trim().length > 0
                            ? Promise.resolve()
                            : Promise.reject(
                              'Zəhmət olmasa mətn daxil edin(az)',
                            )
                        },
                      },
                    ]}
                  >
                    <RichTextEditor
                      onChangeValue={data => handleRichContent('az', data)}
                      editorData={contentRichText.az}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item<FormField>
                    name={['content', 'en']}
                    label='Kontent (en)'
                    rules={[
                      {
                        required: true,
                        validator: () => {
                          return contentRichText.en.trim().length > 0
                            ? Promise.resolve()
                            : Promise.reject(
                              'Zəhmət olmasa mətn daxil edin(en)',
                            )
                        },
                      },
                    ]}
                  >
                    <RichTextEditor
                      onChangeValue={data => handleRichContent('en', data)}
                      editorData={contentRichText.en}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item<FormField>
                    name={['content', 'ru']}
                    label='Kontent (ru)'
                    rules={[
                      {
                        required: true,
                        validator: () => {
                          return contentRichText.ru.trim().length > 0
                            ? Promise.resolve()
                            : Promise.reject(
                              'Zəhmət olmasa mətn daxil edin(ru)',
                            )
                        },
                      },
                    ]}
                  >
                    <RichTextEditor
                      onChangeValue={data => handleRichContent('ru', data)}
                      editorData={contentRichText.ru}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </FormGroup>

            <FormGroup>
              <Form.Item<FormField>
                name='video'
                label='Upload Video'
                valuePropName='video'
              >
                <Upload
                  name='video'
                  accept='video/*'
                  maxCount={1}
                  listType='picture'
                  beforeUpload={file => beforeUploadHandler(file, setVideo)}
                  fileList={video.fileList}
                  onRemove={file =>
                    handleRemoveFile(deleteFile, file, setVideo)
                  }
                >
                  <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
              </Form.Item>
            </FormGroup>

            <Form.Item wrapperCol={{ span: 12 }}>
              <Space>
                <Button
                  disabled={postLoading}
                  loading={postLoading}
                  type='primary'
                  htmlType='submit'
                >
                  Submit
                </Button>
              </Space>
            </Form.Item>
          </Row>
        </Form>
      </RenderIf>
    </>
  )
}
