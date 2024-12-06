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
import { MaskedInput } from 'antd-mask-input'
import { TimePicker } from 'antd'
import { Loading, RenderIf } from '~ek/shared/components'
import { notifier, pick } from '~ek/shared/helpers'
import { NOTIFICATION } from '~ek/shared/const/constants'
import { FormField } from '~ek/types/store'
import { useEditStoreMutation } from '~ek/redux/api/store'
import { useFormStyle } from '~ek/shared/utilities/formStyles'
import type { IStore } from '~ek/types/store'
import { useGetCitiesQuery } from '~ek/redux/api/city'
import dayjs from 'dayjs'

interface IDrawerProps {
  open: boolean
  onClose: () => void
  store: IStore
}
const { Option } = Select
export function EditStoreDrawer({
  open,
  onClose,
  store,
}: IDrawerProps): React.ReactElement {
  const [timepicker, setTimePicker] = React.useState<{
    open: string
    close: string
  }>({ open: '', close: '' })

  const { data: cityData, isLoading: cityLoading } = useGetCitiesQuery({
    page: 1,
  })

  const [editStore, { isLoading }] = useEditStoreMutation()
  const [form] = Form.useForm()
  const formStyle = useFormStyle()
  const initialValues = pick({
    source: store as IStore,
    fields: [
      'address',
      'city',
      'email',
      'phone',
      'schedule',
      'status',
      'title',
      'coords',
    ],
  })

  React.useEffect(() => {
    form.setFieldsValue({
      schedule: {
        open: dayjs(initialValues.schedule.open, 'HH:mm'),
        close: dayjs(initialValues.schedule.close, 'HH:mm'),
      },
      city_id: initialValues.city?.id,
    })
  }, [
    form,
    initialValues.city?.id,
    initialValues.schedule.close,
    initialValues.schedule.open,
  ])

  const handleTimeChange = (
    field: 'open' | 'close',
    time: dayjs.Dayjs | null,
  ) => {
    setTimePicker(prev => ({
      ...prev,
      [field]: time ? time.format('HH:mm') : initialValues.schedule[field],
    }))
  }

  const onFinish: FormProps<FormField>['onFinish'] = async (
    values: FormField,
  ) => {
    const formValues = {
      ...values,
      schedule: {
        open: timepicker.open || store.schedule.open,
        close: timepicker.close || store.schedule.close,
      },
    }
    try {
      await editStore({ id: store.id, ...formValues }).unwrap()
      notifier('Dəyişiklik uğurla icra edildi', NOTIFICATION.success)
      onClose()
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : 'An unexpected error occurred'
      notifier(errorMessage, NOTIFICATION.error)
    }
  }

  return (
    <Drawer
      title='Dəyişiklik'
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
          <Col span={8}>
            <Form.Item
              label='Şəhər'
              name='city_id'
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
          <Col span={8}>
            <Form.Item<FormField>
              name='email'
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
          <Col span={8}>
            <Form.Item
              label='Telefon nömrəsi'
              name='phone'
              rules={[
                { required: true, message: 'Zəhmət olmasa boş saxlamayın.' },
                {
                  pattern: /^\+994 \d{2} \d{3} \d{2} \d{2}$/,
                  message: 'Zəhmət olmasa düzgün formatda telefon daxil edin.',
                },
              ]}
            >
              <MaskedInput mask={'+994 00 000 00 00'} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={['schedule', 'open']}
              label='İşləmə saatları'
              rules={[
                {
                  required: true,
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                        new Error('Zəhmət olmasa boş saxlamayın'),
                      ),
                },
              ]}
            >
              <TimePicker
                style={{ width: '100%' }}
                value={dayjs(timepicker.open, 'HH:mm')}
                format='HH:mm'
                onChange={time => handleTimeChange('open', time)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={['schedule', 'close']}
              label='İşləmə saatları'
              rules={[
                {
                  required: true,
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                        new Error('Zəhmət olmasa boş saxlamayın'),
                      ),
                },
              ]}
            >
              <TimePicker
                style={{ width: '100%' }}
                format='HH:mm'
                onOk={time => handleTimeChange('close', time)}
                value={dayjs(timepicker.close, 'HH:mm')}
                onChange={time => handleTimeChange('close', time)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label='Longitude'
              name={['coords', 'longitude']}
              rules={[
                { required: true, message: 'Zəhmət olmasa boş saxlamayın.' },
              ]}
            >
              <Input placeholder='Longitude' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label='Latitude'
              name={['coords', 'latitude']}
              rules={[
                { required: true, message: 'Zəhmət olmasa boş saxlamayın.' },
              ]}
            >
              <Input placeholder='Latitude' />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  )
}
