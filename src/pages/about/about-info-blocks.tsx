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
import { Loading, RenderIf, ErrorMessage } from '~ek/shared/components'
import { confirmModal } from '~ek/shared/helpers'
import {
  useDeleteInfoBlocksMutation,
  useGetInfoBlocksQuery,
} from '~ek/redux/api/about'
import { InfoBlock } from '~ek/types/about'
import { FormOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons'

export function AboutInfoBlocks(): React.ReactElement {
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([])
  const [selectedBlock, setSelectedBlock] = React.useState<InfoBlock | null>(
    null,
  )
  const [pageParams, setPageParams] = React.useState<IPageParams>({
    take: 10,
    current: 1,
    pageSize: 10,
    total: 0,
  })
  const [drawerType, setDrawerType] = React.useState<'edit' | 'add' | null>(
    null,
  )
  const { data, isLoading, isError } = useGetInfoBlocksQuery({
    page: pageParams.current,
  })

  const [deleteBlocks] = useDeleteInfoBlocksMutation()

  const handleTableChange = (pagination: TablePaginationConfig): void => {
    setPageParams(prev => ({
      ...prev,
      current: pagination.current || 1,
      pageSize: pagination.pageSize || 10,
    }))
  }

  const addBlockDrawer = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation()
    setDrawerType('add')
  }

  const handleEditButton = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    block: InfoBlock,
  ) => {
    e.stopPropagation()
    setDrawerType('edit')
    setSelectedBlock(block)
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

  const removeBlocks = async (ids: number[]): Promise<void> => {
    try {
      await deleteBlocks({ ids: ids })
      setSelectedRowKeys([])
    } catch (e) {
      alert(e)
    }
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
          <Button onClick={e => handleEditButton(e, block)}>
            <FormOutlined />
          </Button>
          <Button
            danger
            onClick={() =>
              confirmModal({
                title: 'Silmək istədiyinizdən əminsiniz?',
                onOk: () => {
                  removeBlocks([block.id])
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
                  onOk: () => removeBlocks(selectedRowKeys as number[]),
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
              onClick={e => addBlockDrawer(e)}
            >
              Blok əlavə et
            </Button>
          </ConfigProvider>
        </div>
        <RenderIf condition={data?.data?.length}>
          <Table
            dataSource={data?.data.map((block: InfoBlock) => ({
              ...block,
              key: block.id,
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

          {drawerType === 'add' && (
            <AddBlockDrawer
              open={!!drawerType}
              onClose={onClose}
            />
          )}
          {drawerType === 'edit' && selectedBlock && (
            <EditInfoBlock
              open={!!drawerType}
              onClose={onClose}
              block={selectedBlock}
            />
          )}
        </RenderIf>
      </RenderIf>
    </>
  )
}
