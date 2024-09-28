import { USER_SECRET_TOKEN } from '@/shared/const/localstorage'

export const login = (authData: LoginSchema) => {
  try {
    if (!response || !response.access_token) {
      throw Error()
    }

    localStorage.setItem(USER_SECRET_TOKEN, response.access_token)

    window.location.reload()

    return response
  } catch (e) {
    throw Error()
  }
}
