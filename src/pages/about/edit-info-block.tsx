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
  Switch,
} from 'antd'
import { useEditInfoBlockMutation } from '~ek/redux/api/about'
import type { InfoBlock } from '~ek/types/about'
import { notifier } from '~ek/shared/helpers'
import { NOTIFICATION } from '~ek/shared/const/constants'
import { useFormStyle } from '~ek/shared/utilities/formStyles'
import { RichTextEditor } from '~ek/shared/components/richtext'

interface IDrawerProps {
  open: boolean
  onClose: () => void
  block: InfoBlock
}

type FormField = Omit<InfoBlock, 'id'>

export function EditInfoBlock({
  open,
  onClose,
  block,
}: IDrawerProps): React.ReactElement {
  const [form] = Form.useForm()
  const formStyle = useFormStyle()
  const [switchChecked, setSwitchChecked] = React.useState<boolean>(
    block.status,
  )
  const [contentRichText, setContentRichText] = React.useState<ILangContent>({
    az: block.content.az,
    en: block.content.en,
    ru: block.content.ru,
  })
  const [editBlock, { isLoading }] = useEditInfoBlockMutation()

  const initialValues: InfoBlock = block

  const handleRichContent = (field: 'az' | 'ru' | 'en', content: string) => {
    setContentRichText(prevState => ({ ...prevState, [field]: content }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setSwitchChecked(checked)
    form.setFieldsValue({ status: checked })
  }

  const handleSubmit: FormProps<FormField>['onFinish'] = async (
    data: FormField,
  ) => {
    try {
      const postData = { id: block.id, ...data }
      await editBlock(postData).unwrap()
      notifier('Dəyişiklik uğurla icra edilir', NOTIFICATION.success)
      onClose()
    } catch (e: unknown) {
      console.error(e)
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
            disabled={isLoading}
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
        onFinish={handleSubmit}
        initialValues={initialValues}
        style={formStyle}
      >
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col
            xs={24}
            sm={12}
            md={8}
          >
            <Form.Item<FormField>
              name={['title', 'az']}
              label='Başlıq(az)'
              rules={[
                {
                  whitespace: true,
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
            <Form.Item<FormField>
              name={['title', 'en']}
              label='Başlıq(en)'
              rules={[
                {
                  whitespace: true,
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
            <Form.Item<FormField>
              name={['title', 'ru']}
              label='Başlıq(ru)'
              rules={[
                {
                  whitespace: true,
                  required: true,
                  message: 'Zəhmət olmasa başlıq əlavə edin(ru)',
                },
              ]}
            >
              <Input placeholder='Başlıq(ru)' />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24}>
            <Form.Item<FormField>
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
          <Col xs={24}>
            <Form.Item<FormField>
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
          <Col xs={24}>
            <Form.Item<FormField>
              label='Content(ru)'
              name={['content', 'az']}
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
          <Col xs={24}>
            <Form.Item<FormField>
              name='status'
              label='Status'
            >
              <Switch
                checked={switchChecked}
                style={{
                  backgroundColor: switchChecked ? '#52c41a' : '#ff4d4f',
                }}
                onChange={checked => handleSwitchChange(checked)}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  )
}
