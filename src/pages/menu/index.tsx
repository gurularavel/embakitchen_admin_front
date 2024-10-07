import * as React from 'react'
import { useNavigate } from 'react-router'
import { useGetMenusQuery } from '~ek/redux/api/menu'
import { Loading, RenderIf, ErrorMessage } from '~ek/shared/components'

export function Menu(): React.ReactElement {
  const [lang, setLang] = React.useState<string>('en') // eslint-disable-line @typescript-eslint/no-unused-vars
  const { data, isError, isLoading } = useGetMenusQuery({ lang: lang })

  const navigate = useNavigate()
  const handleRetry = () => {
    navigate('/')
  }

  return (
    <>
      <RenderIf condition={isLoading}>
        <Loading />
      </RenderIf>
      <RenderIf condition={isError}>
        <ErrorMessage
          message='Məlumatların yüklənməsində problem yarandı'
          onRetry={handleRetry}
        />
      </RenderIf>
      <RenderIf condition={!isError && !isLoading}>
        {data?.map(menu => <h2>{menu.title}</h2>)}
      </RenderIf>
    </>
  )
}
