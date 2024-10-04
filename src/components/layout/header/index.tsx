import * as React from 'react'
import { Button, Layout } from 'antd'
import { useAppDispatch } from '~ek/redux/store'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { revertAll } from '~ek/redux/feature/constants'

const { Header } = Layout

interface IProps {
  collapsed: boolean
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

export const AppHeader: React.FC<IProps> = ({ collapsed, setCollapsed }) => {
  const dispatch = useAppDispatch()
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
            dispatch(revertAll())
          }}
        >
          Çıxış
        </Button>
      </div>
    </Header>
  )
}
