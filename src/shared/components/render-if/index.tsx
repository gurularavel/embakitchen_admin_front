import * as React from 'react'

interface IProps {
  condition: boolean | number | undefined
  children: React.ReactNode
  renderElse?: React.ReactNode
}

export function RenderIf({ condition, children, renderElse = '' }: IProps) {
  if (condition) return <React.Fragment>{children}</React.Fragment>
  return <React.Fragment>{renderElse}</React.Fragment>
}
