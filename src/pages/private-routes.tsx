import { Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout } from '~ek/pages/layout'
import { NotFound } from '~ek/pages/not-found'
import { AboutContent, AboutInfoBlocks } from '~ek/pages/about'
import { ProductCategory, Products } from '~ek/pages/products'
import { Counter, HomeCommonInfo, Partners, Sliders } from '~ek/pages/home'
import { Order } from '~ek/pages/orders'
import { OrderStatus } from '~ek/pages/order-statuses'
import { Campaigns } from '~ek/pages/campaigns'
import { CampaignPage } from '~ek/pages/campaigns/campaign-page'
import { Color } from '~ek/pages/colors'
import { City } from '~ek/pages/city'
import { District } from '~ek/pages/districts'
import { Blogs } from '~ek/pages/blog'
import { BlogPage } from '~ek/pages/blog/blog-page'
import { Tags } from '~ek/pages/tags'
import { Stores } from '~ek/pages/stores'
import { ProjectPage } from '~ek/pages/projects/project-page'
import { Projects } from '~ek/pages/projects'
import { SearchPage } from '~ek/pages/search'
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
            path={URLS.ORDERS}
            element={<Order />}
          />
          <Route
            path={URLS.ORDER_STATUS}
            element={<OrderStatus />}
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
            path={URLS.PRODUCT_CATEGORY}
            element={<ProductCategory />}
          />
          <Route
            path={URLS.PRODUCTS}
            element={<Products />}
          />
          <Route
            path={URLS.CAMPAIGN}
            element={<Campaigns />}
          />
          <Route
            path={URLS.CAMPAIGN_PAGE}
            element={<CampaignPage />}
          />
          <Route
            path={URLS.COLOR}
            element={<Color />}
          />
          <Route
            path={URLS.CITY}
            element={<City />}
          />
          <Route
            path={URLS.DISTRICT}
            element={<District />}
          />
          <Route
            path={URLS.BLOGS}
            element={<Blogs />}
          />
          <Route
            path={URLS.BLOG_PAGE}
            element={<BlogPage />}
          />
          <Route
            path={URLS.STORES}
            element={<Stores />}
          />
          <Route
            path={URLS.TAG}
            element={<Tags />}
          />
          <Route
            path={URLS.PROJECT_PAGE}
            element={<ProjectPage />}
          />
          <Route
            path={URLS.PROJECTS}
            element={<Projects />}
          />
          <Route
            path={URLS.SEARCH}
            element={<SearchPage />}
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
