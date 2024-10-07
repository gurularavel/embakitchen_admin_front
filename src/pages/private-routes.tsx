import { Routes, Route, Navigate } from 'react-router-dom'
import { URLS } from '~ek/shared/const/urls'
import { Menu } from '~ek/pages/menu'
import { AboutContent, AboutInfoBlocks } from '~ek/pages/about'

export function PrivateRoutes(): React.ReactElement {
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
          path={URLS.ABOUT_CONTENT}
          element={<AboutContent />}
        ></Route>
        <Route
          path={URLS.ABOUT_INFO_BLOCKS}
          element={<AboutInfoBlocks />}
        ></Route>
      </Routes>
    </>
  )
}
