import * as React from 'react'
import {
  Button,
  Col,
  Drawer,
  Form,
  FormProps,
  Input,
  Row,
  Select,
  Space,
  Switch,
} from 'antd'
import { notifier, pick } from '~ek/shared/helpers'
import { NOTIFICATION } from '~ek/shared/const/constants'
import type { IDistrict } from '~ek/types/region'
import { useEditDistrictMutation } from '~ek/redux/api/region/district'
import { useGetCitiesQuery } from '~ek/redux/api/region/city'
import { useFormStyle } from '~ek/shared/utilities/formStyles'

interface IDrawerProps {
  open: boolean
  onClose: () => void
  district: IDistrict
}

type IFieldForm = Omit<IDistrict, 'id'>

export function EditDistrict({
  open,
  onClose,
  district,
}: IDrawerProps): React.ReactElement {
  const [form] = Form.useForm()
  const formStyle = useFormStyle()
  const [switchChecked, setSwitchChecked] = React.useState<boolean>(
    district.status,
  )

  const [editCity, { isLoading }] = useEditDistrictMutation()
  const { data: cityData } = useGetCitiesQuery({ page: 1 })
  const options = cityData?.data.map(city => ({
    value: city.id,
    label: city.title.az,
  }))

  const initialValues: IFieldForm = pick({
    source: district as IDistrict,
    fields: ['title', 'status', 'city_id'],
  })

  React.useEffect(() => {
    form.setFieldValue('city_id', district.city_id)
  }, [district.city_id, form])

  const handleSwitchChange = (checked: boolean) => {
    setSwitchChecked(checked)
    form.setFieldsValue({ status: checked })
  }

  const handleSubmit: FormProps<IFieldForm>['onFinish'] = async (
    data: IFieldForm,
  ) => {
    try {
      await editCity({ id: district.id, ...data }).unwrap()
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
        <Row gutter={16}>
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
          <Col
            xs={24}
            sm={12}
            md={8}
          >
            <Form.Item<IFieldForm>
              name='city_id'
              label='Şəhər'
              rules={[
                {
                  required: true,
                  message: 'Zəhmət olmasa şəhər seçin',
                },
              ]}
            >
              <Select
                style={{ width: '100%' }}
                placeholder='Şəhər seçin'
                options={options || []}
                optionRender={option => <Space>{option.label}</Space>}
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
