import * as React from 'react'
import { Button, Result } from 'antd'
import { URLS } from '~ek/shared/const/constants'

export function NotFound(): React.ReactElement {
  return (
    <Result
      status='warning'
      title='404'
      subTitle='Axtardığınız səhifə mövcud deyil.'
      extra={
        <Button
          type='primary'
          href={URLS.HOME_COUNTERS}
        >
          Əsas səhifə
        </Button>
      }
    />
  )
}
