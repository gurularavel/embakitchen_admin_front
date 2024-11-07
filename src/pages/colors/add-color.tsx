import { Button, Col, Drawer, Form, FormProps, Input, Row, Space } from 'antd'
import { Loading, RenderIf } from '~ek/shared/components'
import { NOTIFICATION } from '~ek/shared/const/constants'
import { notifier } from '~ek/shared/helpers'
import type { IPostColor } from '~ek/types/colors'
import { usePostColorMutation } from '~ek/redux/api/colors'
import { useFormStyle } from '~ek/shared/utilities/formStyles'

interface IDrawerProps {
  open: boolean
  onClose: () => void
}

export function AddColor({ open, onClose }: IDrawerProps): React.ReactElement {
  const [addColor, { isLoading }] = usePostColorMutation()
  const [form] = Form.useForm()
  const formStyle = useFormStyle()

  const initialValues = {
    title: {
      az: '',
      en: '',
      ru: '',
    },
    hex: '',
  }

  const handleSubmit: FormProps<IPostColor>['onFinish'] = async (
    data: IPostColor,
  ) => {
    try {
      await addColor(data).unwrap()
      notifier('Yeni rəng əlavə edildi', NOTIFICATION.success)
      onClose()
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : 'An unexpected error occurred'
      notifier(errorMessage, NOTIFICATION.error)
    }
  }

  return (
    <Drawer
      title='Yeni rəng'
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
            <Form.Item<IPostColor>
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
            <Form.Item<IPostColor>
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
            <Form.Item<IPostColor>
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
            <Form.Item<IPostColor>
              name={'hex'}
              label='Hexcode'
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: 'Zəhmət olmasa hexcode əlavə edin',
                },
              ]}
            >
              <Input placeholder='Hexcode' />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  )
}
