import React, { useState } from 'react'
import { Layout, theme } from 'antd'
import { Footer } from './footer'
import AppSider from './sider'
import AppHeader from './header'

const { Content } = Layout

interface IProps {
  children: React.ReactNode
}

const AppLayout: React.FC<IProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  return (
    <Layout className='min-h-screen'>
      <AppSider
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      <Layout>
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
          {children}
        </Content>
        <Footer />
      </Layout>
    </Layout>
  )
}

export default AppLayout
