import * as React from 'react'
import { FormOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, ConfigProvider, Space, Table } from 'antd'
import {
  useDeleteInfoBlocksMutation,
  useGetInfoBlocksQuery,
} from '~ek/redux/api/about'
import { AddBlockDrawer } from '~ek/pages/about/add-block-drawer'
import { Loading, RenderIf } from '~ek/shared/components'
import { ErrorMessage } from '~ek/shared/components/error-message'
import { confirmModal } from '~ek/shared/helpers'
import { InfoBlock } from '~ek/types/about'

export function AboutInfoBlocks(): React.ReactElement {
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([])
  const [pageParams, setPageParams] = React.useState<IPageParams>({
    take: 10,
    currentPage: 1,
    pageSize: 10,
  })
  const [drawerType, setDrawerType] = React.useState<'edit' | 'add' | null>(
    null,
  )
  const { data, isLoading, isError } = useGetInfoBlocksQuery()
  const [deleteBlocks] = useDeleteInfoBlocksMutation()

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const handleTableChange = (pagination: IPageParams) => {
    setPageParams(prev => ({
      ...prev,
      currentPage: pagination.currentPage,
      pageSize: pagination.pageSize,
    }))
  }

  const onClose = () => {
    setDrawerType(null)
    setSelectedRowKeys([])
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  const columns = [
    {
      title: 'Info Blok',
      dataIndex: 'title',
      key: 'title',
      render: (_: string, block: InfoBlock, i: number) => (
        <h2>
          {i + 1}. {block.title['az']}
        </h2>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_: string, block: InfoBlock) =>
        block.status ? (
          <span className={'text-teal-500'}>Active</span>
        ) : (
          <span className={'text-red-500'}>Deactive</span>
        ),
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      render: (_: string, block: InfoBlock) => (
        <Space size='middle'>
          <Button>
            <FormOutlined />
          </Button>
          <Button
            danger
            onClick={() =>
              confirmModal({
                title: 'Silmək istədiyinizdən əminsiniz?',
                onOk: () => {
                  deleteBlocks({ ids: [block.id] })
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
      <RenderIf condition={!isError && !isLoading && data?.data?.length}>
        <div>
          <div className='flex justify-end items-center mb-3'>
            {selectedRowKeys.length ? (
              <DeleteOutlined
                className='mr-3 text-xl text-red-500 cursor-pointer'
                onClick={() =>
                  confirmModal({
                    title: 'Silmək istədiyinizdən əminsiniz?',
                    onOk: () => deleteBlocks({ ids: selectedRowKeys }),
                  })
                }
              />
            ) : (
              ''
            )}
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
                onClick={e => {
                  e.stopPropagation()
                  setDrawerType('add')
                }}
              >
                Blok əlavə et
              </Button>
            </ConfigProvider>
          </div>
          <Table
            dataSource={data?.data.map((block: InfoBlock, i) => ({
              ...block,
              key: i,
            }))}
            rowSelection={rowSelection}
            columns={columns}
            pagination={{
              current: pageParams.currentPage,
              pageSize: pageParams.pageSize,
              total: data?.pagination.total,
            }}
            onChange={() => handleTableChange}
            className='overflow-x-auto'
          />

          {drawerType === 'add' && (
            <AddBlockDrawer
              open={!!drawerType}
              onClose={onClose}
            />
          )}
        </div>
      </RenderIf>
    </>
  )
}
