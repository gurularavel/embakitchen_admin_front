import * as React from 'react'
import { Button, Layout } from 'antd'
import { useLogoutMutation } from '~ek/redux/api/auth'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

const { Header } = Layout

interface IProps {
  collapsed: boolean
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

export function AppHeader({
  collapsed,
  setCollapsed,
}: IProps): React.ReactElement {
  const [logout] = useLogoutMutation()
  const handleLogout = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation()
    logout()
  }

  return (
    <Header
      style={{
        padding: 0,
        background: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Button
        type='text'
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      />
      <div className='px-3'>
        <Button
          type='primary'
          danger
          onClick={e => handleLogout(e)}
        >
          Çıxış
        </Button>
      </div>
    </Header>
  )
}
