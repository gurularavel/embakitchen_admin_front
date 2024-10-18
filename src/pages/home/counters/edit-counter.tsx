import * as React from 'react'
import {
  Button,
  Col,
  Drawer,
  Form,
  FormProps,
  Input,
  InputNumber,
  Row,
  Space,
  Switch,
  theme,
} from 'antd'
import { Notifier } from '~ek/shared/components'
import { NOTIFICATION } from '~ek/shared/const/constants'
import { ICounter } from '~ek/types/home/counter'
import { useEditCounterMutation } from '~ek/redux/api/home/counter'

interface IDrawerProps {
  open: boolean
  onClose: () => void
  counter: ICounter
}

interface IFieldForm {
  title: ILangContent
  count: number
  status: boolean
}

export function EditCounter({
  open,
  onClose,
  counter,
}: IDrawerProps): React.ReactElement {
  const { token } = theme.useToken()
  const [form] = Form.useForm()
  const [switchChecked, setSwitchChecked] = React.useState<boolean>(
    counter.status,
  )

  const [editCounter, { isLoading }] = useEditCounterMutation()

  const formStyle: React.CSSProperties = {
    maxWidth: 'none',
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  }
  const initialValues: ICounter = {
    title: {
      az: counter.title.az,
      en: counter.title.en,
      ru: counter.title.ru,
    },
    count: counter.count,
    status: counter.status,
    id: counter.id,
  }

  const handleSwitchChange = (checked: boolean) => {
    setSwitchChecked(checked)
    form.setFieldsValue({ status: checked })
  }

  const handleSubmit: FormProps<IFieldForm>['onFinish'] = async (
    data: IFieldForm,
  ) => {
    const putData = {
      id: counter.id,
      ...data,
    }
    try {
      await editCounter(putData)
      Notifier('Dəyişiklik uğurla icra olundu', NOTIFICATION.success)
      onClose()
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : 'An unexpected error occurred'
      Notifier(errorMessage, NOTIFICATION.error)
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
            <Form.Item<ICounter>
              name={'count'}
              label='Sayğac'
              rules={[
                {
                  required: true,
                  message: 'Zəhmət olmasa rəqəm daxil edin',
                },
              ]}
            >
              <InputNumber
                min={1}
                stringMode={false}
              />
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
