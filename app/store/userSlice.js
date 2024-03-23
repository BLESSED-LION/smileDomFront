import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState:{
    user: null,
    isLoggedIn: false,
    token: null,
    isNewUser: false,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isLoggedIn = true
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isLoggedIn = false
    },
    register: (state) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isLoggedIn = true
      state.isNewUser = true
    },
  },
});

export const { login, logout, register } = userSlice.actions;

export default userSlice.reducer;
