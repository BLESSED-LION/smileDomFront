import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isLoggedIn: false,
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
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
  },
});

export const { login, register, logout } = userSlice.actions;

export default userSlice.reducer;
