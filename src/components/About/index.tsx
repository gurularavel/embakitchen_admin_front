import * as React from 'react'
import { UploadOutlined } from '@ant-design/icons'
import { Button, Form, Input, Space, Upload, message } from 'antd'

const normFile = (e: unknown) => {
  if (Array.isArray(e)) {
    return e
  }
  return e?.fileList
}
interface IForm {
  content: {
    az: string
    en: string
    ru: string
  }
  title: {
    az: string
    en: string
    ru: string
  }
  video: File
}

export const About: React.FC = () => {
  const [fileList, setFileList] = React.useState<File | null>(null)

  const beforeUpload = (file: File) => {
    setFileList(file)
    return false
  }
  const onFinish = (values: IForm) => {
    if (fileList?.size === 0) {
      message.error('Please select a file first!')
      return
    }

    const formData = new FormData()
    formData.append('title[az]', values.title.az)
    formData.append('title[en]', values.title.en)
    formData.append('title[ru]', values.title.ru)

    formData.append('content[az]', values.content.az)
    formData.append('content[en]', values.content.en)
    formData.append('content[ru]', values.content.ru)
    if (fileList) formData.append('video', fileList)
  }

  return (
    <Form
      name='about_form'
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <Form.Item
        label='Başlıq(az)'
        name={['title', 'az']}
        rules={[{ required: true, message: 'Zəhmət olmasa boş saxlamayın' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='Başlıq(en)'
        name={['title', 'en']}
        rules={[{ required: true, message: 'Zəhmət olmasa boş saxlamayın' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='Başlıq(ru)'
        name={['title', 'ru']}
        rules={[{ required: true, message: 'Zəhmət olmasa boş saxlamayın' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name={['content', 'az']}
        label='Kontent(az)'
        rules={[{ required: true, message: 'Zəhmət olmasa boş saxlamayın' }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        name={['content', 'en']}
        label='Kontent(en)'
        rules={[{ required: true, message: 'Zəhmət olmasa boş saxlamayın' }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        name={['content', 'ru']}
        label='Kontent(ru)'
        rules={[{ required: true, message: 'Zəhmət olmasa boş saxlamayın' }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        name='video'
        label='Upload Video'
        valuePropName='fileList'
        getValueFromEvent={normFile}
      >
        <Upload
          name='video'
          accept='video/*'
          maxCount={1}
          beforeUpload={beforeUpload}
        >
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
        <Space>
          <Button
            type='primary'
            htmlType='submit'
          >
            Submit
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}
