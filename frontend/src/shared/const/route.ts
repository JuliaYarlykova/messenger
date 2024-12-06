export enum AppRoutes {
  MAIN = 'main',
  PROFILE = 'profile',
  AUTH = 'auth',
  NOT_FOUND = 'not_found',
  CHAT_PAGE = 'chat-page',
}

export const getRouteMain = () => '/'
export const getRouteProfile = () => '/profile'
export const getRouteAuth = () => '/auth'

export const getRouteChat = () => `/chatpage/:id`
