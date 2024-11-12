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

interface IDrawerProps {
  open: boolean
  onClose: () => void
  block: InfoBlock
}

interface IFieldForm {
  title: ILangContent
  content: ILangContent
  status: boolean
}

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
  const [editBlock, { isLoading }] = useEditInfoBlockMutation()

  const initialValues: InfoBlock = {
    content: {
      az: block.content.az,
      en: block.content.en,
      ru: block.content.ru,
    },
    title: {
      az: block.title.az,
      en: block.title.en,
      ru: block.title.ru,
    },
    status: block.status,
    id: block.id,
    slug: {
      az: block.slug.az,
      en: block.slug.en,
      ru: block.slug.ru,
    },
  }

  const handleSwitchChange = (checked: boolean) => {
    setSwitchChecked(checked)
    form.setFieldsValue({ status: checked })
  }

  const handleSubmit: FormProps<IFieldForm>['onFinish'] = async (
    data: IFieldForm,
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
            <Form.Item<IFieldForm>
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
            <Form.Item<IFieldForm>
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
            <Form.Item<IFieldForm>
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
          <Col
            xs={24}
            sm={12}
            md={8}
          >
            <Form.Item<IFieldForm>
              name={['content', 'az']}
              label='Açıqlama(az)'
              rules={[
                {
                  whitespace: true,
                  required: true,
                  message: 'Zəhmət olmasa açıqlama daxil edin(az)',
                },
              ]}
            >
              <Input.TextArea
                rows={4}
                placeholder='Açıqlama (az)'
              />
            </Form.Item>
          </Col>
          <Col
            xs={24}
            sm={12}
            md={8}
          >
            <Form.Item<IFieldForm>
              name={['content', 'en']}
              label='Açıqlama(en)'
              rules={[
                {
                  whitespace: true,
                  required: true,
                  message: 'Zəhmət olmasa açıqlama daxil edin(en)',
                },
              ]}
            >
              <Input.TextArea
                rows={4}
                placeholder='Açıqlama (en)'
              />
            </Form.Item>
          </Col>
          <Col
            xs={24}
            sm={12}
            md={8}
          >
            <Form.Item<IFieldForm>
              name={['content', 'ru']}
              label='Açıqlama(ru)'
              rules={[
                {
                  whitespace: true,
                  required: true,
                  message: 'Zəhmət olmasa açıqlama daxil edin(ru)',
                },
              ]}
            >
              <Input.TextArea
                rows={4}
                placeholder='Açıqlama (ru)'
              />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item<IFieldForm>
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
