import * as React from 'react'
import {
  Button,
  ConfigProvider,
  Space,
  Table,
  TablePaginationConfig,
  TableProps,
} from 'antd'
import { AddDistrict } from '~ek/pages/districts/add-district'
import { EditDistrict } from '~ek/pages/districts/edit-district'
import { ErrorMessage, Loading, RenderIf, NoData } from '~ek/shared/components'
import { confirmModal, notifier } from '~ek/shared/helpers'
import { NOTIFICATION } from '~ek/shared/const/constants'
import type { IDistrict } from '~ek/types/district'
import { PlusOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons'
import {
  useDeleteDistrictsMutation,
  useGetDistrictsQuery,
} from '~ek/redux/api/district'

export function District(): React.ReactElement {
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([])
  const [selectedDistrict, setSelectedDistrict] =
    React.useState<IDistrict | null>(null)
  const [pageParams, setPageParams] = React.useState<IPageParams>({
    current: 1,
    pageSize: 10,
    total: 0,
  })
  const [drawerType, setDrawerType] = React.useState<'edit' | 'add' | null>(
    null,
  )
  const { data, isLoading, isError, isFetching } = useGetDistrictsQuery({
    page: pageParams.current,
    perPage: pageParams.pageSize,
  })

  const [deleteDistrict] = useDeleteDistrictsMutation()

  const handleTableChange = (pagination: TablePaginationConfig): void => {
    setPageParams(prev => ({
      ...prev,
      current: pagination.current || 1,
      pageSize: pagination.pageSize || 10,
    }))
  }

  const addDistrictDrawer = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation()
    setDrawerType('add')
  }

  const handleEditButton = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    district: IDistrict,
  ) => {
    e.stopPropagation()
    setDrawerType('edit')
    setSelectedDistrict(district)
  }

  const onClose = () => {
    setDrawerType(null)
    setSelectedRowKeys([])
  }

  const rowSelection: TableProps<IDistrict>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(selectedRowKeys)
    },
  }
  const removeDistrict = async (ids: number[]): Promise<void> => {
    try {
      await deleteDistrict({ ids: ids }).unwrap()
      setSelectedRowKeys([])
      notifier('Seçiminiz uğurla silindi', NOTIFICATION.success)
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : 'An unexpected error occurred'
      notifier(errorMessage, NOTIFICATION.error)
    }
  }

  const columns = [
    {
      title: 'Rayonlar',
      dataIndex: 'title',
      key: 'title',
      render: (_: string, district: IDistrict, i: number) => (
        <h2>
          {(pageParams.current - 1) * pageParams.pageSize + ++i}.{' '}
          {district.title['az']}
        </h2>
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      render: (_: string, district: IDistrict) => (
        <Space size='middle'>
          <Button onClick={e => handleEditButton(e, district)}>
            <FormOutlined />
          </Button>
          <Button
            danger
            onClick={() =>
              confirmModal({
                title: 'Silmək istədiyinizdən əminsiniz?',
                onOk: () => {
                  removeDistrict([district.id])
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
                  onOk: () => removeDistrict(selectedRowKeys as number[]),
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
              onClick={e => addDistrictDrawer(e)}
            >
              Rayon əlavə et
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
          <AddDistrict
            open={!!drawerType}
            onClose={onClose}
          />
        )}
        {drawerType === 'edit' && selectedDistrict && (
          <EditDistrict
            open={!!drawerType}
            onClose={onClose}
            district={selectedDistrict}
          />
        )}
      </RenderIf>
    </>
  )
}
