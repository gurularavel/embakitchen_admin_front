import * as React from 'react'
import {
  Button,
  ConfigProvider,
  Space,
  Table,
  TablePaginationConfig,
  TableProps,
} from 'antd'
import { AddCampaign } from '~ek/pages/campaigns/add-campaign'
import { EditCampaign } from '~ek/pages/campaigns/edit-campaign'
import { ErrorMessage, Loading, RenderIf, NoData } from '~ek/shared/components'
import { confirmModal, notifier } from '~ek/shared/helpers'
import { NOTIFICATION } from '~ek/shared/const/constants'
import type { ICampaign } from '~ek/types/campaigns'
import {
  PlusOutlined,
  DeleteOutlined,
  FormOutlined,
  PoweroffOutlined,
} from '@ant-design/icons'
import {
  useDeleteCampaignsMutation,
  useEditCampaignMutation,
  useGetCampaignsQuery,
} from '~ek/redux/api/campaign'

export function Campaigns(): React.ReactElement {
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([])
  const [selectedCampaign, setSelectedCampaign] =
    React.useState<ICampaign | null>(null)
  const [pageParams, setPageParams] = React.useState<IPageParams>({
    take: 10,
    current: 1,
    pageSize: 10,
    total: 0,
  })
  const [drawerType, setDrawerType] = React.useState<'edit' | 'add' | null>(
    null,
  )
  const { data, isLoading, isError } = useGetCampaignsQuery({
    page: pageParams.current,
  })

  const [deleteCampaign] = useDeleteCampaignsMutation()
  const [changeCampaignStatus, { isLoading: changeStatusLoading }] =
    useEditCampaignMutation()

  const handleTableChange = (pagination: TablePaginationConfig): void => {
    setPageParams(prev => ({
      ...prev,
      current: pagination.current || 1,
      pageSize: pagination.pageSize || 10,
    }))
  }

  const addCampaignDrawer = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation()
    setDrawerType('add')
  }

  const handleEditButton = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    campaign: ICampaign,
  ) => {
    e.stopPropagation()
    setDrawerType('edit')
    setSelectedCampaign(campaign)
  }

  const onClose = () => {
    setDrawerType(null)
    setSelectedRowKeys([])
  }

  const rowSelection: TableProps<ICampaign>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(selectedRowKeys)
    },
  }
  const removeCampaign = async (ids: number[]): Promise<void> => {
    try {
      await deleteCampaign({ ids: ids }).unwrap()
      notifier('Seçiminiz uğurla silindi', NOTIFICATION.success)
      setSelectedRowKeys([])
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : 'An unexpected error occurred'
      notifier(errorMessage, NOTIFICATION.error)
    }
  }

  const handleCampaignStatus = async (campaign: ICampaign) => {
    const formData = new FormData()
    formData.append('status', !campaign.status ? '1' : '0')
    formData.append('_method', 'PUT')

    try {
      await changeCampaignStatus({ id: campaign.id, formData }).unwrap()
      notifier('Dəyişiklik uğurla icra edildi', 'success')
      onClose()
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : 'An unexpected error occurred'
      notifier(errorMessage, NOTIFICATION.error)
    }
  }

  const columns = [
    {
      title: 'Kampaniyalar',
      dataIndex: 'title',
      key: 'title',
      render: (_: string, campaign: ICampaign, i: number) => (
        <h2>
          {i + 1}. {campaign.title['az']}
        </h2>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_: string, campaign: ICampaign) => (
        <Button
          type='default'
          className={
            campaign.status
              ? 'border-green-600 text-green-600 hover:!border-green-600 hover:!text-green-600'
              : 'border-red-500 text-red-500 hover:!border-red-500 hover:!text-red-500'
          }
          icon={<PoweroffOutlined />}
          size={'middle'}
          disabled={changeStatusLoading}
          onClick={() => handleCampaignStatus(campaign)}
        />
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      render: (_: string, campaign: ICampaign) => (
        <Space size='middle'>
          <Button onClick={e => handleEditButton(e, campaign)}>
            <FormOutlined />
          </Button>
          <Button
            danger
            onClick={() =>
              confirmModal({
                title: 'Silmək istədiyinizdən əminsiniz?',
                onOk: () => {
                  removeCampaign([campaign.id])
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
                  onOk: () => removeCampaign(selectedRowKeys as number[]),
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
              onClick={e => addCampaignDrawer(e)}
            >
              Kampaniya əlavə et
            </Button>
          </ConfigProvider>
        </div>
        <RenderIf condition={!data?.data?.length}>
          <NoData />
        </RenderIf>
        <RenderIf condition={data?.data?.length}>
          <Table
            dataSource={data?.data.map((campaign: ICampaign) => ({
              ...campaign,
              key: campaign.id,
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
          <AddCampaign
            open={!!drawerType}
            onClose={onClose}
          />
        )}
        {drawerType === 'edit' && selectedCampaign && (
          <EditCampaign
            open={!!drawerType}
            onClose={onClose}
            campaign={selectedCampaign}
          />
        )}
      </RenderIf>
    </>
  )
}
