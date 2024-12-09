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
import type { UploadFile } from 'antd/lib'
import { Loading, RenderIf } from '~ek/shared/components'
import { createFormData, notifier } from '~ek/shared/helpers'
import { NOTIFICATION } from '~ek/shared/const/constants'
import type { IEditProjectForm, IFormProject } from '~ek/types/project'
import { UploadOutlined } from '@ant-design/icons'
import {
  useGetProjectByIdQuery,
  useGetProjectsQuery,
  useEditProjectMutation,
} from '~ek/redux/api/project'
import { useGetTagsQuery } from '~ek/redux/api/tags'
import { useFormStyle } from '~ek/shared/utilities/formStyles'
import { RichTextEditor } from '~ek/shared/components/richtext'
import { useFileRemoveMutation } from '~ek/redux/api/fileRemove'

interface IDrawerProps {
  open: boolean
  onClose: () => void
  project_id: number
}

export function EditProject({
  open,
  onClose,
  project_id,
}: IDrawerProps): React.ReactElement {
  const [form] = Form.useForm()
  const formStyle = useFormStyle()
  const {
    data: fullProjectData,
    isLoading: loadingProjectData,
    refetch,
  } = useGetProjectByIdQuery(project_id)
  const { data: projects } = useGetProjectsQuery({ page: 1 })
  const { data: teqData } = useGetTagsQuery({ page: 1 })
  const [deleteFile] = useFileRemoveMutation()
  const [editProject, { isLoading }] = useEditProjectMutation()
  const [contentRichText, setContentRichText] = React.useState<ILangContent>({
    az: '',
    ru: '',
    en: '',
  })

  React.useEffect(() => {
    if (open) {
      refetch()
    }
  }, [open, refetch])

  const projectsOptions = projects?.data
    .filter(b => b.id !== project_id)
    .map(blog => ({
      value: blog.id,
      label: blog.title.az,
    }))

  const teqOptions = teqData?.data?.map(d => ({
    value: d.id,
    label: d.title.az,
  }))

  React.useEffect(() => {
    if (fullProjectData) {
      form.setFieldsValue({
        similar_project_ids: fullProjectData.similar_projects?.map(
          project => project.id,
        ),
        tag_ids: fullProjectData.tags?.map(tag => tag.id),
        images: fullProjectData.images?.map(image => ({
          uid: image?.uuid,
          name: image?.name,
          url: image?.original_url,
        })),
        bannerImage: fullProjectData.bannerImage?.map(image => ({
          uid: image?.uuid,
          name: image?.name,
          url: image?.original_url,
        })),
        status: fullProjectData.status,
        title: fullProjectData.title,
        content: fullProjectData.content,
      })
      setContentRichText(fullProjectData.content)
    }
  }, [fullProjectData, form])

  const handleRichContent = (field: 'az' | 'ru' | 'en', content: string) => {
    setContentRichText(prevState => ({ ...prevState, [field]: content }))
  }

  const onFinish: FormProps<IFormProject>['onFinish'] = async (
    values: IFormProject,
  ) => {
    const formValues = {
      ...values,
      content: contentRichText,
      tag_ids: Array.isArray(values.tag_ids)
        ? values.tag_ids
        : [values.tag_ids],
      _method: 'PUT',
    }

    const formData = createFormData(formValues)

    try {
      await editProject({ id: project_id, formData }).unwrap()
      notifier('Dəyişiklik uğurla icra edildi.', NOTIFICATION.success)
      onClose()
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : 'An unexpected error occurred'
      notifier(errorMessage, NOTIFICATION.error)
    }
  }
  return (
    <Drawer
      title='Düzəliş'
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
            disabled={isLoading}
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
        style={formStyle}
      >
        <RenderIf condition={loadingProjectData}>
          <Loading />
        </RenderIf>
        <RenderIf condition={!loadingProjectData}>
          <Row gutter={{ xs: 8, sm: 16 }}>
            <Col
              xs={24}
              sm={12}
              md={8}
            >
              <Form.Item<IEditProjectForm>
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
              <Form.Item<IEditProjectForm>
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
              <Form.Item<IEditProjectForm>
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
          <Row gutter={{ xs: 8, sm: 16 }}>
            <Col span={24}>
              <Form.Item<IEditProjectForm>
                label='Content(az)'
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
            <Col span={24}>
              <Form.Item<IEditProjectForm>
                label='Content(en)'
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
            <Col span={24}>
              <Form.Item<IEditProjectForm>
                label='Content(ru)'
                name={['content', 'ru']}
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
          <Row>
            <Col
              xs={24}
              sm={12}
            >
              <Form.Item<IEditProjectForm>
                name='images'
                label='Layihə şəkilləri'
                valuePropName='fileList'
                getValueFromEvent={e => {
                  const fileList = Array.isArray(e) ? e : e?.fileList
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
                          new Error('Zəhmət olmasa şəkil yükləyin'),
                        ),
                  },
                ]}
              >
                <Upload
                  name='images'
                  accept='image/*'
                  multiple
                  beforeUpload={() => false}
                  listType='picture'
                  onRemove={file =>
                    deleteFile({ mediaIDS: [file.uid] }).unwrap()
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
              <Form.Item<IEditProjectForm>
                name='bannerImage'
                label='Əsas şəkil'
                valuePropName='fileList'
                getValueFromEvent={e => {
                  const fileList = Array.isArray(e) ? e : e?.fileList
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
                          new Error('Zəhmət olmasa şəkil yükləyin'),
                        ),
                  },
                ]}
              >
                <Upload
                  name='bannerImage'
                  accept='image/*'
                  listType='picture'
                  beforeUpload={() => false}
                  onRemove={file =>
                    deleteFile({ mediaIDS: [file.uid] }).unwrap()
                  }
                >
                  <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col
              xs={24}
              sm={12}
            >
              <Form.Item<IEditProjectForm>
                name='similar_project_ids'
                label='Oxşar layihələri seçin'
              >
                <Select
                  mode='multiple'
                  style={{ width: '100%' }}
                  placeholder='Oxşar bloqları seçin'
                  options={projectsOptions || []}
                  optionRender={option => <Space>{option.label}</Space>}
                />
              </Form.Item>
            </Col>
            <Col
              xs={24}
              sm={12}
            >
              <Form.Item<IEditProjectForm>
                name='tag_ids'
                label='Layihə teqi'
              >
                <Select
                  style={{ width: '100%' }}
                  placeholder='Teq seçin'
                  options={teqOptions || []}
                  optionRender={option => <Space>{option.label}</Space>}
                />
              </Form.Item>
            </Col>
          </Row>
        </RenderIf>
      </Form>
    </Drawer>
  )
}
