import { AuthPage } from '@/pages/AuthPage'
import { MainPage } from '@/pages/MainPage'
import { NotFoundPage } from '@/pages/NotFoundpage'
import ProfilePage from '@/pages/ProfilePage/ui/ProfilePage/ProfilePage'
import {
  AppRoutes,
  getRouteAuth,
  getRouteMain,
  getRouteProfile,
} from '@/shared/const/route'
import { type RouteProps } from 'react-router-dom'

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: getRouteMain(),
    element: <MainPage />,
  },
  [AppRoutes.AUTH]: {
    path: getRouteAuth(),
    element: <AuthPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: '*',
    element: <NotFoundPage />,
  },
  [AppRoutes.PROFILE]: {
    path: getRouteProfile(),
    element: <ProfilePage />,
  },
}
