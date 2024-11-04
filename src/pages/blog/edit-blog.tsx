import * as React from 'react'
import {
  Button,
  Col,
  Drawer,
  Form,
  FormProps,
  Input,
  message,
  Row,
  Space,
  theme,
  Upload,
  UploadFile,
} from 'antd'
import { Loading, RenderIf } from '~ek/shared/components'
import { confirmModal, handleFileData, notifier } from '~ek/shared/helpers'
import { NOTIFICATION } from '~ek/shared/const/constants'
import { RichTextEditor } from '~ek/shared/components/richtext'
import type { IBlog, IFormBlog } from '~ek/types/blog'
import { UploadOutlined } from '@ant-design/icons'
import { useEditBlogMutation } from '~ek/redux/api/blog'
import { useFileRemoveMutation } from '~ek/redux/api/fileRemove'

interface IDrawerProps {
  open: boolean
  onClose: () => void
  blog: IBlog
}

type IFileType = 'bannerImage' | 'contentFile'

export function EditBlog({
  open,
  onClose,
  blog,
}: IDrawerProps): React.ReactElement {
  const { token } = theme.useToken()
  const { TextArea } = Input

  const formStyle: React.CSSProperties = {
    maxWidth: 'none',
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  }

  const [editBlog, { isLoading }] = useEditBlogMutation()
  const [deleteFile] = useFileRemoveMutation()

  const [form] = Form.useForm()
  const [bannerImage, setBannerImage] = React.useState<IFile>({
    file: null,
    fileList: [],
  })
  const [image, setImage] = React.useState<IFile>({
    file: null,
    fileList: [],
  })
  const [contentRichText, setContentRichText] = React.useState<ILangContent>({
    az: blog.content.az,
    ru: blog.content.ru,
    en: blog.content.en,
  })

  React.useEffect(() => {
    handleFileData(blog.image, setBannerImage)
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
    id: blog.id,
  }

  const beforeUpload = (file: File, type: string) => {
    if (type === 'bannerImage') {
      setBannerImage({
        file,
        fileList: [{ uid: file.name, name: file.name, status: 'done' }],
      })
    }
    if (type === 'image') {
      setImage({
        file,
        fileList: [{ uid: file.name, name: file.name, status: 'done' }],
      })
    }
    return false
  }

  const handleRichContent = (field: 'az' | 'ru' | 'en', content: string) => {
    setContentRichText(prevState => ({ ...prevState, [field]: content }))
  }

  const handleRemoveFile = async (file: UploadFile, fileType: IFileType) => {
    confirmModal({
      title: 'Bu faylı silmək istədiyinizdən əminsiniz?',
      onOk: async () => {
        await deleteFile({
          mediaIDS: [file.uid],
        })
        if (fileType === 'bannerImage')
          setBannerImage({ file: null, fileList: [] })
        if (fileType === 'contentFile') setImage({ file: null, fileList: [] })
      },
      onCancel: () => {},
    })
  }

  const onFinish: FormProps<IFormBlog>['onFinish'] = async (
    values: IFormBlog,
  ) => {
    if (bannerImage.file?.size === 0 || !bannerImage.fileList.length) {
      message.error('Please select image first!')
      return
    }

    const formData = new FormData()
    formData.append('title[az]', values.title.az)
    formData.append('title[en]', values.title.en)
    formData.append('title[ru]', values.title.ru)
    formData.append('content[az]', contentRichText.az)
    formData.append('content[en]', contentRichText.en)
    formData.append('content[ru]', contentRichText.ru)
    formData.append('_method', 'PUT')
    if (values.content2.az) formData.append('content2[az]', values.content2.az)
    if (values.content2.en) formData.append('content2[en]', values.content2.en)
    if (values.content2.ru) formData.append('content2[ru]', values.content2.ru)
    if (bannerImage.file) formData.append('image', bannerImage.file)
    if (image.file) formData.append('image2', image.file)

    try {
      await editBlog({ id: blog.id, formData }).unwrap()
      notifier('Dəyişiklik uğurla icra edildi', 'success')
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
                beforeUpload={file => beforeUpload(file, 'bannerImage')}
                fileList={bannerImage.fileList}
                onRemove={file => handleRemoveFile(file, 'bannerImage')}
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
                beforeUpload={file => beforeUpload(file, 'image')}
                fileList={image.fileList}
                onRemove={file => handleRemoveFile(file, 'contentFile')}
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
