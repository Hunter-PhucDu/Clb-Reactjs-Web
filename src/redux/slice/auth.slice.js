import { createSlice } from "@reduxjs/toolkit";
import { onSignInUser, onSignInAdmin, onLogOut, onSignUp } from "../action/auth.action";

const initialState = {
  account: {
    _id: null,
    avatar: null,
    userName: null,
    role: null,
    accessToken: null,
    refreshToken: null,
  },
  loading: "idle",
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reqRefreshToken: (state, action) => {
      state.account.accessToken = action.payload;
    },
    updateAccount: (state, action) => {
      state.account.userName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // SIGN IN USER
      .addCase(onSignInUser.pending, (state, action) => {
        state.loading = "pending";
        state.isLoggedIn = false;
      })

      .addCase(onSignInUser.fulfilled, (state, action) => {
        state.loading = "idle";
        state.isLoggedIn = true;
        state.account = action.payload;
        window.location.href = "/";
      })
      .addCase(onSignInUser.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.loading = "idle";
        // window.location.href = "/auth/sign-in";
      })

      // SIGN IN ADMIN
      .addCase(onSignInAdmin.pending, (state, action) => {
        state.loading = "pending";
        state.isLoggedIn = false;
      })

      .addCase(onSignInAdmin.fulfilled, (state, action) => {
        state.loading = "idle";
        state.isLoggedIn = true;
        state.account = action.payload;
        window.location.href = "/";
      })
      .addCase(onSignInAdmin.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.loading = "idle";
        // window.location.href = "/auth/sign-in";
      })

      // SIGN UP
      .addCase(onSignUp.pending, (state, action) => {
        state.loading = "pending";
      })
      .addCase(onSignUp.fulfilled, (state, action) => {
        state.loading = "idle";
        window.location.href = "/auth/sign-in";
      })
      .addCase(onSignUp.rejected, (state, action) => {
        state.loading = "idle";
      })

      // LOG OUT
      .addCase(onLogOut.pending, (state, action) => {
        state.loading = "pending";
      })
      .addCase(onLogOut.fulfilled, (state, action) => {
        state.account = initialState.account;
        state.isLoggedIn = false;
        state.loading = "idle";
      })
      .addCase(onLogOut.rejected, (state, action) => {
        state.loading = "idle";
        state.isLoggedIn = false;
      });
  },
});

export const { reqRefreshToken, updateAccount } = authSlice.actions;

export default authSlice.reducer;
