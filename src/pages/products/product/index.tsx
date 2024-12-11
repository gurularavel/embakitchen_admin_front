import * as React from 'react'
import {
  Button,
  ConfigProvider,
  Space,
  Table,
  TablePaginationConfig,
  TableProps,
} from 'antd'
import { AddProduct } from '~ek/pages/products/product/add-product'
import { EditProduct } from '~ek/pages/products/product/edit-product'
import { ErrorMessage, Loading, RenderIf, NoData } from '~ek/shared/components'
import { confirmModal, notifier } from '~ek/shared/helpers'
import { NOTIFICATION } from '~ek/shared/const/constants'
import type { IProduct } from '~ek/types/product'
import { PlusOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons'
import {
  useGetProductsQuery,
  useDeleteProductsMutation,
} from '~ek/redux/api/product/products'

export function Products(): React.ReactElement {
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([])
  const [selectedProduct, setSelectedProduct] = React.useState<IProduct | null>(
    null,
  )
  const [pageParams, setPageParams] = React.useState<IPageParams>({
    current: 1,
    pageSize: 10,
    total: 0,
  })
  const [drawerType, setDrawerType] = React.useState<'edit' | 'add' | null>(
    null,
  )
  const { data, isLoading, isError, isFetching } = useGetProductsQuery({
    page: pageParams.current,
    perPage: pageParams.pageSize,
  })

  const [deleteProduct] = useDeleteProductsMutation()

  const handleTableChange = (pagination: TablePaginationConfig): void => {
    setPageParams(prev => ({
      ...prev,
      current: pagination.current || 1,
      pageSize: pagination.pageSize || 10,
    }))
  }

  const addProjectDrawer = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation()
    setDrawerType('add')
  }

  const handleEditButton = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    product: IProduct,
  ) => {
    e.stopPropagation()
    setDrawerType('edit')
    setSelectedProduct(product)
  }

  const onClose = () => {
    setDrawerType(null)
    setSelectedRowKeys([])
  }

  const rowSelection: TableProps<IProduct>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(selectedRowKeys)
    },
  }
  const removeProduct = async (ids: number[]): Promise<void> => {
    try {
      await deleteProduct({ ids: ids }).unwrap()
      notifier('Seçiminiz uğurla silindi', NOTIFICATION.success)
      setSelectedRowKeys([])
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : 'An unexpected error occurred'
      notifier(errorMessage, NOTIFICATION.error)
    }
  }

  const columns = [
    {
      title: 'Məhsullar',
      dataIndex: 'title',
      key: 'title',
      render: (_: string, product: IProduct, i: number) => (
        <h2>
          {(pageParams.current - 1) * pageParams.pageSize + ++i}.{' '}
          {product.title['az']}
        </h2>
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      render: (_: string, product: IProduct) => (
        <Space size='middle'>
          <Button onClick={e => handleEditButton(e, product)}>
            <FormOutlined />
          </Button>
          <Button
            danger
            onClick={() =>
              confirmModal({
                title: 'Silmək istədiyinizdən əminsiniz?',
                onOk: () => {
                  removeProduct([product.id])
                },
              })
            }
          >
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <>
      <RenderIf condition={isError}>
        <ErrorMessage message='Məlumatların yüklənməsində xəta baş verdi' />
      </RenderIf>
      <RenderIf condition={isLoading}>
        <Loading />
      </RenderIf>
      <RenderIf condition={!isError && !isLoading}>
        <div className='flex justify-end items-center mb-3'>
          <RenderIf condition={selectedRowKeys.length}>
            <DeleteOutlined
              className='mr-3 text-xl text-red-500 cursor-pointer'
              onClick={() =>
                confirmModal({
                  title: 'Silmək istədiyinizdən əminsiniz?',
                  onOk: () => removeProduct(selectedRowKeys as number[]),
                })
              }
            />
          </RenderIf>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#00b96b',
              },
            }}
          >
            <Button
              type='primary'
              icon={<PlusOutlined />}
              onClick={e => addProjectDrawer(e)}
            >
              Məhsul əlavə et
            </Button>
          </ConfigProvider>
        </div>
        <RenderIf condition={!data?.data?.length}>
          <NoData />
        </RenderIf>
        <RenderIf condition={data?.data?.length}>
          <Table
            dataSource={data?.data}
            rowKey='id'
            loading={isFetching}
            rowSelection={rowSelection}
            columns={columns}
            pagination={{
              current: pageParams.current,
              pageSize: pageParams.pageSize,
              total: data?.pagination.total,
            }}
            onChange={handleTableChange}
            className='overflow-x-auto'
          />
        </RenderIf>
        {drawerType === 'add' && (
          <AddProduct
            open={!!drawerType}
            onClose={onClose}
          />
        )}
        {drawerType === 'edit' && selectedProduct && (
          <EditProduct
            open={!!drawerType}
            onClose={onClose}
            product_id={selectedProduct.id}
          />
        )}
      </RenderIf>
    </>
  )
}
