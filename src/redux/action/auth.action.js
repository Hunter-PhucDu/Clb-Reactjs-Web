import { createAsyncThunk } from "@reduxjs/toolkit";
import authAPI from "../../api/auth.api";
import { jwtDecode } from "jwt-decode";

export const onSignInUser = createAsyncThunk(
  "auth/signIn",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await authAPI.loginUser(credentials);

      // Giải mã accessToken để lấy thông tin người dùng
      const decodedToken = jwtDecode(data.accessToken);

      const account = {
        _id: decodedToken._id,
        userName: decodedToken.username,
        role: decodedToken.role,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        avatar: data.avatarUrl,
      };

      return account;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

//Admin refresh token ----------------------------------------------------------------------------------
export const onSignInAdmin = createAsyncThunk(
  "auth/admin/signin",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await authAPI.loginAdmin(credentials);

      const decodedToken = jwtDecode(data.accessToken);

      const account = {
        _id: decodedToken._id,
        userName: decodedToken.username,
        role: decodedToken.role,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      };

      return account;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const onSignUp = createAsyncThunk(
  "auth/signUp",
  async (account, thunkAPI) => {
    try {
      const response = await authAPI.signup(account);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const onLogOut = createAsyncThunk("auth/logOut", async (_, thunkAPI) => {
  try {
    const response = await authAPI.logout();
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});


