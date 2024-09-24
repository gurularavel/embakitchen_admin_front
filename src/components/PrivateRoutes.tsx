import { Routes, Route, Navigate } from 'react-router-dom'
import { URLS } from '~ek/shared/const/urls'
import { Menu } from '~ek/components/Menu'
import { About } from '~ek/components/About'

export const PrivateRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path='*'
          element={<Navigate to={'/'} />}
        />
        <Route
          path={URLS.HOME}
          element={<h2>Home</h2>}
        ></Route>
        <Route
          path={URLS.MENU}
          element={<Menu />}
        ></Route>
        <Route
          path={URLS.ABOUT}
          element={<About />}
        ></Route>
      </Routes>
    </>
  )
}
