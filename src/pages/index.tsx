import * as React from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { Login } from '~ek/pages/login'
import { PrivateRoutes } from '~ek/pages/private-routes'
import { useAppSelector } from '~ek/redux/store'
import { useLogoutMutation } from '~ek/redux/api/auth'
import { URLS } from '~ek/shared/const/constants'
import { Notifier, RenderIf } from '~ek/shared/components'

export function Router(): React.ReactElement {
  const { token, user } = useAppSelector(state => state.auth)
  const [logout] = useLogoutMutation()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (user?.role === 'user') {
      Notifier('Admin panelə giriş üçün icazəniz yoxdur')
      logout()
    }
  }, [logout, user])

  React.useLayoutEffect(() => {
    if (!!token && user?.role === 'admin') {
      navigate(URLS.HOME_COUNTERS)
    }
  }, [token, user])

  return (
    <>
      <RenderIf condition={!!token && user?.role === 'admin'}>
        <PrivateRoutes />
      </RenderIf>
      <RenderIf condition={!token || user?.role !== 'admin'}>
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
