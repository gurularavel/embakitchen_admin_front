import { Button, Col, Drawer, Form, Input, Row, Space } from 'antd'
import { usePostInfoBlockMutation } from '~ek/redux/api/about'
import { Loading, RenderIf } from '~ek/shared/components'
import { IPostBlock } from '~ek/types/about'

interface IDrawerProps {
  open: boolean
  onClose: () => void
}

export function AddBlockDrawer({
  open,
  onClose,
}: IDrawerProps): React.ReactElement {
  const [addBlock, { isLoading }] = usePostInfoBlockMutation()
  const [form] = Form.useForm()

  const handleSubmit = (data: IPostBlock) => {
    addBlock(data)
      .then(() => {
        onClose()
      })
      .catch((error: unknown) => {
        console.error(error)
      })
  }

  return (
    <Drawer
      title='Yeni blok'
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
      >
        <RenderIf condition={isLoading}>
          <Loading />
        </RenderIf>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col
            xs={24}
            sm={12}
            md={8}
          >
            <Form.Item
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
            <Form.Item
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
            <Form.Item
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
          <Col
            xs={24}
            sm={12}
            md={8}
          >
            <Form.Item
              name={['content', 'az']}
              label='Açıqlama(az)'
              rules={[
                {
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
            <Form.Item
              name={['content', 'en']}
              label='Açıqlama(en)'
              rules={[
                {
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
            <Form.Item
              name={['content', 'ru']}
              label='Açıqlama(ru)'
              rules={[
                {
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
        </Row>
      </Form>
    </Drawer>
  )
}
