import * as React from 'react'
import {
  Button,
  Col,
  Form,
  FormProps,
  Input,
  Row,
  Space,
  Upload,
  UploadFile,
} from 'antd'
import { ErrorMessage, Loading, RenderIf } from '~ek/shared/components'
import {
  beforeUploadHandler,
  createFormData,
  handleFileData,
  handleRemoveFile,
  notifier,
} from '~ek/shared/helpers'
import {
  useGetHomeInfoQuery,
  usePostHomeInfoMutation,
} from '~ek/redux/api/home/common-info'
import { useFileRemoveMutation } from '~ek/redux/api/fileRemove'
import { PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { FormGroup } from '~ek/shared/components/form-group'
import type { IHomeInfo } from '~ek/types/home/common-info'
import { NOTIFICATION } from '~ek/shared/const/constants'

interface AntFile {
  uid: string
  name: string
  url: string
}

type IFieldForm = Omit<IHomeInfo, 'id'> & {
  infoArray: {
    title: ILangContent
    content: ILangContent
    icon: AntFile[]
  }[]
}

export function HomeCommonInfo() {
  const [form] = Form.useForm<IFieldForm>()
  const [createOrderImage, setCreateOrderImage] = React.useState<IFile>({
    file: [],
    fileList: [],
  })
  const [video, setVideo] = React.useState<IFile>({
    file: [],
    fileList: [],
  })
  const [styleImage, setStyleImage] = React.useState<IFile>({
    file: [],
    fileList: [],
  })
  const { data, isLoading, isError } = useGetHomeInfoQuery()
  const [postHome, { isLoading: postLoading }] = usePostHomeInfoMutation()
  const [deleteFile] = useFileRemoveMutation()

  React.useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
        infoArray: data.infoArray.map(info => ({
          ...info,
          icon: [
            {
              uid: info.icon?.split('/').pop(),
              name: info.icon?.split('/').pop(),
              url: info.icon,
            },
          ],
        })),
      })
    }
    handleFileData(
      data?.createOrderImage as IFileProperties[],
      setCreateOrderImage,
    )
    handleFileData(data?.video as IFileProperties[], setVideo)
    handleFileData(data?.styleImage as IFileProperties[], setStyleImage)
  }, [data, form])

  const onFinish: FormProps<IFieldForm>['onFinish'] = async (
    values: IFieldForm,
  ) => {
    const formValues = {
      ...values,
      createOrderImage: createOrderImage.file,
      video: video.file,
      styleImage: styleImage.file,
    }

    const formData = createFormData(formValues)
    try {
      await postHome(formData).unwrap()
      notifier('Dəyişiklik uğurla icra edildi', NOTIFICATION.success)
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
          form={form}
          name='home-common-info'
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          onFinish={onFinish}
          className='ml-auto mr-auto'
        >
          <FormGroup title='Video Section'>
            <Row gutter={16}>
              <Col
                xs={24}
                md={12}
                lg={8}
              >
                <Form.Item<IFieldForm>
                  label='Başlıq(az)'
                  name={['videoSection', 'title', 'az']}
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
                <Form.Item<IFieldForm>
                  label='Başlıq(en)'
                  name={['videoSection', 'title', 'en']}
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
                <Form.Item<IFieldForm>
                  label='Başlıq(ru)'
                  name={['videoSection', 'title', 'ru']}
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
                <Form.Item<IFieldForm>
                  label='Kontent(az)'
                  name={['videoSection', 'content', 'az']}
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
                <Form.Item<IFieldForm>
                  label='Kontent(en)'
                  name={['videoSection', 'content', 'en']}
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
                <Form.Item<IFieldForm>
                  label='Kontent(ru)'
                  name={['videoSection', 'content', 'ru']}
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
                <Form.Item<IFieldForm>
                  name='video'
                  label='Ana səhifə video'
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
                    <Button icon={<UploadOutlined />}>Yüklə</Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.List name='infoArray'>
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name }) => (
                        <FormGroup key={key}>
                          <Row gutter={16}>
                            <Col
                              xs={24}
                              md={12}
                              lg={8}
                            >
                              <Form.Item
                                name={[name, 'title', 'az']}
                                label='Başlıq(az)'
                                rules={[
                                  {
                                    required: true,
                                    message: 'Zəhmət olmasa boş saxlamayın',
                                    whitespace: true,
                                  },
                                ]}
                              >
                                <Input placeholder='Title' />
                              </Form.Item>
                            </Col>
                            <Col
                              xs={24}
                              md={12}
                              lg={8}
                            >
                              <Form.Item
                                name={[name, 'title', 'en']}
                                label='Başlıq(en)'
                                rules={[
                                  {
                                    required: true,
                                    message: 'Zəhmət olmasa boş saxlamayın',
                                    whitespace: true,
                                  },
                                ]}
                              >
                                <Input placeholder='Title' />
                              </Form.Item>
                            </Col>
                            <Col
                              xs={24}
                              md={12}
                              lg={8}
                            >
                              <Form.Item
                                name={[name, 'title', 'ru']}
                                label='Başlıq(ru)'
                                rules={[
                                  {
                                    required: true,
                                    message: 'Zəhmət olmasa boş saxlamayın',
                                    whitespace: true,
                                  },
                                ]}
                              >
                                <Input placeholder='Title' />
                              </Form.Item>
                            </Col>
                            <Col
                              xs={24}
                              md={12}
                              lg={8}
                            >
                              <Form.Item
                                name={[name, 'content', 'az']}
                                label='Kontent (az)'
                                rules={[
                                  {
                                    required: true,
                                    message: 'Zəhmət olmasa boş saxlamayın',
                                    whitespace: true,
                                  },
                                ]}
                              >
                                <Input placeholder='Content (AZ)' />
                              </Form.Item>
                            </Col>
                            <Col
                              xs={24}
                              md={12}
                              lg={8}
                            >
                              <Form.Item
                                name={[name, 'content', 'en']}
                                label='Kontent (en)'
                                rules={[
                                  {
                                    required: true,
                                    message: 'Zəhmət olmasa boş saxlamayın',
                                    whitespace: true,
                                  },
                                ]}
                              >
                                <Input placeholder='Content (EN)' />
                              </Form.Item>
                            </Col>
                            <Col
                              xs={24}
                              md={12}
                              lg={8}
                            >
                              <Form.Item
                                name={[name, 'content', 'ru']}
                                label='Kontent (ru)'
                                rules={[
                                  {
                                    required: true,
                                    message: 'Zəhmət olmasa boş saxlamayın',
                                    whitespace: true,
                                  },
                                ]}
                              >
                                <Input placeholder='Content (RU)' />
                              </Form.Item>
                            </Col>
                            <Col
                              xs={24}
                              md={12}
                            >
                              <Form.Item
                                name={[name, 'icon']}
                                label='Icon'
                                valuePropName='fileList'
                                getValueFromEvent={e => {
                                  const fileList = Array.isArray(e)
                                    ? e
                                    : e?.fileList
                                  return fileList?.map(
                                    (fileItem: UploadFile) =>
                                      fileItem.originFileObj || fileItem,
                                  )
                                }}
                                rules={[
                                  {
                                    required: true,
                                    validator: (_, value) =>
                                      value && value.length > 0
                                        ? Promise.resolve()
                                        : Promise.reject(
                                          new Error(
                                            'Zəhmət olmasa şəkil yükləyin',
                                          ),
                                        ),
                                  },
                                ]}
                              >
                                <Upload
                                  accept='image/*'
                                  listType='picture'
                                  maxCount={1}
                                >
                                  <Button icon={<UploadOutlined />}>
                                    Upload Icon
                                  </Button>
                                </Upload>
                              </Form.Item>
                            </Col>
                            <Col
                              xs={24}
                              md={12}
                              className='flex justify-end items-center'
                            >
                              <Button
                                color='danger'
                                variant='solid'
                                onClick={() => remove(name)}
                              >
                                Bölməni sil
                              </Button>
                            </Col>
                          </Row>
                        </FormGroup>
                      ))}
                      <Col span={24}>
                        <Form.Item>
                          <Button
                            className='w-100'
                            color='primary'
                            variant='outlined'
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                          >
                            Video info əlavə et
                          </Button>
                        </Form.Item>
                      </Col>
                    </>
                  )}
                </Form.List>
              </Col>
            </Row>
          </FormGroup>
          <FormGroup title='Sifariş Yarat Ana Səhifə'>
            <Row gutter={16}>
              <Col
                xs={24}
                md={12}
                lg={8}
              >
                <Form.Item<IFieldForm>
                  label='Sifariş yarat başlıq(az)'
                  name={['createOrderSection', 'title', 'az']}
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
                <Form.Item<IFieldForm>
                  label='Sifariş yarat başlıq(en)'
                  name={['createOrderSection', 'title', 'en']}
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
                <Form.Item<IFieldForm>
                  label='Sifariş yarat başlıq(ru)'
                  name={['createOrderSection', 'title', 'ru']}
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
                <Form.Item<IFieldForm>
                  label='Sifariş yarat kontent(az)'
                  name={['createOrderSection', 'content', 'az']}
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
                <Form.Item<IFieldForm>
                  label='Sifariş yarat kontent(en)'
                  name={['createOrderSection', 'content', 'en']}
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
                <Form.Item<IFieldForm>
                  label='Sifariş yarat kontent(ru)'
                  name={['createOrderSection', 'content', 'ru']}
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
                <Form.Item<IFieldForm>
                  name='createOrderImage'
                  label='Sifariş yarat banner'
                  valuePropName='createOrderImage'
                  rules={[
                    {
                      required: true,
                      validator: () =>
                        createOrderImage.fileList.length > 0
                          ? Promise.resolve()
                          : Promise.reject(
                            new Error('Zəhmət olmasa şəkil yükləyin!'),
                          ),
                    },
                  ]}
                >
                  <Upload
                    name='createOrderImage'
                    accept='image/*'
                    maxCount={1}
                    listType='picture'
                    beforeUpload={file =>
                      beforeUploadHandler(file, setCreateOrderImage)
                    }
                    fileList={createOrderImage.fileList}
                    onRemove={file =>
                      handleRemoveFile(deleteFile, file, setCreateOrderImage)
                    }
                  >
                    <Button icon={<UploadOutlined />}>Yüklə</Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
          </FormGroup>
          <FormGroup title='Sifariş mərhələləri'>
            <Col
              md={12}
              xs={24}
            >
              <Form.Item<IFieldForm>
                name='styleImage'
                label='Sifariş mərhələsi banner'
                valuePropName='styleImage'
                rules={[
                  {
                    required: true,
                    validator: () =>
                      styleImage.fileList.length > 0
                        ? Promise.resolve()
                        : Promise.reject(
                          new Error('Zəhmət olmasa şəkil yükləyin!'),
                        ),
                  },
                ]}
              >
                <Upload
                  name='styleImage'
                  accept='image/*'
                  maxCount={1}
                  listType='picture'
                  beforeUpload={file =>
                    beforeUploadHandler(file, setStyleImage)
                  }
                  fileList={styleImage.fileList}
                  onRemove={file =>
                    handleRemoveFile(deleteFile, file, setStyleImage)
                  }
                >
                  <Button icon={<UploadOutlined />}>Yüklə</Button>
                </Upload>
              </Form.Item>
            </Col>
            <Form.List name='styleArray'>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name }) => (
                    <FormGroup key={key}>
                      <Row gutter={16}>
                        <Col
                          xs={24}
                          md={12}
                          lg={8}
                        >
                          <Form.Item
                            name={[name, 'title', 'az']}
                            label='Mərhələ başlığı(az)'
                            rules={[
                              {
                                required: true,
                                message: 'Zəhmət olmasa boş saxlamayın',
                                whitespace: true,
                              },
                            ]}
                          >
                            <Input placeholder='Title' />
                          </Form.Item>
                        </Col>
                        <Col
                          xs={24}
                          md={12}
                          lg={8}
                        >
                          <Form.Item
                            name={[name, 'title', 'en']}
                            label='Mərhələ başlığı(en)'
                            rules={[
                              {
                                required: true,
                                message: 'Zəhmət olmasa boş saxlamayın',
                                whitespace: true,
                              },
                            ]}
                          >
                            <Input placeholder='Title' />
                          </Form.Item>
                        </Col>
                        <Col
                          xs={24}
                          md={12}
                          lg={8}
                        >
                          <Form.Item
                            name={[name, 'title', 'ru']}
                            label='Mərhələ başlığı(ru)'
                            rules={[
                              {
                                required: true,
                                message: 'Zəhmət olmasa boş saxlamayın',
                                whitespace: true,
                              },
                            ]}
                          >
                            <Input placeholder='Title' />
                          </Form.Item>
                        </Col>
                        <Col
                          xs={24}
                          md={12}
                          lg={8}
                        >
                          <Form.Item
                            name={[name, 'content', 'az']}
                            label='Mərhələ kontenti (az)'
                            rules={[
                              {
                                required: true,
                                message: 'Zəhmət olmasa boş saxlamayın',
                                whitespace: true,
                              },
                            ]}
                          >
                            <Input placeholder='Content (AZ)' />
                          </Form.Item>
                        </Col>
                        <Col
                          xs={24}
                          md={12}
                          lg={8}
                        >
                          <Form.Item
                            name={[name, 'content', 'en']}
                            label='Mərhələ kontenti (en)'
                            rules={[
                              {
                                required: true,
                                message: 'Zəhmət olmasa boş saxlamayın',
                                whitespace: true,
                              },
                            ]}
                          >
                            <Input placeholder='Content (EN)' />
                          </Form.Item>
                        </Col>
                        <Col
                          xs={24}
                          md={12}
                          lg={8}
                        >
                          <Form.Item
                            name={[name, 'content', 'ru']}
                            label='Mərhələ kontenti (ru)'
                            rules={[
                              {
                                required: true,
                                message: 'Zəhmət olmasa boş saxlamayın',
                                whitespace: true,
                              },
                            ]}
                          >
                            <Input placeholder='Content (RU)' />
                          </Form.Item>
                        </Col>
                        <Col
                          span={24}
                          className='flex justify-end items-center'
                        >
                          <Button
                            color='danger'
                            variant='solid'
                            onClick={() => remove(name)}
                          >
                            Bölməni sil
                          </Button>
                        </Col>
                      </Row>
                    </FormGroup>
                  ))}
                  <Col span={24}>
                    <Form.Item>
                      <Button
                        className='w-100'
                        color='primary'
                        variant='outlined'
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Sifariş mərhələsi əlavə et
                      </Button>
                    </Form.Item>
                  </Col>
                </>
              )}
            </Form.List>
          </FormGroup>

          <Form.Item>
            <Space className='flex justify-end'>
              <Button
                disabled={postLoading}
                type='primary'
                htmlType='submit'
              >
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </RenderIf>
    </>
  )
}
