import { rtkApi } from '@/shared/api/rtkApi'
import { User } from '../models/types/user'

const userApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getUserDataByToken: build.query<User, string>({
      query: () => ({
        url: `/user`,
        method: 'GET',
      }),
    }),
    logout: build.mutation({
      query: () => ({
        url: `/auth/logout`,
        method: 'POST',
      }),
    }),
  }),
})

export const getUserDataByTokenQuery =
  userApi.endpoints.getUserDataByToken.initiate
export const logout = userApi.endpoints.logout.initiate
