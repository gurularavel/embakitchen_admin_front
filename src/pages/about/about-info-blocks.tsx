import * as React from 'react'
import {
  Button,
  ConfigProvider,
  Space,
  Table,
  TablePaginationConfig,
  TableProps,
} from 'antd'
import { AddBlockDrawer } from '~ek/pages/about/add-info-block'
import { EditInfoBlock } from '~ek/pages/about/edit-info-block'
import { ErrorMessage, Loading, RenderIf, NoData } from '~ek/shared/components'
import { confirmModal, notifier } from '~ek/shared/helpers'
import { NOTIFICATION } from '~ek/shared/const/constants'
import type { InfoBlock } from '~ek/types/about'
import { PlusOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons'
import {
  useDeleteInfoBlocksMutation,
  useGetInfoBlocksQuery,
} from '~ek/redux/api/about'

export function AboutInfoBlocks(): React.ReactElement {
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([])
  const [selectedInfoBlock, setSelectedInfoBlock] =
    React.useState<InfoBlock | null>(null)
  const [pageParams, setPageParams] = React.useState<IPageParams>({
    current: 1,
    pageSize: 10,
    total: 0,
  })
  const [drawerType, setDrawerType] = React.useState<'edit' | 'add' | null>(
    null,
  )
  const { data, isLoading, isError, isFetching } = useGetInfoBlocksQuery({
    page: pageParams.current,
    perPage: pageParams.pageSize,
  })

  const [deleteInfoBlock] = useDeleteInfoBlocksMutation()

  const handleTableChange = (pagination: TablePaginationConfig): void => {
    setPageParams(prev => ({
      ...prev,
      current: pagination.current || 1,
      pageSize: pagination.pageSize || 10,
    }))
  }

  const addInfoBlockDrawer = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation()
    setDrawerType('add')
  }

  const handleEditButton = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    block: InfoBlock,
  ) => {
    e.stopPropagation()
    setDrawerType('edit')
    setSelectedInfoBlock(block)
  }

  const onClose = () => {
    setDrawerType(null)
    setSelectedRowKeys([])
  }

  const rowSelection: TableProps<InfoBlock>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(selectedRowKeys)
    },
  }
  const removeBlock = async (ids: number[]): Promise<void> => {
    try {
      await deleteInfoBlock({ ids: ids }).unwrap()
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
      title: 'Info Bloklar',
      dataIndex: 'title',
      key: 'title',
      render: (_: string, block: InfoBlock, i: number) => (
        <h2>
          {(pageParams.current - 1) * pageParams.pageSize + ++i}.{' '}
          {block.title['az']}
        </h2>
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      render: (_: string, block: InfoBlock) => (
        <Space size='middle'>
          <Button onClick={e => handleEditButton(e, block)}>
            <FormOutlined />
          </Button>
          <Button
            danger
            onClick={() =>
              confirmModal({
                title: 'Silmək istədiyinizdən əminsiniz?',
                onOk: () => {
                  removeBlock([block.id])
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
                  onOk: () => removeBlock(selectedRowKeys as number[]),
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
              onClick={e => addInfoBlockDrawer(e)}
            >
              Block əlavə et
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
          <AddBlockDrawer
            open={!!drawerType}
            onClose={onClose}
          />
        )}
        {drawerType === 'edit' && selectedInfoBlock && (
          <EditInfoBlock
            open={!!drawerType}
            onClose={onClose}
            block={selectedInfoBlock}
          />
        )}
      </RenderIf>
    </>
  )
}
