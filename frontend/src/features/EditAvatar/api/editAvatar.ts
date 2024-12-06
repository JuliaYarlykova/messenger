import { rtkApi } from '@/shared/api/rtkApi'

interface AvatarScheme {
  filePath: string
}

export interface id {
  file: File
}

const metricsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    postAvatar: build.mutation<AvatarScheme, id>({
      query: ({ file }) => {
        const formData = new FormData()
        formData.append('file', file)

        return {
          url: '/profile/upload-profile-image?id=4',
          method: 'POST',
          body: formData,
        }
      },
      invalidatesTags: ['Profile'],
    }),
    deleteAvatar: build.mutation<null, null>({
      query: () => ({
        url: `/profile/delete-profile-image?id=4`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
})

export const postAvatar = metricsApi.usePostAvatarMutation

export const deleteAvatar = metricsApi.useDeleteAvatarMutation
