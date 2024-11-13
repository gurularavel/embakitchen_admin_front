import * as React from 'react'
import { Layout, theme } from 'antd'
import { Outlet } from 'react-router-dom'
import { AppFooter } from '~ek/pages/layout/footer'
import { AppSider } from '~ek/pages/layout/sider'
import { AppHeader } from '~ek/pages/layout/header'

const { Content } = Layout

interface IProps {
  children?: React.ReactNode
}

export function AppLayout({ children }: IProps): React.ReactElement {
  const [collapsed, setCollapsed] = React.useState<boolean>(false)
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  return (
    <Layout className='min-h-screen'>
      <AppSider
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      <Layout style={{ marginInlineStart: 250 }}>
        <AppHeader
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            flexGrow: 1,
          }}
        >
          {children || <Outlet />}
        </Content>
        <AppFooter />
      </Layout>
    </Layout>
  )
}
