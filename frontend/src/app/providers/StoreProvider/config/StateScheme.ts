import { UserSchema } from '@/entities/User/models/types/user'
import { LoginSchema } from '@/features/Authorization/model/types/loginSchema'
import { rtkApi } from '@/shared/api/rtkApi'

export interface StateSchema {
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>
  loginForm: LoginSchema
  user: UserSchema
}

export interface ThunkConfig<T> {
  rejectValue: T
  state: StateSchema
}
