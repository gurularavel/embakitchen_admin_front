import * as React from 'react'
import { Button, Col, Drawer, Form, FormProps, Input, Row, Space } from 'antd'
import { Loading, RenderIf } from '~ek/shared/components'
import { usePostInfoBlockMutation } from '~ek/redux/api/about'
import type { IPostBlock } from '~ek/types/about'
import { useFormStyle } from '~ek/shared/utilities/formStyles'
import { notifier } from '~ek/shared/helpers'
import { NOTIFICATION } from '~ek/shared/const/constants'
import { RichTextEditor } from '~ek/shared/components/richtext'

interface IDrawerProps {
  open: boolean
  onClose: () => void
}

interface IFieldForm {
  title: ILangContent
  content: ILangContent
}
export function AddBlockDrawer({
  open,
  onClose,
}: IDrawerProps): React.ReactElement {
  const [addBlock, { isLoading }] = usePostInfoBlockMutation()
  const [form] = Form.useForm()
  const formStyle = useFormStyle()
  const [contentRichText, setContentRichText] = React.useState<ILangContent>({
    az: '',
    en: '',
    ru: '',
  })

  const handleRichContent = (field: 'az' | 'ru' | 'en', content: string) => {
    setContentRichText(prevState => ({ ...prevState, [field]: content }))
  }

  const handleSubmit: FormProps<IFieldForm>['onFinish'] = async (
    data: IPostBlock,
  ) => {
    try {
      await addBlock(data).unwrap()
      notifier('Yeni blok əlavə edildi', NOTIFICATION.success)
      onClose()
    } catch (e: unknown) {
      console.error(e)
    }
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
            md={12}
            lg={8}
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
          <Col xs={24}>
            <Form.Item<IFieldForm>
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
            <Form.Item<IFieldForm>
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
            <Form.Item<IFieldForm>
              label='Content(ru)'
              name={['content', 'ru']}
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
        </Row>
      </Form>
    </Drawer>
  )
}
