import React from 'react'
import { Col, theme } from 'antd'

export const FormGroup = ({
  col = 24,
  title,
  children,
}: {
  col?: number
  title?: string
  children: React.ReactNode
}) => {
  const { token } = theme.useToken()

  const filedsStyle = {
    maxWidth: 'none',
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
    marginBottom: 24,
  }

  return (
    <Col
      style={filedsStyle}
      span={col}
    >
      <div>
        <h3 className='font-semibold text-lg'>{title}</h3>
      </div>
      <Col>{children}</Col>
    </Col>
  )
}
