import { Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout } from '~ek/pages/layout'
import { URLS } from '~ek/shared/const/constants'
import { Menu } from '~ek/pages/menu'
import { AboutContent, AboutInfoBlocks } from '~ek/pages/about'
import { Counter } from '~ek/pages/home/counters'
import { NotFound } from '~ek/pages/not-found'

export function PrivateRoutes(): React.ReactElement {
  return (
    <>
      <Routes>
        <Route element={<AppLayout />}>
          <Route
            path='/'
            element={<Navigate to={URLS.HOME_COUNTERS} />}
          />
          <Route
            path={URLS.HOME_COUNTERS}
            element={<Counter />}
          />
          <Route
            path={URLS.HOME_SLIDERS}
            element={<h2>Home Slider</h2>}
          />
          <Route
            path={URLS.HOME_PARTNERS}
            element={<h2>Home Partners</h2>}
          />
          <Route
            path={URLS.MENU}
            element={<Menu />}
          />
          <Route
            path={URLS.ABOUT_CONTENT}
            element={<AboutContent />}
          />
          <Route
            path={URLS.ABOUT_INFO_BLOCKS}
            element={<AboutInfoBlocks />}
          />
        </Route>

        <Route
          path='*'
          element={<NotFound />}
        />
      </Routes>
    </>
  )
}
