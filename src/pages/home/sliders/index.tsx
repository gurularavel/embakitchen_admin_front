import * as React from 'react'
import {
  Button,
  ConfigProvider,
  Space,
  Table,
  TablePaginationConfig,
  TableProps,
} from 'antd'
import { AddSlider } from '~ek/pages/home/sliders/add-slider'
import { EditSlider } from '~ek/pages/home/sliders/edit-slider'
import { ErrorMessage, Loading, RenderIf, NoData } from '~ek/shared/components'
import { NOTIFICATION } from '~ek/shared/const/constants'
import { confirmModal, notifier } from '~ek/shared/helpers'
import type { ISlider } from '~ek/types/home/slider'
import { PlusOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons'
import {
  useDeleteSliderMutation,
  useGetSlidersQuery,
} from '~ek/redux/api/home/slider'

export function Sliders(): React.ReactElement {
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([])
  const [selectedSlider, setSelectedSlider] = React.useState<ISlider | null>(
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
  const { data, isLoading, isError, isFetching } = useGetSlidersQuery({
    page: pageParams.current,
    perPage: pageParams.pageSize,
  })

  const [deleteSldier] = useDeleteSliderMutation()

  const handleTableChange = (pagination: TablePaginationConfig): void => {
    setPageParams(prev => ({
      ...prev,
      current: pagination.current || 1,
      pageSize: pagination.pageSize || 10,
    }))
  }

  const addSliderDrawer = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation()
    setDrawerType('add')
  }

  const handleEditButton = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    slider: ISlider,
  ) => {
    e.stopPropagation()
    setDrawerType('edit')
    setSelectedSlider(slider)
  }

  const onClose = () => {
    setDrawerType(null)
    setSelectedRowKeys([])
  }

  const rowSelection: TableProps<ISlider>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(selectedRowKeys)
    },
  }
  const removeSlider = async (ids: number[]): Promise<void> => {
    try {
      await deleteSldier({ ids: ids })
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
      title: 'Slider',
      dataIndex: 'title',
      key: 'title',
      render: (_: string, partner: ISlider, i: number) => (
        <h2>
          {(pageParams.current - 1) * pageParams.pageSize + ++i}.{' '}
          {partner.title['az']}
        </h2>
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      render: (_: string, slider: ISlider) => (
        <Space size='middle'>
          <Button onClick={e => handleEditButton(e, slider)}>
            <FormOutlined />
          </Button>
          <Button
            danger
            onClick={() =>
              confirmModal({
                title: 'Silmək istədiyinizdən əminsiniz?',
                onOk: () => {
                  removeSlider([slider.id])
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
                  onOk: () => removeSlider(selectedRowKeys as number[]),
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
              onClick={e => addSliderDrawer(e)}
            >
              Slider əlavə et
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
          <AddSlider
            open={!!drawerType}
            onClose={onClose}
          />
        )}
        {drawerType === 'edit' && selectedSlider && (
          <EditSlider
            open={!!drawerType}
            onClose={onClose}
            slider={selectedSlider}
          />
        )}
      </RenderIf>
    </>
  )
}
