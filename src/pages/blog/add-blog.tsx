import * as React from 'react'
import {
  Button,
  Col,
  Drawer,
  Form,
  FormProps,
  Input,
  Row,
  Select,
  Space,
  Upload,
} from 'antd'
import { FormGroup, Loading, RenderIf } from '~ek/shared/components'
import {
  beforeUploadHandler,
  createFormData,
  notifier,
} from '~ek/shared/helpers'
import { NOTIFICATION } from '~ek/shared/const/constants'
import type { IFormBlog } from '~ek/types/blog'
import { UploadOutlined } from '@ant-design/icons'
import { useGetBlogsQuery, usePostBlogMutation } from '~ek/redux/api/blog'
import { RichTextEditor } from '~ek/shared/components/richtext'
import { useFormStyle } from '~ek/shared/utilities/formStyles'

interface IDrawerProps {
  open: boolean
  onClose: () => void
}

export function AddBlog({ open, onClose }: IDrawerProps): React.ReactElement {
  const { data } = useGetBlogsQuery({
    page: 1,
  })
  const options = data?.data?.map(d => ({ value: d.id, label: d.title.az }))
  const [addBlog, { isLoading }] = usePostBlogMutation()
  const [form] = Form.useForm()
  const formStyle = useFormStyle()
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
    similar_post_ids: [],
  }

  const handleRichContent = (field: 'az' | 'ru' | 'en', content: string) => {
    setContentRichText(prevState => ({ ...prevState, [field]: content }))
  }

  const onFinish: FormProps<IFormBlog>['onFinish'] = async (
    values: IFormBlog,
  ) => {
    const formValues = {
      ...values,
      content: contentRichText,
      image: image.file,
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
            loading={isLoading}
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

        <Row gutter={[16, 16]}>
          <FormGroup col={24}>
            <Row gutter={16}>
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

          <FormGroup col={24}>
            <Row gutter={{ xs: 8, sm: 16 }}>
              <Col
                xs={24}
                sm={12}
                md={8}
              >
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
          </FormGroup>

          <FormGroup col={24}>
            <Row gutter={{ xs: 8, sm: 16 }}>
              <Col
                xs={24}
                sm={12}
                md={24}
              >
                <Form.Item<IFormBlog>
                  name={['similar_post_ids']}
                  label='Oxşar bloqları seçin'
                >
                  <Select
                    mode='multiple'
                    style={{ width: '100%' }}
                    placeholder='Oxşar bloqları seçin'
                    options={options || []}
                    optionRender={option => <Space>{option.label}</Space>}
                  />
                </Form.Item>
              </Col>
            </Row>
          </FormGroup>

          <FormGroup col={24}>
            <Row gutter={{ xs: 8, sm: 16 }}>
              <Col
                xs={24}
                sm={12}
                md={8}
              >
                <Form.Item<IFormBlog>
                  name={['description', 'az']}
                  label='Qısa məzmun(az)'
                >
                  <TextArea
                    rows={4}
                    placeholder='Qısa məzmun(az)'
                  />
                </Form.Item>
              </Col>
              <Col
                xs={24}
                sm={12}
                md={8}
              >
                <Form.Item<IFormBlog>
                  name={['description', 'en']}
                  label='Qısa məzmun(en)'
                >
                  <TextArea
                    rows={4}
                    placeholder='Qısa məzmun(en)'
                  />
                </Form.Item>
              </Col>
              <Col
                xs={24}
                sm={12}
                md={8}
              >
                <Form.Item<IFormBlog>
                  name={['description', 'ru']}
                  label='Qısa məzmun(ru)'
                >
                  <TextArea
                    rows={4}
                    placeholder='Qısa məzmun(ru)'
                  />
                </Form.Item>
              </Col>
            </Row>
          </FormGroup>

          <FormGroup col={24}>
            <Row gutter={16}>
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
          </FormGroup>
        </Row>
      </Form>
    </Drawer>
  )
}
