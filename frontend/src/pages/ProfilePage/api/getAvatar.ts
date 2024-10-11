import { rtkApi } from '@/shared/api/rtkApi'

const metricsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getAvatar: build.query<Blob, string | undefined>({
      query: (imageName) => ({
        url: `/profile/image/${imageName}`,
        method: 'GET',
        responseHandler: async (response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.blob()
        },
      }),
      providesTags: ['Avatar'],
    }),
  }),
})

export const getAvatar = metricsApi.useGetAvatarQuery
