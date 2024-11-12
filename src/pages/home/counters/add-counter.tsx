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
} from 'antd'
import { Loading, RenderIf } from '~ek/shared/components'
import { NOTIFICATION } from '~ek/shared/const/constants'
import { notifier } from '~ek/shared/helpers'
import { IPostCounter } from '~ek/types/home/counter'
import { usePostCounterMutation } from '~ek/redux/api/home/counter'
import { useFormStyle } from '~ek/shared/utilities/formStyles'

interface IDrawerProps {
  open: boolean
  onClose: () => void
}

export function AddCounterDrawer({
  open,
  onClose,
}: IDrawerProps): React.ReactElement {
  const [addCounter, { isLoading }] = usePostCounterMutation()
  const [form] = Form.useForm()
  const formStyle = useFormStyle()

  const initialValues = {
    title: {
      az: '',
      en: '',
      ru: '',
    },
    count: '',
  }

  const handleSubmit: FormProps<IPostCounter>['onFinish'] = async (
    data: IPostCounter,
  ) => {
    try {
      await addCounter(data).unwrap()
      notifier('Yeni sayğac əlavə edildi', NOTIFICATION.success)
      onClose()
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : 'An unexpected error occurred'
      notifier(errorMessage, NOTIFICATION.error)
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
        initialValues={initialValues}
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
            <Form.Item<IPostCounter>
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
            <Form.Item<IPostCounter>
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
                  validator: (_, value) => {
                    if (value === null || value.toString().trim() === '') {
                      return Promise.reject('Zəhmət olmasa rəqəm daxil edin')
                    }
                    return Promise.resolve()
                  },
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
