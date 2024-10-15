import * as React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Login } from '~ek/pages/login'
import { AppLayout } from '~ek/pages/layout'
import { PrivateRoutes } from '~ek/pages/private-routes'
import { useAppSelector } from '~ek/redux/store'
import { useLogoutMutation } from '~ek/redux/api/auth'
import { URLS } from '~ek/shared/const/constants'
import { Notifier, RenderIf } from '~ek/shared/components'

export function Router(): React.ReactElement {
  const { token, user } = useAppSelector(state => state.auth)
  const [logout] = useLogoutMutation()
  React.useEffect(() => {
    if (user?.role === 'user') {
      Notifier('Admin panelə giriş üçün icazəniz yoxdur')
      logout()
    }
  }, [logout, user])

  return (
    <>
      <RenderIf condition={!!token && user.role === 'admin'}>
        <AppLayout>
          <PrivateRoutes />
        </AppLayout>
      </RenderIf>
      <RenderIf condition={!token || user.role === 'user'}>
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
