import * as React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ConfigProvider, Menu, Layout } from 'antd'
import { URLS } from '~ek/shared/const/constants'
import {
  ExpandOutlined,
  BarChartOutlined,
  BankOutlined,
  PictureOutlined,
  ProfileOutlined,
  ProjectOutlined,
  GoldOutlined,
  BgColorsOutlined,
  FundOutlined,
  PicCenterOutlined,
  HighlightOutlined,
  AlignCenterOutlined,
  GlobalOutlined,
  TagOutlined,
  EnvironmentOutlined,
  FundProjectionScreenOutlined,
  FundViewOutlined,
  BlockOutlined,
  BorderOutlined,
  AppstoreOutlined,
  PieChartOutlined,
  BuildOutlined,
  SearchOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons'
import logo from '~ek/assets/images/132x20.67.svg'
const { Sider } = Layout

interface IProps {
  collapsed: boolean
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

interface IMenu {
  key: string
  label: React.ReactNode
  path?: string
  icon?: React.ReactNode
  children?: IMenu[]
}

const siderStyle: React.CSSProperties = {
  overflow: 'auto',
  height: '100vh',
  position: 'fixed',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable',
}

const items: IMenu[] = [
  {
    key: '1',
    label: 'Əsas Səhifə',
    icon: <BankOutlined className={'!text-lg'} />,
    children: [
      {
        key: URLS.HOME_COMMON_INFO,
        label: <Link to={URLS.HOME_COMMON_INFO}>Ümumi məlumatlar</Link>,
        path: URLS.HOME_COMMON_INFO,
        icon: <AlignCenterOutlined className={'!text-lg'} />,
      },
      {
        key: URLS.HOME_COUNTERS,
        label: <Link to={URLS.HOME_COUNTERS}>Sayğac</Link>,
        path: URLS.HOME_COUNTERS,
        icon: <BarChartOutlined className={'!text-lg'} />,
      },
      {
        key: URLS.HOME_SLIDERS,
        label: <Link to={URLS.HOME_SLIDERS}>Sliders</Link>,
        path: URLS.HOME_SLIDERS,
        icon: <PictureOutlined className={'!text-lg'} />,
      },
      {
        key: URLS.HOME_PARTNERS,
        label: <Link to={URLS.HOME_PARTNERS}>Tərəfdaşlar</Link>,
        path: URLS.HOME_PARTNERS,
        icon: <GoldOutlined className={'!text-lg'} />,
      },
    ],
  },
  {
    key: URLS.ORDERS,
    label: <Link to={URLS.ORDERS}>Sifarişlər</Link>,
    path: URLS.ORDERS,
    icon: <PieChartOutlined className={'!text-lg'} />,
  },
  {
    key: URLS.ORDER_STATUS,
    label: <Link to={URLS.ORDER_STATUS}>Sifariş mərhələləri</Link>,
    path: URLS.ORDER_STATUS,
    icon: <CheckCircleOutlined className={'!text-lg'} />,
  },
  {
    key: '2',
    label: 'Haqqımızda',
    icon: <ExpandOutlined className={'!text-lg'} />,
    children: [
      {
        key: URLS.ABOUT_CONTENT,
        label: <Link to={URLS.ABOUT_CONTENT}>Kontent</Link>,
        path: URLS.ABOUT_CONTENT,
        icon: <ProjectOutlined className={'!text-lg'} />,
      },
      {
        key: URLS.ABOUT_INFO_BLOCKS,
        label: <Link to={URLS.ABOUT_INFO_BLOCKS}>İnfo bloklar</Link>,
        path: URLS.ABOUT_INFO_BLOCKS,
        icon: <ProfileOutlined className={'!text-lg'} />,
      },
    ],
  },
  {
    key: '3',
    label: 'Məhsul',
    icon: <AppstoreOutlined className={'!text-lg'} />,
    children: [
      {
        key: URLS.PRODUCTS,
        label: <Link to={URLS.PRODUCTS}>Məhsullar</Link>,
        path: URLS.PRODUCTS,
        icon: <BorderOutlined className={'!text-lg'} />,
      },
      {
        key: URLS.PRODUCT_CATEGORY,
        label: <Link to={URLS.PRODUCT_CATEGORY}>Məhsul kateqoriyası</Link>,
        path: URLS.PRODUCT_CATEGORY,
        icon: <BlockOutlined className={'!text-lg'} />,
      },
    ],
  },
  {
    key: '4',
    label: 'Kampaniyalar',
    icon: <FundOutlined className={'!text-lg'} />,
    children: [
      {
        key: URLS.CAMPAIGN,
        label: <Link to={URLS.CAMPAIGN}>Kampaniyalar</Link>,
        path: URLS.CAMPAIGN,
        icon: <ProjectOutlined className={'!text-lg'} />,
      },
      {
        key: URLS.CAMPAIGN_PAGE,
        label: <Link to={URLS.CAMPAIGN_PAGE}>Kampaniya səhifəsi</Link>,
        path: URLS.CAMPAIGN_PAGE,
        icon: <ProfileOutlined className={'!text-lg'} />,
      },
    ],
  },
  {
    key: URLS.COLOR,
    path: URLS.COLOR,
    label: <Link to={URLS.COLOR}>Rənglər</Link>,
    icon: <BgColorsOutlined className={'!text-lg'} />,
  },
  {
    key: '5',
    label: 'Blog',
    icon: <HighlightOutlined className={'!text-lg'} />,
    children: [
      {
        key: URLS.BLOGS,
        label: <Link to={URLS.BLOGS}>Bloqlar</Link>,
        path: URLS.BLOGS,
        icon: <ProjectOutlined className={'!text-lg'} />,
      },
      {
        key: URLS.BLOG_PAGE,
        label: <Link to={URLS.BLOG_PAGE}>Bloq səhifə başlığı </Link>,
        path: URLS.BLOG_PAGE,
        icon: <PicCenterOutlined className={'!text-lg'} />,
      },
    ],
  },
  {
    key: '6',
    label: 'Region',
    icon: <GlobalOutlined className={'!text-lg'} />,
    children: [
      {
        key: URLS.CITY,
        label: <Link to={URLS.CITY}>Şəhərlər</Link>,
        path: URLS.CITY,
        icon: <BlockOutlined className={'!text-lg'} />,
      },
      {
        key: URLS.DISTRICT,
        label: <Link to={URLS.DISTRICT}>Rayonlar</Link>,
        path: URLS.DISTRICT,
        icon: <BuildOutlined className={'!text-lg'} />,
      },
    ],
  },
  {
    key: URLS.TAG,
    path: URLS.TAG,
    label: <Link to={URLS.TAG}>Teqlər</Link>,
    icon: <TagOutlined className={'!text-lg'} />,
  },
  {
    key: URLS.STORES,
    path: URLS.STORES,
    label: <Link to={URLS.STORES}>Mağazalar</Link>,
    icon: <EnvironmentOutlined className={'!text-lg'} />,
  },
  {
    key: '7',
    label: 'Layihələr',
    icon: <FundProjectionScreenOutlined className={'!text-lg'} />,
    children: [
      {
        key: URLS.PROJECTS,
        label: <Link to={URLS.PROJECTS}>Ümumi siyahı</Link>,
        path: URLS.PROJECTS,
        icon: <FundViewOutlined className={'!text-lg'} />,
      },
      {
        key: URLS.PROJECT_PAGE,
        label: <Link to={URLS.PROJECT_PAGE}>Layihə səhifəsi</Link>,
        path: URLS.PROJECT_PAGE,
        icon: <ProjectOutlined className={'!text-lg'} />,
      },
    ],
  },
  {
    key: URLS.SEARCH,
    path: URLS.SEARCH,
    label: <Link to={URLS.SEARCH}>Axtarış</Link>,
    icon: <SearchOutlined className={'!text-lg'} />,
  },
]

export function AppSider({
  collapsed,
  setCollapsed,
}: IProps): React.ReactElement {
  const location = useLocation()
  return (
    <Sider
      style={siderStyle}
      trigger={null}
      collapsible
      collapsed={collapsed}
      breakpoint='md'
      collapsedWidth='64'
      width={250}
      onBreakpoint={broken => setCollapsed(broken)}
    >
      <div className='flex items-center justify-center p-3'>
        <img src={logo} />
      </div>
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              darkItemSelectedBg: '#E55E25',
            },
          },
        }}
      >
        <Menu
          theme='dark'
          mode='inline'
          defaultOpenKeys={['1']}
          selectedKeys={[location.pathname]}
          items={items}
        />
      </ConfigProvider>
    </Sider>
  )
}
