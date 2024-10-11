import { rtkApi } from '@/shared/api/rtkApi'

interface ProfileScheme {
  uId: number
  nickname: string
  about: string
  birthday: string
  status: boolean
  hadBeen: string
  imagePath?: string
}

interface id {
  id: number
}

const metricsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query<ProfileScheme, id>({
      query: ({ id }) => ({
        url: `/profile/${id}`,
        method: 'GET',
      }),
      providesTags: ['Profile'],
    }),
  }),
})

export const getMetrics = metricsApi.useGetProfileQuery
