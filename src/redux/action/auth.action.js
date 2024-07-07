import { createAsyncThunk } from "@reduxjs/toolkit";
import authAPI from "../../api/auth.api";

export const onSignIn = createAsyncThunk(
  "auth/signIn",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await authAPI.signIn(credentials);

      const account = {
        _id: data._id,
        avatar: data.avatar,
        userName: data.userName,
        email: data.email,
        role: data.role,
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
      const response = await authAPI.signUp(account);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const onLogOut = createAsyncThunk("auth/logOut", async (_, thunkAPI) => {
  try {
    const response = await authAPI.logOut();
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});
