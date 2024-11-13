import { CSSProperties } from 'react'
import { theme } from 'antd'

export const useFormStyle = (): CSSProperties => {
  const { token } = theme.useToken()

  return {
    maxWidth: 'none',
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  }
}
