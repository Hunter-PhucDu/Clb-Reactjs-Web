import { createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import authAPI from "../../api/auth.api";
import userServiceAPI from "../../api/user.api";

export const onSignInUser = createAsyncThunk(
  "auth/user/signIn",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await authAPI.loginUser(credentials);

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
      const response = await userServiceAPI.signUp(account);
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
