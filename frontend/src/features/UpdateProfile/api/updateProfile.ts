import { rtkApi } from '@/shared/api/rtkApi'

interface ProfileScheme {
  name: string
  date: string
  about: string
}

const metricsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    putProfile: build.mutation<ProfileScheme, string>({
      query: (data) => ({
        url: `/profile/4?${data}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
})

export const putProfile = metricsApi.usePutProfileMutation
