import * as React from 'react'
import { Select, Space, Table, TablePaginationConfig, TableProps } from 'antd'
import { ErrorMessage, Loading, RenderIf, NoData } from '~ek/shared/components'
import { confirmModal, notifier } from '~ek/shared/helpers'
import { NOTIFICATION } from '~ek/shared/const/constants'
import type { IOrder } from '~ek/types/order'
import { DeleteOutlined } from '@ant-design/icons'
import {
  useDeleteOrderMutation,
  useGetOrdersQuery,
  useAddOrderStatusMutation,
} from '~ek/redux/api/order'
import { useGetOrderStatusesQuery } from '~ek/redux/api/order-status'

export function Order(): React.ReactElement {
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([])
  const [pageParams, setPageParams] = React.useState<IPageParams>({
    current: 1,
    pageSize: 10,
    total: 0,
  })

  const { data, isLoading, isError, isFetching } = useGetOrdersQuery({
    page: pageParams.current,
    perPage: pageParams.pageSize,
  })

  const { data: statuses, isLoading: statusLoading } = useGetOrderStatusesQuery(
    { page: 1 },
  )
  const orderStatusesOptions = statuses?.data?.map(s => ({
    value: s.id,
    label: s.title.az,
  }))

  const [deleteOrder] = useDeleteOrderMutation()
  const [addOrderStatus] = useAddOrderStatusMutation()

  const handleTableChange = (pagination: TablePaginationConfig): void => {
    setPageParams(prev => ({
      ...prev,
      current: pagination.current || 1,
      pageSize: pagination.pageSize || 10,
    }))
  }

  const rowSelection: TableProps<IOrder>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(selectedRowKeys)
    },
  }
  const removeOrder = async (ids: number[]): Promise<void> => {
    try {
      await deleteOrder({ ids: ids }).unwrap()
      setSelectedRowKeys([])
      notifier('Seçiminiz uğurla silindi', NOTIFICATION.success)
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : 'An unexpected error occurred'
      notifier(errorMessage, NOTIFICATION.error)
    }
  }

  const changeOrderStatus = async (
    order_id: number,
    track_order_status_id: number,
  ): Promise<void> => {
    try {
      await addOrderStatus({ order_id, track_order_status_id }).unwrap()
      notifier('Sifariş statusu dəyişdirildi', NOTIFICATION.success)
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : 'An unexpected error occurred'
      notifier(errorMessage, NOTIFICATION.error)
    }
  }

  const getCurrentStatusValue = (order: IOrder) => {
    if (order.trackOrderStatuses.length > 0) {
      return order.trackOrderStatuses[0]?.id
    }
    return orderStatusesOptions?.find(
      status => status.label === 'əlaqə saxlanılmayıb',
    )?.value
  }

  const columns = [
    {
      title: 'Sifarişlər',
      dataIndex: 'title',
      key: 'title',
      render: (_: string, order: IOrder, i: number) => (
        <h2>
          {(pageParams.current - 1) * pageParams.pageSize + ++i}.{' '}
          {order.user.name} {order.user.surname}
        </h2>
      ),
    },
    {
      title: 'Məhsul',
      dataIndex: 'product',
      key: 'product',
      render: (_: string, order: IOrder) => (
        <span>
          {order.products.map(product => product.title.az).join(', ')}
        </span>
      ),
    },
    {
      title: 'Ünvan',
      dataIndex: 'address',
      key: 'address',
      render: (_: string, order: IOrder) => (
        <span>
          {order.city.title.az}, {order.address}
        </span>
      ),
    },
    {
      title: 'Telefon',
      dataIndex: 'phone',
      key: 'phone',
      render: (_: string, order: IOrder) => <span>{order.phone}</span>,
    },
    {
      title: 'Sifariş statusu',
      dataIndex: 'orderStatus',
      key: 'trackOrderStatuses',
      render: (_: string, order: IOrder) => (
        <Select
          optionFilterProp='label'
          style={{ width: '100%' }}
          value={getCurrentStatusValue(order)}
          onChange={value => changeOrderStatus(order.id, value)}
          placeholder='Sifariş statusu'
          options={orderStatusesOptions || []}
          optionRender={option => <Space>{option.label}</Space>}
          loading={statusLoading}
        />
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
                  onOk: () => removeOrder(selectedRowKeys as number[]),
                })
              }
            />
          </RenderIf>
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
      </RenderIf>
    </>
  )
}
