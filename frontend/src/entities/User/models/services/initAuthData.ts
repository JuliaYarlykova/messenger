import { createAsyncThunk } from '@reduxjs/toolkit'

import { getUserDataByTokenQuery } from '../../api/userApi'

import { User } from '../types/user'
import { userActions } from '../slice/userSlice'
import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateScheme'

export const initAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
  'user/initAuthData',
  async (_, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi

    try {
      const response = await dispatch(getUserDataByTokenQuery('')).unwrap()

      if (!response || !response.first_name) {
        return rejectWithValue('No response')
      }

      dispatch(userActions.setInited(true))

      return response
    } catch (e) {
      return rejectWithValue('Fetching error')
    }
  },
)
