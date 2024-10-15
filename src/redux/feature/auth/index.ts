import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { IAuth } from '~ek/types/auth'
import { revertAll } from '~ek/redux/feature/constants'

const initialState: IAuth = {
  user: {
    id: 0,
    name: '',
    surname: '',
    email: '',
    phone: '',
    status: false,
    city: {
      id: 0,
      title: {
        en: '',
      },
    },
    role: undefined,
  },
  token: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IAuth>) => {
      state.token = action.payload.token
      state.user = action.payload.user
    },
  },
  extraReducers: builder => builder.addCase(revertAll, () => initialState),
})

export const { setUser } = authSlice.actions

const authReducer = persistReducer(
  {
    key: 'Auth',
    storage: storage,
    whitelist: ['user', 'token'],
  },
  authSlice.reducer,
)

export default authReducer
