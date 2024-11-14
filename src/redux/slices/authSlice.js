import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { wooCommerceApi } from '../../api/wordpress';

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ username, password }) => {
    const response = await wooCommerceApi.post('/customers/login', {
      username,
      password,
    });
    return response.data;
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData) => {
    const response = await wooCommerceApi.post('/customers', userData);
    return response.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer; 