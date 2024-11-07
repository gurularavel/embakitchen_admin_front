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
import {
  beforeUploadHandler,
  createFormData,
  notifier,
} from '~ek/shared/helpers'
import { NOTIFICATION } from '~ek/shared/const/constants'
import type { IFormBlog } from '~ek/types/blog'
import { UploadOutlined } from '@ant-design/icons'
import { usePostBlogMutation } from '~ek/redux/api/blog'
import { RichTextEditor } from '~ek/shared/components/richtext'
import { useFormStyle } from '~ek/shared/utilities/formStyles'

interface IDrawerProps {
  open: boolean
  onClose: () => void
}

export function AddBlog({ open, onClose }: IDrawerProps): React.ReactElement {
  const [addBlog, { isLoading }] = usePostBlogMutation()
  const [form] = Form.useForm()
  const formStyle = useFormStyle()
  const [bannerImage, setBannerImage] = React.useState<IFile>({
    file: [],
    fileList: [],
  })
  const [image, setImage] = React.useState<IFile>({
    file: [],
    fileList: [],
  })
  const [contentRichText, setContentRichText] = React.useState<ILangContent>({
    az: '',
    ru: '',
    en: '',
  })

  const { TextArea } = Input

  const initialValues = {
    title: {
      az: '',
      en: '',
      ru: '',
    },
    content: {
      az: '',
      en: '',
      ru: '',
    },
    content2: {
      az: '',
      en: '',
      ru: '',
    },
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
    }
    const formData = createFormData(formValues)
    try {
      await addBlog(formData).unwrap()
      notifier('Yeni blog uğurla əlavə edildi', NOTIFICATION.success)
      onClose()
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : 'An unexpected error occurred'
      notifier(errorMessage, NOTIFICATION.error)
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
        onFinish={onFinish}
        initialValues={initialValues}
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
                  whitespace: true,
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
                onRemove={() => setBannerImage({ file: [], fileList: [] })}
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
                onRemove={() => setImage({ file: [], fileList: [] })}
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
