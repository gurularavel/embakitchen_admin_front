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
    key: '3',
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
    key: URLS.COMPAIGN,
    path: URLS.COMPAIGN,
    label: <Link to={URLS.COMPAIGN}>Kampaniyalar</Link>,
    icon: <FundOutlined className={'!text-lg'} />,
  },
  {
    key: URLS.COLOR,
    path: URLS.COLOR,
    label: <Link to={URLS.COLOR}>Rənglər</Link>,
    icon: <BgColorsOutlined className={'!text-lg'} />,
  },
  {
    key: '4',
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
