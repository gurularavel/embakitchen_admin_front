import { Routes, Route, Navigate } from 'react-router-dom'
import { URLS } from '~ek/shared/const/urls'
import { Menu } from '~ek/components/Menu'
import { About_Content } from '~ek/components/About/about_content'
import { About_Info_Blocks } from '~ek/components/About/about_info_blocks'

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
          element={<About_Content />}
        ></Route>
        <Route
          path={URLS.ABOUT_INFO_BLOCKS}
          element={<About_Info_Blocks />}
        ></Route>
      </Routes>
    </>
  )
}
