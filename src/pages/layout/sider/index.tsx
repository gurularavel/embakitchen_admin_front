import * as React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ConfigProvider, Menu, Layout } from 'antd'
import { URLS } from '~ek/shared/const/constants'
import {
  UsergroupAddOutlined,
  BlockOutlined,
  ExpandOutlined,
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

const items: IMenu[] = [
  {
    key: URLS.HOME,
    path: '/',
    label: <Link to='/'>Home</Link>,
    icon: <UsergroupAddOutlined className={'!text-lg'} />,
  },
  {
    key: URLS.MENU,
    path: URLS.MENU,
    label: <Link to={URLS.MENU}>Menu</Link>,
    icon: <BlockOutlined className={'!text-lg'} />,
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
      },
      {
        key: URLS.ABOUT_INFO_BLOCKS,
        label: <Link to={URLS.ABOUT_INFO_BLOCKS}>İnfo bloklar</Link>,
        path: URLS.ABOUT_INFO_BLOCKS,
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
          defaultOpenKeys={['3']}
          selectedKeys={[location.pathname]}
          items={items}
        />
      </ConfigProvider>
    </Sider>
  )
}
