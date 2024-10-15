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
  theme,
} from 'antd'
import { Loading, Notifier, RenderIf } from '~ek/shared/components'
import { usePostCounterMutation } from '~ek/redux/api/home/counter'
import { IPostCounter } from '~ek/types/home/counter'
import { NOTIFICATION } from '~ek/shared/const/constants'

interface IDrawerProps {
  open: boolean
  onClose: () => void
}

export function AddCounterDrawer({
  open,
  onClose,
}: IDrawerProps): React.ReactElement {
  const { token } = theme.useToken()
  const [addCounter, { isLoading }] = usePostCounterMutation()
  const [form] = Form.useForm()

  const formStyle: React.CSSProperties = {
    maxWidth: 'none',
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  }

  const handleSubmit: FormProps<IPostCounter>['onFinish'] = async (
    data: IPostCounter,
  ) => {
    try {
      await addCounter(data)
      onClose()
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : 'An unexpected error occurred'
      Notifier(errorMessage, NOTIFICATION.ERROR)
    }
  }

  return (
    <Drawer
      title='Yeni sayğac'
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
        onFinish={handleSubmit}
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
            <Form.Item<IPostCounter>
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
            <Form.Item<IPostCounter>
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
            <Form.Item<IPostCounter>
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
        <Row>
          <Col
            xs={24}
            sm={12}
            md={8}
          >
            <Form.Item<IPostCounter>
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
        </Row>
      </Form>
    </Drawer>
  )
}
