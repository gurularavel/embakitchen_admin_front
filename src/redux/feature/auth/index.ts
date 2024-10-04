import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { IAuth } from '~ek/types/auth'
import { revertAll } from '../constants'

const initialState: IAuth = {
  admin: {
    id: 0,
    name: '',
    surname: '',
    email: '',
    created_at: '',
    updated_at: '',
  },
  token: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IAuth>) => {
      state.token = action.payload.token
      state.admin = action.payload.admin
    },
  },
  extraReducers: builder => builder.addCase(revertAll, () => initialState),
})

export const { setUser } = authSlice.actions

const authReducer = persistReducer(
  {
    key: 'Auth',
    storage: storage,
    whitelist: ['admin', 'token'],
  },
  authSlice.reducer,
)

export default authReducer
