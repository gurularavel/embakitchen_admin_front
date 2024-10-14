import * as React from 'react'
import { Button, Layout } from 'antd'
import { useAppDispatch } from '~ek/redux/store'
import { useLogoutMutation } from '~ek/redux/api/auth'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { revertAll } from '~ek/redux/feature/constants'

const { Header } = Layout

interface IProps {
  collapsed: boolean
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

export function AppHeader({
  collapsed,
  setCollapsed,
}: IProps): React.ReactElement {
  const dispatch = useAppDispatch()
  const [logout] = useLogoutMutation()
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
          onClick={e => {
            e.stopPropagation()
            logout()
            dispatch(revertAll())
          }}
        >
          Çıxış
        </Button>
      </div>
    </Header>
  )
}
