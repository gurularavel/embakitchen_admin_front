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
  Upload,
} from 'antd'
import type { UploadFile } from 'antd/lib'
import { Loading, RenderIf } from '~ek/shared/components'
import { createFormData, notifier } from '~ek/shared/helpers'
import { NOTIFICATION } from '~ek/shared/const/constants'
import type { IFormProduct } from '~ek/types/product'
import { UploadOutlined } from '@ant-design/icons'
import {
  useGetProductsQuery,
  usePostProductMutation,
} from '~ek/redux/api/product/products'
import { useGetTagsQuery } from '~ek/redux/api/tags'
import { useGetColorsQuery } from '~ek/redux/api/colors'
import { useGetCategoriesQuery } from '~ek/redux/api/product/product-category'
import { useFormStyle } from '~ek/shared/utilities/formStyles'
import { RichTextEditor } from '~ek/shared/components/richtext'

interface IDrawerProps {
  open: boolean
  onClose: () => void
}

export function AddProduct({
  open,
  onClose,
}: IDrawerProps): React.ReactElement {
  const [form] = Form.useForm()
  const formStyle = useFormStyle()

  const { data: productsData } = useGetProductsQuery({ page: 1, status: true })
  const { data: teqData } = useGetTagsQuery({ page: 1, status: true })
  const { data: colorsData } = useGetColorsQuery({ page: 1, status: true })
  const { data: categoryData } = useGetCategoriesQuery({
    page: 1,
    status: true,
  })
  const [addProduct, { isLoading }] = usePostProductMutation()

  const [contentRichText, setContentRichText] = React.useState<ILangContent>({
    az: '',
    ru: '',
    en: '',
  })
  const productsOptions = productsData?.data?.map(d => ({
    value: d.id,
    label: d.title.az,
  }))
  const teqOptions = teqData?.data?.map(d => ({
    value: d.id,
    label: d.title.az,
  }))
  const colorsOptions = colorsData?.data?.map(d => ({
    value: d.id,
    label: d.title.az,
  }))
  const categoriesOptions = categoryData?.data?.map(d => ({
    value: d.id,
    label: d.title.az,
  }))

  const handleRichContent = (field: 'az' | 'ru' | 'en', content: string) => {
    setContentRichText(prevState => ({ ...prevState, [field]: content }))
  }

  const onFinish: FormProps<IFormProduct>['onFinish'] = async (
    values: IFormProduct,
  ) => {
    const formValues = {
      ...values,
      content: contentRichText,
      tag_ids: Array.isArray(values.tag_ids)
        ? values.tag_ids
        : [values.tag_ids],
    }
    const formData = createFormData(formValues)
    try {
      await addProduct(formData).unwrap()
      notifier('Yeni məhsul yaradıldı', NOTIFICATION.success)
      onClose()
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : 'An unexpected error occurred'
      notifier(errorMessage, NOTIFICATION.error)
    }
  }
  return (
    <Drawer
      title='Yeni Məhsul'
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
            disabled={isLoading}
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
        onFinish={onFinish}
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
            <Form.Item<IFormProduct>
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
            <Form.Item<IFormProduct>
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
            <Form.Item<IFormProduct>
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
            <Form.Item<IFormProduct>
              name={['style', 'az']}
              label='Stil(az)'
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: 'Zəhmət olmasa stil əlavə edin(az)',
                },
              ]}
            >
              <Input placeholder='Stil(az)' />
            </Form.Item>
          </Col>
          <Col
            xs={24}
            sm={12}
            md={8}
          >
            <Form.Item<IFormProduct>
              name={['style', 'en']}
              label='Stil(en)'
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: 'Zəhmət olmasa stil əlavə edin(en)',
                },
              ]}
            >
              <Input placeholder='Stil(en)' />
            </Form.Item>
          </Col>
          <Col
            xs={24}
            sm={12}
            md={8}
          >
            <Form.Item<IFormProduct>
              name={['style', 'ru']}
              label='Stil(ru)'
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: 'Zəhmət olmasa stil əlavə edin(ru)',
                },
              ]}
            >
              <Input placeholder='Stil(ru)' />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16 }}>
          <Col
            xs={24}
            sm={12}
            md={8}
          >
            <Form.Item<IFormProduct>
              name={['facade', 'az']}
              label='Fasad(az)'
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: 'Zəhmət olmasa fasad əlavə edin(az)',
                },
              ]}
            >
              <Input placeholder='Fasad(az)' />
            </Form.Item>
          </Col>
          <Col
            xs={24}
            sm={12}
            md={8}
          >
            <Form.Item<IFormProduct>
              name={['facade', 'en']}
              label='Fasad(en)'
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: 'Zəhmət olmasa fasad əlavə edin(en)',
                },
              ]}
            >
              <Input placeholder='Fasad(en)' />
            </Form.Item>
          </Col>
          <Col
            xs={24}
            sm={12}
            md={8}
          >
            <Form.Item<IFormProduct>
              name={['facade', 'ru']}
              label='Fasad(ru)'
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: 'Zəhmət olmasa fasad əlavə edin(ru)',
                },
              ]}
            >
              <Input placeholder='Fasad(ru)' />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16 }}>
          <Col
            xs={24}
            sm={12}
            md={8}
          >
            <Form.Item<IFormProduct>
              name={['decor', 'az']}
              label='Dekor(az)'
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: 'Zəhmət olmasa dekor əlavə edin(az)',
                },
              ]}
            >
              <Input placeholder='Dekor(az)' />
            </Form.Item>
          </Col>
          <Col
            xs={24}
            sm={12}
            md={8}
          >
            <Form.Item<IFormProduct>
              name={['decor', 'en']}
              label='Dekor(en)'
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: 'Zəhmət olmasa dekor əlavə edin(en)',
                },
              ]}
            >
              <Input placeholder='Dekor(en)' />
            </Form.Item>
          </Col>
          <Col
            xs={24}
            sm={12}
            md={8}
          >
            <Form.Item<IFormProduct>
              name={['decor', 'ru']}
              label='Dekor(ru)'
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: 'Zəhmət olmasa dekor əlavə edin(ru)',
                },
              ]}
            >
              <Input placeholder='Dekor(ru)' />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16 }}>
          <Col
            xs={24}
            sm={12}
            md={8}
          >
            <Form.Item<IFormProduct>
              name={['design', 'az']}
              label='Dizayn(az)'
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: 'Zəhmət olmasa dizayn əlavə edin(az)',
                },
              ]}
            >
              <Input placeholder='Dizayn(az)' />
            </Form.Item>
          </Col>
          <Col
            xs={24}
            sm={12}
            md={8}
          >
            <Form.Item<IFormProduct>
              name={['design', 'en']}
              label='Dizayn(en)'
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: 'Zəhmət olmasa dizayn əlavə edin(en)',
                },
              ]}
            >
              <Input placeholder='Dizayn(en)' />
            </Form.Item>
          </Col>
          <Col
            xs={24}
            sm={12}
            md={8}
          >
            <Form.Item<IFormProduct>
              name={['design', 'ru']}
              label='Dizayn(ru)'
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: 'Zəhmət olmasa dizayn əlavə edin(ru)',
                },
              ]}
            >
              <Input placeholder='Dizayn(ru)' />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16 }}>
          <Col
            xs={24}
            sm={12}
            md={8}
          >
            <Form.Item<IFormProduct>
              name={['material', 'az']}
              label='Material(az)'
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: 'Zəhmət olmasa material əlavə edin(az)',
                },
              ]}
            >
              <Input placeholder='Material(az)' />
            </Form.Item>
          </Col>
          <Col
            xs={24}
            sm={12}
            md={8}
          >
            <Form.Item<IFormProduct>
              name={['material', 'en']}
              label='Material(en)'
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: 'Zəhmət olmasa material əlavə edin(en)',
                },
              ]}
            >
              <Input placeholder='Material(en)' />
            </Form.Item>
          </Col>
          <Col
            xs={24}
            sm={12}
            md={8}
          >
            <Form.Item<IFormProduct>
              name={['material', 'ru']}
              label='Material(ru)'
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: 'Zəhmət olmasa material əlavə edin(ru)',
                },
              ]}
            >
              <Input placeholder='Material(ru)' />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16 }}>
          <Col span={24}>
            <Form.Item<IFormProduct>
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
          <Col span={24}>
            <Form.Item<IFormProduct>
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
          <Col span={24}>
            <Form.Item<IFormProduct>
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
        <Row gutter={16}>
          <Col
            xs={24}
            sm={12}
          >
            <Form.Item<IFormProduct>
              name='similar_product_ids'
              label='Oxşar məhsulları seçin'
            >
              <Select
                mode='multiple'
                optionFilterProp='label'
                style={{ width: '100%' }}
                placeholder='Oxşar məhsulları seçin'
                options={productsOptions || []}
                optionRender={option => <Space>{option.label}</Space>}
              />
            </Form.Item>
          </Col>
          <Col
            xs={24}
            sm={12}
          >
            <Form.Item<IFormProduct>
              name='tag_ids'
              label='Məhsul teqi'
            >
              <Select
                style={{ width: '100%' }}
                optionFilterProp='label'
                placeholder='Teq seçin'
                options={teqOptions || []}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col
            xs={24}
            sm={12}
          >
            <Form.Item<IFormProduct>
              name='product_category_id'
              label='Kateqoriya seçin'
              rules={[
                {
                  required: true,
                  message: 'Zəhmət olmasa kateqoriya seçin',
                },
              ]}
            >
              <Select
                style={{ width: '100%' }}
                optionFilterProp='label'
                placeholder='Kateqoriya seçin'
                options={categoriesOptions || []}
                optionRender={option => <Space>{option.label}</Space>}
              />
            </Form.Item>
          </Col>
          <Col
            xs={24}
            sm={12}
          >
            <Form.Item<IFormProduct>
              name='color_ids'
              label='Məhsul rəngi'
              rules={[
                {
                  required: true,
                  message: 'Zəhmət olmasa rəng seçin',
                },
              ]}
            >
              <Select
                mode='multiple'
                optionFilterProp='label'
                style={{ width: '100%' }}
                placeholder='Rəng seçin'
                options={colorsOptions || []}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col
            xs={24}
            sm={12}
          >
            <Form.Item<IFormProduct>
              name='images'
              label='Məhsul şəkilləri'
              valuePropName='fileList'
              getValueFromEvent={e => {
                const fileList = Array.isArray(e) ? e : e?.fileList
                return fileList?.map(
                  (fileItem: UploadFile) => fileItem.originFileObj || fileItem,
                )
              }}
              rules={[
                {
                  required: true,
                  validator: (_, value) =>
                    value && value.length > 0
                      ? Promise.resolve()
                      : Promise.reject(
                        new Error('Zəhmət olmasa şəkil yükləyin'),
                      ),
                },
              ]}
            >
              <Upload
                name='images'
                accept='image/*'
                multiple
                listType='picture'
              >
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col
            xs={24}
            sm={12}
          >
            <Form.Item<IFormProduct>
              name='bannerImage'
              label='Əsas şəkil'
              valuePropName='fileList'
              getValueFromEvent={e => {
                const fileList = Array.isArray(e) ? e : e?.fileList
                return fileList?.map(
                  (fileItem: UploadFile) => fileItem.originFileObj || fileItem,
                )
              }}
              rules={[
                {
                  required: true,
                  validator: (_, value) =>
                    value && value.length > 0
                      ? Promise.resolve()
                      : Promise.reject(
                        new Error('Zəhmət olmasa şəkil yükləyin'),
                      ),
                },
              ]}
            >
              <Upload
                name='bannerImage'
                accept='image/*'
                listType='picture'
              >
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  )
}
