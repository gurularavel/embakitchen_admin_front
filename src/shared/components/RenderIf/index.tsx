import * as React from 'react'

interface IProps {
  condition: React.ReactNode
  children: React.ReactNode
  renderElse?: React.ReactNode
}

export const RenderIf = ({ condition, children, renderElse = '' }: IProps) => {
  if (condition) return <React.Fragment>{children}</React.Fragment>
  return <React.Fragment>{renderElse}</React.Fragment>
}
