import { rtkApi } from '@/shared/api/rtkApi'
import { LoginSchema } from '../model/types/loginSchema'

function convertLoginSchemaToRecord(
  loginSchema: LoginSchema,
): Record<string, string> {
  return {
    email: loginSchema.email,
    password: loginSchema.password,
  }
}

const loginApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    loginByPass: build.mutation<{ token: string }, LoginSchema>({
      query: (data) => {
        const queryParams = new URLSearchParams(
          convertLoginSchemaToRecord(data),
        ).toString()
        return {
          url: `/user/login?${queryParams}`,
          method: 'POST',
        }
      },
    }),
  }),
})

export const loginByPass = loginApi.endpoints.loginByPass.initiate
