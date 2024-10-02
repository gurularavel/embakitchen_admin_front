import { Routes, Route, Navigate } from 'react-router-dom'
import { URLS } from '~ek/shared/const/urls'
import { Menu } from '~ek/components/Menu'
import { AboutContent } from '~ek/components/About/aboutContent'
import { AboutInfoBlocks } from '~ek/components/About/aboutInfoBlocks'

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
