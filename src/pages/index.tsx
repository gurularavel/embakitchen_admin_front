import { Navigate, Route, Routes } from 'react-router-dom'
import { URLS } from '~ek/shared/const/urls'
import { AppLayout } from '~ek/pages/layout'
import { PrivateRoutes } from '~ek/pages/private-routes'
import { RenderIf } from '~ek/shared/components'
import { useAppSelector } from '~ek/redux/store'
import { Login } from '~ek/pages/Login'

export function Router(): React.ReactElement {
  const { token } = useAppSelector(state => state.auth)
  return (
    <>
      <RenderIf condition={!!token}>
        <AppLayout>
          <PrivateRoutes />
        </AppLayout>
      </RenderIf>
      <RenderIf condition={!token}>
        <Routes>
          <Route
            path='*'
            element={<Navigate to={URLS.LOGIN} />}
          />
          <Route
            path={URLS.LOGIN}
            element={<Login />}
          />
        </Routes>
      </RenderIf>
    </>
  )
}
