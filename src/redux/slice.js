import { createSlice } from "@reduxjs/toolkit"
import { onSignInUser, onSignInAdmin, onSignUp, onLogOut } from "./action"

const initialState = {
    account: {
        _id: null,
        avatar: null,
        username: null,
        role: null,
        accessToken: null,
    },
    loading: "idle",
    isLoggedIn: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        updateAccount: (state, action) => {
            state.account.username = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            // SIGN IN USER
            .addCase(onSignInUser.pending, (state, action) => {
                state.loading = "pending"
                state.isLoggedIn = false
            })
            .addCase(onSignInUser.fulfilled, (state, action) => {
                state.loading = "idle"
                state.isLoggedIn = true
                state.account = action.payload
            })
            .addCase(onSignInUser.rejected, (state, action) => {
                state.isLoggedIn = false
                state.loading = "idle"
            })

            // SIGN IN ADMIN
            .addCase(onSignInAdmin.pending, (state, action) => {
                state.loading = "pending"
                state.isLoggedIn = false
            })

            .addCase(onSignInAdmin.fulfilled, (state, action) => {
                state.loading = "idle"
                state.isLoggedIn = true
                state.account = action.payload

            })
            .addCase(onSignInAdmin.rejected, (state, action) => {
                state.isLoggedIn = false
                state.loading = "idle"
            })

            // SIGN UP
            .addCase(onSignUp.pending, (state, action) => {
                state.loading = "pending"
            })
            .addCase(onSignUp.fulfilled, (state, action) => {
                state.loading = "idle"
            })
            .addCase(onSignUp.rejected, (state, action) => {
                state.loading = "idle"
            })

            // LOG OUT
            .addCase(onLogOut.pending, (state, action) => {
                state.loading = "pending"
            })
            .addCase(onLogOut.fulfilled, (state, action) => {
                state.account = initialState.account
                state.isLoggedIn = false
                state.loading = "idle"
            })
            .addCase(onLogOut.rejected, (state, action) => {
                state.loading = "idle"
                state.isLoggedIn = false
            })
    },
})

export const { updateAccount } = authSlice.actions

export default authSlice.reducer
