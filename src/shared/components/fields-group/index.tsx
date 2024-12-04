import { Col, theme } from 'antd'

interface FieldsGroupProps {
  col?: number
  children: React.ReactNode
}

export function FieldsGroup({
  col = 24,
  children,
}: Readonly<FieldsGroupProps>): React.ReactElement {
  const { token } = theme.useToken()

  const fieldsGroupStyles: React.CSSProperties = {
    maxWidth: 'none',
    background: token.colorFillTertiary,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  }

  return (
    <Col
      span={col}
      style={fieldsGroupStyles}
    >
      {children}
    </Col>
  )
}
