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
import { notifier } from '~ek/shared/helpers'
import { NOTIFICATION } from '~ek/shared/const/constants'
import type { IColor } from '~ek/types/colors'
import { useEditColorMutation } from '~ek/redux/api/colors'
import { useFormStyle } from '~ek/shared/utilities/formStyles'

interface IDrawerProps {
  open: boolean
  onClose: () => void
  color: IColor
}

interface IFieldForm {
  title: ILangContent
  hex: string
  status: boolean
}

export function EditColor({
  open,
  onClose,
  color,
}: IDrawerProps): React.ReactElement {
  const [form] = Form.useForm()
  const formStyle = useFormStyle()
  const [switchChecked, setSwitchChecked] = React.useState<boolean>(
    color.status,
  )

  const [editColor, { isLoading }] = useEditColorMutation()

  const initialValues: IColor = {
    title: {
      az: color.title.az,
      en: color.title.en,
      ru: color.title.ru,
    },
    hex: color.hex,
    status: color.status,
    id: color.id,
  }

  const handleSwitchChange = (checked: boolean) => {
    setSwitchChecked(checked)
    form.setFieldsValue({ status: checked })
  }

  const handleSubmit: FormProps<IFieldForm>['onFinish'] = async (
    data: IFieldForm,
  ) => {
    const putData = {
      id: color.id,
      ...data,
    }
    try {
      await editColor(putData)
      notifier('Dəyişiklik uğurla icra olundu', NOTIFICATION.success)
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
            <Form.Item<IFieldForm>
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
            <Form.Item<IFieldForm>
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
        <Row gutter={16}>
          <Col xs={4}>
            <Form.Item<IFieldForm>
              name={'hex'}
              label='Hexcode'
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: 'Zəhmət olmasa hexcode daxil edin',
                },
              ]}
            >
              <Input placeholder='Hexcode' />
            </Form.Item>
          </Col>
          <Col xs={4}>
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
