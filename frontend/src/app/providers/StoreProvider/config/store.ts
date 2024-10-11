import { configureStore, ReducersMapObject } from '@reduxjs/toolkit'

import { StateSchema } from './StateScheme'

import { rtkApi } from '@/shared/api/rtkApi'
import { loginReducer } from '@/features/Authorization/model/slice/loginSlice'
import { userReducer } from '@/entities/User/models/slice/userSlice'

export function createReduxStore(initialState?: StateSchema) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    [rtkApi.reducerPath]: rtkApi.reducer,
    loginForm: loginReducer,
    user: userReducer,
  }

  return configureStore({
    reducer: rootReducers,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(rtkApi.middleware),
  })
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
