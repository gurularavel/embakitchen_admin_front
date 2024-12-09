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
import type { IFormProject } from '~ek/types/project'
import { UploadOutlined } from '@ant-design/icons'
import {
  useGetProjectsQuery,
  usePostProjectMutation,
} from '~ek/redux/api/project'
import { useGetTagsQuery } from '~ek/redux/api/tags'
import { useFormStyle } from '~ek/shared/utilities/formStyles'
import { RichTextEditor } from '~ek/shared/components/richtext'

interface IDrawerProps {
  open: boolean
  onClose: () => void
}
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
  similar_project_ids: [],
  tag_ids: [],
}

export function AddProject({
  open,
  onClose,
}: IDrawerProps): React.ReactElement {
  const [form] = Form.useForm()
  const formStyle = useFormStyle()

  const { data: projectsData } = useGetProjectsQuery({ page: 1 })
  const { data: teqData } = useGetTagsQuery({ page: 1 })
  const [addProject, { isLoading }] = usePostProjectMutation()

  const [contentRichText, setContentRichText] = React.useState<ILangContent>({
    az: '',
    ru: '',
    en: '',
  })
  const projectsOptions = projectsData?.data?.map(d => ({
    value: d.id,
    label: d.title.az,
  }))
  const teqOptions = teqData?.data?.map(d => ({
    value: d.id,
    label: d.title.az,
  }))

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
    }
    const formData = createFormData(formValues)
    try {
      await addProject(formData).unwrap()
      notifier('Yeni layihə yaradıldı', NOTIFICATION.success)
      onClose()
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : 'An unexpected error occurred'
      notifier(errorMessage, NOTIFICATION.error)
    }
  }
  return (
    <Drawer
      title='Yeni Layihə'
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
          <Col
            xs={24}
            sm={12}
            md={8}
          >
            <Form.Item<IFormProject>
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
            <Form.Item<IFormProject>
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
            <Form.Item<IFormProject>
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
            <Form.Item<IFormProject>
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
            <Form.Item<IFormProject>
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
            <Form.Item<IFormProject>
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
            <Form.Item<IFormProject>
              name='images'
              label='Layihə şəkilləri'
              valuePropName='fileList'
              getValueFromEvent={e => {
                const fileList = Array.isArray(e) ? e : e?.fileList
                return fileList?.map(
                  (fileItem: UploadFile) => fileItem.originFileObj || fileItem,
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
                listType='picture'
              >
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col
            xs={24}
            sm={12}
          >
            <Form.Item<IFormProject>
              name='bannerImage'
              label='Əsas şəkil'
              valuePropName='fileList'
              getValueFromEvent={e => {
                const fileList = Array.isArray(e) ? e : e?.fileList
                return fileList?.map(
                  (fileItem: UploadFile) => fileItem.originFileObj || fileItem,
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
            <Form.Item<IFormProject>
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
            <Form.Item<IFormProject>
              name='tag_ids'
              label='Layihə teqi'
            >
              <Select
                style={{ width: '100%' }}
                placeholder='Teq seçin'
                options={teqOptions || []}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  )
}
