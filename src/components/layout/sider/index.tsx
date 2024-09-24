import * as React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ConfigProvider, Menu, Layout } from 'antd'
import { URLS } from '~ek/shared/const/urls'
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
  path: string
  label: React.ReactNode
  icon: React.ReactNode
}

const items: IMenu[] = [
  {
    path: '/',
    label: <Link to='/'>Home</Link>,
    icon: <UsergroupAddOutlined className={'!text-lg'} />,
  },
  {
    path: URLS.MENU,
    label: <Link to={URLS.MENU}>Menu</Link>,
    icon: <BlockOutlined className={'!text-lg'} />,
  },
  {
    path: URLS.ABOUT,
    label: <Link to={URLS.ABOUT}>Haqqımızda</Link>,
    icon: <ExpandOutlined className={'!text-lg'} />,
  },
].map(({ label, icon, path }) => ({
  key: path,
  icon,
  path,
  label,
}))

export const AppSider: React.FC<IProps> = ({ collapsed, setCollapsed }) => {
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
          selectedKeys={[location.pathname]}
          items={items}
        />
      </ConfigProvider>
    </Sider>
  )
}
