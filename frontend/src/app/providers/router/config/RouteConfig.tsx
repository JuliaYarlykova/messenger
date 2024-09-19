import { MainPage } from '@/pages/MainPage'
import ProfilePage from '@/pages/ProfilePage/ui/ProfilePage/ProfilePage'
import { AppRoutes, getRouteMain, getRouteProfile } from '@/shared/const/route'
import { type RouteProps } from 'react-router-dom'

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: getRouteMain(),
    element: <MainPage />,
  },
  [AppRoutes.AUTH]: {
    path: getRouteMain(),
    element: <MainPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: getRouteMain(),
    element: <MainPage />,
  },
  [AppRoutes.PROFILE]: {
    path: getRouteProfile(),
    element: <ProfilePage />,
  },
}
