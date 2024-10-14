import * as React from 'react'
import {
  Button,
  ConfigProvider,
  Space,
  Table,
  TablePaginationConfig,
  TableProps,
} from 'antd'
import { AddCounterDrawer } from '~ek/pages/home/counters/add-counter'
import { EditCounter } from '~ek/pages/home/counters/edit-counter'
import { ErrorMessage, Loading, RenderIf } from '~ek/shared/components'
import { ConfirmModal } from '~ek/shared/helpers'
import {
  useDeleteCounterMutation,
  useGetCountsQuery,
} from '~ek/redux/api/home/counter'
import { ICounter } from '~ek/types/home/counter'
import { PlusOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons'
import { errorNotifier } from '~ek/shared/components/error-notification'

export function Counter(): React.ReactElement {
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([])
  const [selectedCounter, setSelectedCounter] = React.useState<ICounter | null>(
    null,
  )
  const [pageParams, setPageParams] = React.useState<IPageParams>({
    take: 10,
    current: 1,
    pageSize: 10,
  })
  const [drawerType, setDrawerType] = React.useState<'edit' | 'add' | null>(
    null,
  )
  const { data, isLoading, isError } = useGetCountsQuery({
    page: pageParams.current,
  })

  const [deleteCounter] = useDeleteCounterMutation()

  const handleTableChange = (pagination: TablePaginationConfig): void => {
    setPageParams(prev => ({
      ...prev,
      current: pagination.current || 1,
      pageSize: pagination.pageSize || 10,
    }))
  }

  const addCounterDrawer = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation()
    setDrawerType('add')
  }

  const handleEditButton = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    count: ICounter,
  ) => {
    e.stopPropagation()
    setDrawerType('edit')
    setSelectedCounter(count)
  }

  const onClose = () => {
    setDrawerType(null)
    setSelectedRowKeys([])
  }

  const rowSelection: TableProps<ICounter>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(selectedRowKeys)
    },
  }
  const removeCounter = async (ids: number[]): Promise<void> => {
    try {
      await deleteCounter({ ids: ids })
      setSelectedRowKeys([])
    } catch (e: unknown) {
      errorNotifier(e as string)
    }
  }

  const columns = [
    {
      title: 'Sayğac',
      dataIndex: 'title',
      key: 'title',
      render: (_: string, counter: ICounter, i: number) => (
        <h2>
          {i + 1}. {counter.title['az']}
        </h2>
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      render: (_: string, counter: ICounter) => (
        <Space size='middle'>
          <Button onClick={e => handleEditButton(e, counter)}>
            <FormOutlined />
          </Button>
          <Button
            danger
            onClick={() =>
              ConfirmModal({
                title: 'Silmək istədiyinizdən əminsiniz?',
                onOk: () => {
                  removeCounter([counter.id])
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
                ConfirmModal({
                  title: 'Silmək istədiyinizdən əminsiniz?',
                  onOk: () => removeCounter(selectedRowKeys as number[]),
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
              onClick={e => addCounterDrawer(e)}
            >
              Sayğac əlavə et
            </Button>
          </ConfigProvider>
        </div>
        <RenderIf condition={data?.data?.length}>
          <Table
            dataSource={data?.data.map((count: ICounter) => ({
              ...count,
              key: count.id,
            }))}
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
          <AddCounterDrawer
            open={!!drawerType}
            onClose={onClose}
          />
        )}
        {drawerType === 'edit' && selectedCounter && (
          <EditCounter
            open={!!drawerType}
            onClose={onClose}
            counter={selectedCounter}
          />
        )}
      </RenderIf>
    </>
  )
}
