import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userApi from 'api/userApi';
import StorageKeys from 'constants/storage-keys';

export const register = createAsyncThunk('user/register', async (payload) => {
  //call API register
  const data = await userApi.register(payload);
  console.log('Data:', data);
  // save data to local storage
  localStorage.setItem(StorageKeys.TOKEN, data.data.jwt);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.data.user));

  //return user data
  return data.user;
});

export const login = createAsyncThunk('user/login', async (payload) => {
  //call API register
  const data = await userApi.login(payload);
  // save data to local storage
  localStorage.setItem(StorageKeys.TOKEN, data.data.jwt);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.data.user));

  //return user data
  return data.user;
});
const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
    settings: {},
  },
  reducers: {
    logout(state) {
      //clear local storage
      localStorage.removeItem(StorageKeys.TOKEN);
      localStorage.removeItem(StorageKeys.USER);

      // cập nhật state về rỗng
      state.current = {};
    },
  },
  extraReducers: {
    // Đăng ký thành công nó cũng cập nhật vào register.fulfilled
    [register.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
    // Đăng nhập thành công nó cũng cập nhật vào register.fulfilled
    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

const { actions, reducer } = userSlice;
export const { logout } = actions;
export default reducer; //default export
