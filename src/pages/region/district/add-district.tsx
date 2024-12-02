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
} from 'antd'
import { Loading, RenderIf } from '~ek/shared/components'
import { NOTIFICATION } from '~ek/shared/const/constants'
import { notifier } from '~ek/shared/helpers'
import type { IDistrict } from '~ek/types/region'
import { usePostDistrictMutation } from '~ek/redux/api/region/district'
import { useGetCitiesQuery } from '~ek/redux/api/region/city'
import { useFormStyle } from '~ek/shared/utilities/formStyles'

interface IDrawerProps {
  open: boolean
  onClose: () => void
}

type IFormDistrict = Omit<IDistrict, 'id' | 'status'>

export function AddDistrict({
  open,
  onClose,
}: IDrawerProps): React.ReactElement {
  const [addDistrict, { isLoading }] = usePostDistrictMutation()
  const { data: cityData, isLoading: cityLoading } = useGetCitiesQuery({
    page: 1,
  })
  const options = cityData?.data?.map(city => ({
    value: city.id,
    label: city.title.az,
  }))

  const [form] = Form.useForm()
  const formStyle = useFormStyle()

  const initialValues = {
    title: {
      az: '',
      en: '',
      ru: '',
    },
  }

  const handleSubmit: FormProps<IFormDistrict>['onFinish'] = async (
    data: IFormDistrict,
  ) => {
    try {
      await addDistrict(data).unwrap()
      notifier('Yeni rayon əlavə edildi', NOTIFICATION.success)
      onClose()
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : 'An unexpected error occurred'
      notifier(errorMessage, NOTIFICATION.error)
    }
  }

  return (
    <Drawer
      title='Yeni rayon'
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
            <Form.Item<IFormDistrict>
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
            <Form.Item<IFormDistrict>
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
            <Form.Item<IFormDistrict>
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
        <Row gutter={{ xs: 8, sm: 16 }}>
          <Col
            xs={24}
            sm={12}
            md={8}
          >
            <Form.Item<IFormDistrict>
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
                loading={cityLoading}
                placeholder='Şəhər seçin'
                options={options || []}
                optionRender={option => <Space>{option.label}</Space>}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  )
}
