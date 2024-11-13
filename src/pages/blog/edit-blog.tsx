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
  UploadFile,
} from 'antd'
import { Loading, RenderIf } from '~ek/shared/components'
import {
  beforeUploadHandler,
  createFormData,
  handleFileData,
  handleRemoveFile,
  notifier,
} from '~ek/shared/helpers'
import { NOTIFICATION } from '~ek/shared/const/constants'
import { RichTextEditor } from '~ek/shared/components/richtext'
import type { IBlog, IFormBlog } from '~ek/types/blog'
import { UploadOutlined } from '@ant-design/icons'
import { useEditBlogMutation } from '~ek/redux/api/blog'
import { useFileRemoveMutation } from '~ek/redux/api/fileRemove'
import { useFormStyle } from '~ek/shared/utilities/formStyles'

interface IDrawerProps {
  open: boolean
  onClose: () => void
  blog: IBlog
}

export function EditBlog({
  open,
  onClose,
  blog,
}: IDrawerProps): React.ReactElement {
  const { TextArea } = Input
  const formStyle = useFormStyle()
  const [form] = Form.useForm()

  const [editBlog, { isLoading }] = useEditBlogMutation()
  const [deleteFile] = useFileRemoveMutation()

  const [bannerImage, setBannerImage] = React.useState<IFile>({
    file: [],
    fileList: [],
  })
  const [image, setImage] = React.useState<IFile>({
    file: [],
    fileList: [],
  })
  const [contentRichText, setContentRichText] = React.useState<ILangContent>({
    az: blog.content.az,
    ru: blog.content.ru,
    en: blog.content.en,
  })

  React.useEffect(() => {
    handleFileData(blog.image, setBannerImage)
    handleFileData(blog.image2, setImage)
  }, [blog])

  const initialValues = {
    title: {
      az: blog.title.az,
      en: blog.title.en,
      ru: blog.title.ru,
    },
    content: {
      az: blog.content.az,
      en: blog.content.en,
      ru: blog.content.ru,
    },
    content2: {
      az: blog.content2.az,
      en: blog.content2.en,
      ru: blog.content2.ru,
    },
    status: blog.status,
  }

  const handleRichContent = (field: 'az' | 'ru' | 'en', content: string) => {
    setContentRichText(prevState => ({ ...prevState, [field]: content }))
  }

  const onFinish: FormProps<IFormBlog>['onFinish'] = async (
    values: IFormBlog,
  ) => {
    const formValues = {
      ...values,
      content: {
        az: contentRichText.az,
        en: contentRichText.en,
        ru: contentRichText.ru,
      },
      image: bannerImage.file,
      image2: image.file,
      _method: 'PUT',
    }
    const formData = createFormData(formValues)
    try {
      await editBlog({ id: blog.id, formData }).unwrap()
      notifier('Dəyişiklik uğurla icra edildi', NOTIFICATION.success)
      onClose()
    } catch (e: IError | unknown) {
      const error = e as IError
      notifier(error?.data.message, NOTIFICATION.error)
    }
  }

  return (
    <Drawer
      title='Yeni Blog'
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
          <Col>
            <Form.Item<IFormBlog>
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
            <Form.Item<IFormBlog>
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
            <Form.Item<IFormBlog>
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
        <Row style={{ width: '100%' }}>
          <Col xs={24}>
            <Form.Item
              label='Content part1(az)'
              name={['content', 'az']}
              rules={[
                {
                  required: true,
                  validator: () => {
                    return contentRichText.az.trim().length > 0
                      ? Promise.resolve()
                      : Promise.reject('Zəhmət olmasa mətn daxil edin(az)')
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
            <Form.Item
              label='Content part1(en)'
              name={['content', 'en']}
              rules={[
                {
                  required: true,
                  validator: () => {
                    return contentRichText.en.trim().length > 0
                      ? Promise.resolve()
                      : Promise.reject('Zəhmət olmasa mətn daxil edin(en)')
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
            <Form.Item<IFormBlog>
              name={['content', 'ru']}
              label='Content part1(ru)'
              rules={[
                {
                  required: true,
                  validator: () => {
                    return contentRichText.ru.trim().length > 0
                      ? Promise.resolve()
                      : Promise.reject('Zəhmət olmasa mətn daxil edin(ru)')
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
        <Row gutter={{ xs: 8, sm: 16 }}>
          <Col
            xs={24}
            sm={12}
            md={8}
          >
            <Form.Item<IFormBlog>
              name={['content2', 'az']}
              label='Kontent(az)'
            >
              <TextArea
                rows={4}
                placeholder='Kontent(az)'
              />
            </Form.Item>
          </Col>
          <Col
            xs={24}
            sm={12}
            md={8}
          >
            <Form.Item<IFormBlog>
              name={['content2', 'en']}
              label='Kontent(en)'
            >
              <TextArea
                rows={4}
                placeholder='Kontent(en)'
              />
            </Form.Item>
          </Col>
          <Col
            xs={24}
            sm={12}
            md={8}
          >
            <Form.Item<IFormBlog>
              name={['content2', 'ru']}
              label='Kontent(ru)'
            >
              <TextArea
                rows={4}
                placeholder='Kontent(ru)'
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col
            xs={24}
            sm={12}
          >
            <Form.Item<IFormBlog>
              name='image'
              label='Banner Image'
              valuePropName='image'
              rules={[
                {
                  required: true,
                  validator: () =>
                    bannerImage.fileList.length > 0
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
                beforeUpload={file => beforeUploadHandler(file, setBannerImage)}
                fileList={bannerImage.fileList}
                onRemove={(file: UploadFile) =>
                  handleRemoveFile(deleteFile, file, setBannerImage)
                }
              >
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col
            xs={24}
            sm={12}
          >
            <Form.Item<IFormBlog>
              name='image2'
              label='Image'
              valuePropName='image'
              getValueFromEvent={e => {
                return e?.fileList
              }}
            >
              <Upload
                name='image2'
                accept='image/*'
                maxCount={1}
                listType='picture'
                beforeUpload={file => beforeUploadHandler(file, setImage)}
                fileList={image.fileList}
                onRemove={(file: UploadFile) =>
                  handleRemoveFile(deleteFile, file, setImage)
                }
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
