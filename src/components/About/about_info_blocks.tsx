import * as React from 'react'
import {
  PoweroffOutlined,
  PlusOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import { Button, Table, Tooltip } from 'antd'
import { useGetInfoBlocksQuery } from '~ek/redux/api/about'
import { Loading, RenderIf } from '~ek/shared/components'
import { ErrorMessage } from '~ek/shared/components/ErrorMessage'
import { InfoBlock } from '~ek/types/about'

export const About_Info_Blocks = () => {
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([])
  const [pageParams, setPageParams] = React.useState<IPageParams>({
    take: 10,
    currentPage: 1,
    pageSize: 10,
  })
  const { data, isLoading, isError } = useGetInfoBlocksQuery()

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
      render: (_: string, block: InfoBlock) => (
        <Button
          type='default'
          className={
            block.status
              ? 'border text-teal-600 hover:!border-teal-600 hover:!text-teal-600'
              : 'border text-red-500 hover:!border-red-500 hover:!text-red-500'
          }
          icon={<PoweroffOutlined />}
          size={'middle'}
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
      {!isError && !isLoading && data?.data?.length && (
        <div>
          <div className='flex justify-end items-center mb-3'>
            {selectedRowKeys.length ? (
              <DeleteOutlined className='mr-3 text-xl text-red-500 cursor-pointer' />
            ) : (
              ''
            )}
            <Tooltip title='Add Block'>
              <Button
                className='p-3.5 bg-slate-100 text-teal-600 hover:!bg-teal-600 hover:!text-white !border-none outline-none'
                shape='circle'
                icon={<PlusOutlined />}
              />
            </Tooltip>
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
        </div>
      )}
    </>
  )
}
