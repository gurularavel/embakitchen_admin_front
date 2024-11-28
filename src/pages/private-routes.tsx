import { Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout } from '~ek/pages/layout'
import { Menu } from '~ek/pages/menu'
import { NotFound } from '~ek/pages/not-found'
import { AboutContent, AboutInfoBlocks } from '~ek/pages/about'
import { Counter, HomeCommonInfo, Partners, Sliders } from '~ek/pages/home'
import { Campaigns } from '~ek/pages/campaigns'
import { Color } from '~ek/pages/colors'
import { Blogs } from '~ek/pages/blog'
import { BlogPage } from '~ek/pages/blog/blog-page'
import { URLS } from '~ek/shared/const/constants'

export function PrivateRoutes(): React.ReactElement {
  return (
    <>
      <Routes>
        <Route element={<AppLayout />}>
          <Route
            path='/'
            element={<Navigate to={URLS.HOME_COMMON_INFO} />}
          />
          <Route
            path={URLS.HOME_COMMON_INFO}
            element={<HomeCommonInfo />}
          />
          <Route
            path={URLS.HOME_COUNTERS}
            element={<Counter />}
          />
          <Route
            path={URLS.HOME_SLIDERS}
            element={<Sliders />}
          />
          <Route
            path={URLS.HOME_PARTNERS}
            element={<Partners />}
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
          <Route
            path={URLS.COMPAIGN}
            element={<Campaigns />}
          />
          <Route
            path={URLS.COLOR}
            element={<Color />}
          />
          <Route
            path={URLS.BLOGS}
            element={<Blogs />}
          />
          <Route
            path={URLS.BLOG_PAGE}
            element={<BlogPage />}
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
