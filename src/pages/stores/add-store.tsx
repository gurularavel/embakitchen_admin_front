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
  Select,
  Spin,
} from 'antd'
import InputMask from 'react-input-mask'
import { Loading, RenderIf } from '~ek/shared/components'
import { notifier } from '~ek/shared/helpers'
import { NOTIFICATION } from '~ek/shared/const/constants'
import { FormField } from '~ek/types/store'
import { usePostStoreMutation } from '~ek/redux/api/store'
import { useFormStyle } from '~ek/shared/utilities/formStyles'
import { IStore } from '~ek/types/store'
import { useGetCitiesQuery } from '~ek/redux/api/region/city'

interface IDrawerProps {
  open: boolean
  onClose: () => void
}
const { Option } = Select
export function AddStoreDrawer({
  open,
  onClose,
}: IDrawerProps): React.ReactElement {
  const { data: cityData, isLoading: cityLoading } = useGetCitiesQuery({
    page: 1,
  })

  const [addStore, { isLoading }] = usePostStoreMutation()
  const [form] = Form.useForm()
  const formStyle = useFormStyle()
  const initialValues = {
    city_id: '',
    title: {
      az: '',
      en: '',
      ru: '',
    },
    address: {
      az: '',
      en: '',
      ru: '',
    },
    phone: '',
    schedule: '',
    email: '',
  }

  const onFinish: FormProps<FormField>['onFinish'] = async (
    values: FormField,
  ) => {
    try {
      await addStore(values).unwrap()
      notifier('Yeni mağaza əlavə edildi', NOTIFICATION.success)
      onClose()
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : 'An unexpected error occurred'
      notifier(errorMessage, NOTIFICATION.error)
    }
  }

  return (
    <Drawer
      title='Yeni Mağaza'
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
        onFinish={onFinish}
        style={formStyle}
      >
        <RenderIf condition={isLoading}>
          <Loading />
        </RenderIf>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item<IStore>
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
          <Col span={8}>
            <Form.Item<FormField>
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
          <Col span={8}>
            <Form.Item<FormField>
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
          <Col span={8}>
            <Form.Item<FormField>
              name={['address', 'az']}
              label='Ünvan(az)'
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: 'Zəhmət olmasa ünvan əlavə edin(az)',
                },
              ]}
            >
              <Input placeholder='Başlıq(az)' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<FormField>
              name={['address', 'en']}
              label='Ünvan(en)'
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: 'Zəhmət olmasa ünvan əlavə edin(en)',
                },
              ]}
            >
              <Input placeholder='Başlıq(en)' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<FormField>
              name={['address', 'ru']}
              label='Ünvan(ru)'
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: 'Zəhmət olmasa ünvan əlavə edin(ru)',
                },
              ]}
            >
              <Input placeholder='Başlıq(ru)' />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label='Şəhər'
              name='city'
              rules={[
                { required: true, message: 'Zəhmət olmasa boş saxlamayın' },
              ]}
            >
              <Select
                style={{ width: '100%' }}
                placeholder='Şəhər seçin'
                loading={cityLoading}
                allowClear
              >
                {cityLoading ? (
                  <Option
                    value='loading'
                    disabled
                  >
                    <Spin size='small' />
                  </Option>
                ) : (
                  cityData?.data.map(city => (
                    <Option
                      key={city.id}
                      value={city.id}
                    >
                      {city.title.az}
                    </Option>
                  ))
                )}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FormField>
              name={'email'}
              label='Email'
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: 'Zəhmət olmasa email əlavə edin',
                },
              ]}
            >
              <Input
                type='email'
                placeholder='Email'
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FormField>
              name={'phone'}
              label='Telefon nömrəsi'
              rules={[
                { required: true, message: 'Zəhmət olmasa boş saxlamayın.' },
                {
                  pattern: /^\+994 \d{2} \d{3} \d{2} \d{2}$/,
                  message: 'Zəhmət olmasa düzgün formatda telefon daxil edin',
                },
              ]}
            >
              <InputMask
                mask='+\\994 99 999 99 99'
                maskChar={null}
                placeholder='Telefon'
              >
                {() => <Input />}
              </InputMask>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FormField>
              name={'schedule'}
              label='İşləmə saatları'
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: 'Zəhmət olmasa boş saxlamayın',
                },
              ]}
            >
              <Input placeholder='İşləmə saatları' />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  )
}
