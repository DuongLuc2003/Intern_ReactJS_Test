import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // Trạng thái người dùng sau khi đăng nhập thành công
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signInStart(state) {
      state.loading = true;
      state.error = null;
    },
    signInSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
    },
    signInFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { signInStart, signInSuccess, signInFailure } = authSlice.actions;
export default authSlice.reducer;
