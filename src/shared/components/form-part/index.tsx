import { Col, Row, theme } from 'antd'

export const FormPartial = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => {
  const { token } = theme.useToken()

  const rowStyle = {
    maxWidth: 'none',
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
    marginBottom: 24,
  }

  return (
    <Row
      gutter={16}
      style={rowStyle}
    >
      <Col span={24}>
        <h3 className='font-semibold text-lg'>{title}</h3>
      </Col>
      {children}
    </Row>
  )
}
