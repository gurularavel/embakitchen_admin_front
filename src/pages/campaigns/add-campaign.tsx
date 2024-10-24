import * as React from 'react'
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  FormProps,
  Input,
  message,
  Row,
  Space,
  theme,
  Upload,
} from 'antd'
import { Loading, RenderIf } from '~ek/shared/components'
import { formatDate, notifier } from '~ek/shared/helpers'
import { DATE_FORMAT, NOTIFICATION } from '~ek/shared/const/constants'
import type { IFormCampaign } from '~ek/types/campaigns'
import type { GetProps } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { usePostCampaignMutation } from '~ek/redux/api/campaign'

interface IDrawerProps {
  open: boolean
  onClose: () => void
}
type RangePickerProps = GetProps<typeof DatePicker.RangePicker>

export function AddCampaign({
  open,
  onClose,
}: IDrawerProps): React.ReactElement {
  const { token } = theme.useToken()
  const [addCampaign, { isLoading }] = usePostCampaignMutation()
  const [form] = Form.useForm()
  const [image, setImage] = React.useState<IFile>({
    file: null,
    fileList: [],
  })

  const { RangePicker } = DatePicker
  const { TextArea } = Input

  const formStyle: React.CSSProperties = {
    maxWidth: 'none',
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  }

  const [dateRange, setDateRange] = React.useState<{
    startDate: string
    endDate: string
  }>({ startDate: '', endDate: '' })

  const handleDateChange = (
    dates: RangePickerProps['value'],
    dateStrings: [string, string],
  ) => {
    if (dates) {
      setDateRange({ startDate: dateStrings[0], endDate: dateStrings[1] })
    }
  }

  const beforeUpload = (file: File, type: string) => {
    if (type === 'image') {
      setImage({
        file,
        fileList: [{ uid: file.name, name: file.name, status: 'done' }],
      })
    }
    return false
  }

  const onFinish: FormProps<IFormCampaign>['onFinish'] = async (
    values: IFormCampaign,
  ) => {
    if (image.file?.size === 0 || !image.fileList.length) {
      message.error('Please select image first!')
      return
    }
    const formatStartDate =
      dateRange.startDate &&
      formatDate(dateRange.startDate, DATE_FORMAT.VIEW, DATE_FORMAT.SEND)
    const formatEndDate =
      dateRange.endDate &&
      formatDate(dateRange.endDate, DATE_FORMAT.VIEW, DATE_FORMAT.SEND)

    const formData = new FormData()
    formData.append('title[az]', values.title.az)
    formData.append('title[en]', values.title.en)
    formData.append('title[ru]', values.title.ru)
    formData.append('content[az]', values.content.az)
    formData.append('content[en]', values.content.en)
    formData.append('content[ru]', values.content.ru)
    formData.append('startDate', formatStartDate)
    formData.append('endDate', formatEndDate)
    if (image.file) formData.append('image', image.file)

    try {
      await addCampaign(formData).unwrap()
      notifier('Dəyişiklik uğurla icra edildi', 'success')
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
                  message: 'Zəhmət olmasa başlıq əlavə edin(ru)',
                },
              ]}
            >
              <Input placeholder='Başlıq(ru)' />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16 }}>
          <Col
            xs={24}
            sm={12}
            md={8}
          >
            <Form.Item<IFormCampaign>
              name={['content', 'az']}
              label='Kontent(az)'
              rules={[
                {
                  required: true,
                  message: 'Zəhmət olmasa kontent əlavə edin(az)',
                },
              ]}
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
            <Form.Item<IFormCampaign>
              name={['content', 'en']}
              label='Kontent(en)'
              rules={[
                {
                  required: true,
                  message: 'Zəhmət olmasa kontent əlavə edin(en)',
                },
              ]}
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
            <Form.Item<IFormCampaign>
              name={['content', 'ru']}
              label='Kontent(ru)'
              rules={[
                {
                  required: true,
                  message: 'Zəhmət olmasa kontent əlavə edin(ru)',
                },
              ]}
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
                beforeUpload={file => beforeUpload(file, 'image')}
                fileList={image.fileList}
                onRemove={() => setImage({ file: null, fileList: [] })}
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
