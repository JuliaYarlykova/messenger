import { createAsyncThunk } from '@reduxjs/toolkit'

import { USER_SECRET_TOKEN } from '@/shared/const/localstorage'
import { loginByPass } from '../../api/authApi'
import { LoginSchema } from '../types/loginSchema'
import { userActions } from '@/entities/User/models/slice/userSlice'

export const login = createAsyncThunk(
  'login/loginByPassword',
  async (authData: LoginSchema, { rejectWithValue, dispatch }) => {
    try {
      const response = await dispatch(loginByPass(authData))
      console.log(response.data)
      if (!response.data) {
        return rejectWithValue('error')
      }

      localStorage.setItem(USER_SECRET_TOKEN, response.data.token)
      dispatch(userActions.setInited(true))
      window.location.reload()

      return response
    } catch (e) {
      return rejectWithValue('error')
    }
  },
)
