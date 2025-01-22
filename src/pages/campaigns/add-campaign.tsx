import * as React from 'react'
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  FormProps,
  Input,
  Row,
  Space,
  Upload,
  type GetProps,
} from 'antd'
import { Loading, RenderIf } from '~ek/shared/components'
import {
  beforeUploadHandler,
  createFormData,
  formatDate,
  notifier,
} from '~ek/shared/helpers'
import { DATE_FORMAT, NOTIFICATION } from '~ek/shared/const/constants'
import type { IFormCampaign } from '~ek/types/campaigns'
import { UploadOutlined } from '@ant-design/icons'
import { usePostCampaignMutation } from '~ek/redux/api/campaign'
import { useFormStyle } from '~ek/shared/utilities/formStyles'
import { RichTextEditor } from '~ek/shared/components/richtext'

interface IDrawerProps {
  open: boolean
  onClose: () => void
}
type RangePickerProps = GetProps<typeof DatePicker.RangePicker>
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
  campaignDates: [],
}

export function AddCampaign({
  open,
  onClose,
}: IDrawerProps): React.ReactElement {
  const [form] = Form.useForm()
  const formStyle = useFormStyle()
  const { RangePicker } = DatePicker

  const [image, setImage] = React.useState<IFile>({
    file: [],
    fileList: [],
  })
  const [contentRichText, setContentRichText] = React.useState<ILangContent>({
    az: '',
    ru: '',
    en: '',
  })
  const [dateRange, setDateRange] = React.useState<{
    startDate: string
    endDate: string
  }>({ startDate: '', endDate: '' })

  const [addCampaign, { isLoading }] = usePostCampaignMutation()

  const handleRichContent = (field: 'az' | 'ru' | 'en', content: string) => {
    setContentRichText(prevState => ({ ...prevState, [field]: content }))
  }

  const handleDateChange = (
    dates: RangePickerProps['value'],
    dateStrings: [string, string],
  ) => {
    if (dates) {
      setDateRange({ startDate: dateStrings[0], endDate: dateStrings[1] })
    }
  }

  const onFinish: FormProps<IFormCampaign>['onFinish'] = async (
    values: IFormCampaign,
  ) => {
    const formatStartDate =
      dateRange.startDate &&
      formatDate(dateRange.startDate, DATE_FORMAT.VIEW, DATE_FORMAT.SEND)
    const formatEndDate =
      dateRange.endDate &&
      formatDate(dateRange.endDate, DATE_FORMAT.VIEW, DATE_FORMAT.SEND)

    const formValues = {
      ...values,
      content: contentRichText,
      image: image.file,
      startDate: formatStartDate,
      endDate: formatEndDate,
    }
    const formData = createFormData(formValues)
    try {
      await addCampaign(formData).unwrap()
      notifier('Yeni kampaniya yaradıldı', NOTIFICATION.success)
      onClose()
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : 'An unexpected error occurred'
      notifier(errorMessage, NOTIFICATION.error)
    }
  }
  return (
    <Drawer
      title='Yeni Kampaniya'
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
            <Form.Item<IFormCampaign>
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
            <Form.Item<IFormCampaign>
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
            <Form.Item<IFormCampaign>
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
            <Form.Item
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
            <Form.Item
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
            <Form.Item
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
            sm={8}
          >
            <Form.Item<IFormCampaign>
              name='image'
              label='Image'
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
          <Col
            xs={24}
            sm={16}
          >
            <Form.Item<IFormCampaign>
              name='campaignDates'
              label='Kampaniya müddəti'
              rules={[
                {
                  required: true,
                  message: 'Zəhmət olmasa müddət seçin',
                },
              ]}
            >
              <RangePicker
                showTime={{ format: DATE_FORMAT.VIEW }}
                format={DATE_FORMAT.VIEW}
                onChange={handleDateChange}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  )
}
