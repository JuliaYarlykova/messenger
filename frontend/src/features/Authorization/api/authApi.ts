import { rtkApi } from '@/shared/api/rtkApi'
import { LoginSchema } from '../model/types/loginSchema'

const loginApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    loginByPass: build.mutation<string, LoginSchema>({
      query: ({ email, password }) => ({
        url: `/api/user/login`,
        method: 'POST',
        body: {
          email,
          password,
        },
      }),
    }),
  }),
})

export const loginByPass = loginApi.endpoints.loginByPass.initiate
