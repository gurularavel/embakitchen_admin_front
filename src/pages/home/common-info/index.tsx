/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react'
import { Button, Col, Form, FormProps, Input, Space, Upload } from 'antd'
import { ErrorMessage, Loading, RenderIf } from '~ek/shared/components'
import {
  beforeUploadHandler,
  handleFileData,
  handleRemoveFile,
} from '~ek/shared/helpers'
import {
  useGetHomeInfoQuery,
  usePostHomeInfoMutation,
} from '~ek/redux/api/home/common-info'
import { useFileRemoveMutation } from '~ek/redux/api/fileRemove'
import { UploadOutlined } from '@ant-design/icons'
import { FormPartial } from '~ek/shared/components/form-part'

interface IFieldForm {
  title: ILangContent
  videoSection: ILangContent
  createOrderSection: ITitleContent
  video: IFile
  createOrderImage?: IFile
  styleImage: IFile
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
    if (data?.homePage) {
      form.setFieldsValue({
        title: data?.homePage.title,
        createOrderSection: {
          title: data?.homePage.createOrderSection.title,
          content: data?.homePage.createOrderSection.content,
        },
      })
    }
    handleFileData(
      data?.homePage.createOrderImage as IFileProperties[],
      setCreateOrderImage,
    )
    handleFileData(data?.homePage.video as IFileProperties[], setVideo)
    handleFileData(
      data?.homePage.styleImage as IFileProperties[],
      setStyleImage,
    )
  }, [data])

  const onFinish: FormProps<IFieldForm>['onFinish'] = async (
    values: IFieldForm,
  ) => {
     
    const formValues = {
      ...values,
      createOrderImage: createOrderImage.file,
      video: video.file,
      styleImage: styleImage.file,
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
          <FormPartial title='Ana səhifə başlıq'>
            <Col
              xs={24}
              sm={12}
              md={8}
            >
              <Form.Item<IFieldForm>
                label='Başlıq(az)'
                name={['title', 'az']}
                rules={[
                  { required: true, message: 'Zəhmət olmasa boş saxlamayın' },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col
              xs={24}
              sm={12}
              md={8}
            >
              <Form.Item<IFieldForm>
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
              sm={12}
              md={8}
            >
              <Form.Item<IFieldForm>
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
          </FormPartial>
          <FormPartial title='Video Section'>
            <Col
              xs={24}
              sm={12}
              md={8}
            >
              <Form.Item<IFieldForm>
                label='Başlıq(az)'
                name={['title', 'az']}
                rules={[
                  { required: true, message: 'Zəhmət olmasa boş saxlamayın' },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col
              xs={24}
              sm={12}
              md={8}
            >
              <Form.Item<IFieldForm>
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
              sm={12}
              md={8}
            >
              <Form.Item<IFieldForm>
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
            <Col
              xs={24}
              sm={12}
              md={8}
            >
              <Form.Item<IFieldForm>
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
            </Col>
          </FormPartial>
          <FormPartial title='Sifariş Yarat Ana Səhifə'>
            <Col
              xs={24}
              sm={12}
              md={8}
            >
              <Form.Item<IFieldForm>
                name='createOrderImage'
                label='Sifariş et banner'
                valuePropName='video'
              >
                <Upload
                  name='createOrderImage'
                  accept='image/*'
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
            </Col>
          </FormPartial>

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Space>
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
