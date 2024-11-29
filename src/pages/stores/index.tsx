import * as React from 'react'
import {
  Button,
  ConfigProvider,
  Space,
  Table,
  TablePaginationConfig,
  TableProps,
} from 'antd'
import { AddStoreDrawer } from '~ek/pages/stores/add-store'
import { ErrorMessage, Loading, RenderIf, NoData } from '~ek/shared/components'
import { confirmModal, notifier } from '~ek/shared/helpers'
import { NOTIFICATION } from '~ek/shared/const/constants'
import type { IStore } from '~ek/types/store'
import { PlusOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons'
import { useDeleteStoreMutation, useGetStoresQuery } from '~ek/redux/api/store'

export function Stores(): React.ReactElement {
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedStore, setSelectedStore] = React.useState<IStore | null>(null)
  const [pageParams, setPageParams] = React.useState<IPageParams>({
    take: 10,
    current: 1,
    pageSize: 10,
    total: 0,
  })
  const [drawerType, setDrawerType] = React.useState<'edit' | 'add' | null>(
    null,
  )
  const { data, isLoading, isError } = useGetStoresQuery({
    page: pageParams.current,
  })

  const [deleteStore] = useDeleteStoreMutation()

  const handleTableChange = (pagination: TablePaginationConfig): void => {
    setPageParams(prev => ({
      ...prev,
      current: pagination.current || 1,
      pageSize: pagination.pageSize || 10,
    }))
  }

  const addStoreDrawer = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation()
    setDrawerType('add')
  }

  const handleEditButton = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    store: IStore,
  ) => {
    e.stopPropagation()
    setDrawerType('edit')
    setSelectedStore(store)
  }

  const onClose = () => {
    setDrawerType(null)
    setSelectedRowKeys([])
  }

  const rowSelection: TableProps<IStore>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(selectedRowKeys)
    },
  }
  const removeStore = async (ids: number[]): Promise<void> => {
    try {
      await deleteStore({ ids: ids })
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
      title: 'Mağazalar',
      dataIndex: 'title',
      key: 'title',
      render: (_: string, store: IStore, i: number) => (
        <h2>
          {i + 1}. {store.title['az']}
        </h2>
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      render: (_: string, store: IStore) => (
        <Space size='middle'>
          <Button onClick={e => handleEditButton(e, store)}>
            <FormOutlined />
          </Button>
          <Button
            danger
            onClick={() =>
              confirmModal({
                title: 'Silmək istədiyinizdən əminsiniz?',
                onOk: () => {
                  removeStore([store.id])
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
                  onOk: () => removeStore(selectedRowKeys as number[]),
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
              onClick={e => addStoreDrawer(e)}
            >
              Mağaza əlavə et
            </Button>
          </ConfigProvider>
        </div>
        <RenderIf condition={!data?.data.length}>
          <NoData />
        </RenderIf>
        <RenderIf condition={data?.data?.length}>
          <Table
            dataSource={data?.data}
            rowKey='id'
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
          <AddStoreDrawer
            open={!!drawerType}
            onClose={onClose}
          />
        )}
        {/* {drawerType === 'edit' && selectedPartner && (
          <EditPartner
            open={!!drawerType}
            onClose={onClose}
            partner={selectedPartner}
          />
        )} */}
      </RenderIf>
    </>
  )
}
