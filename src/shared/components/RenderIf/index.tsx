import React from 'react'
import { IProps } from './types'

const RenderIf = ({ condition, children, renderElse = '' }: IProps) => {
  if (condition) return <React.Fragment>{children}</React.Fragment>
  return <React.Fragment>{renderElse}</React.Fragment>
}

export default RenderIf
