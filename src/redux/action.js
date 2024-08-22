import { createAsyncThunk } from "@reduxjs/toolkit"
import { jwtDecode } from "jwt-decode"
import AuthService from "../services/AuthService"
import UserService from "../services/UserService"
import { persistor } from "./store"

export const onSignInUser = createAsyncThunk(
    "auth/user/sign-in",
    async (credentials, thunkAPI) => {
        try {
            const { data } = await AuthService.signInUser(credentials)
            const decodedToken = jwtDecode(data.accessToken)

            const account = {
                _id: decodedToken._id,
                userName: decodedToken.username,
                role: decodedToken.role,
                accessToken: data.accessToken,
                avatar: data.avatarUrl,
            }

            return account
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.message || "Login failed")
        }
    }
)

export const onSignInAdmin = createAsyncThunk(
    "auth/admin/sign-in",
    async (credentials, thunkAPI) => {
        try {
            const { data } = await AuthService.signInAdmin(credentials)
            const decodedToken = jwtDecode(data.accessToken)

            const account = {
                _id: decodedToken._id,
                userName: decodedToken.username,
                role: decodedToken.role,
                accessToken: data.accessToken,
            }

            return account
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.message || "Login failed")
        }
    }
)

export const onSignUp = createAsyncThunk(
    "auth/sign-up",
    async (account, thunkAPI) => {
        try {
            const response = await UserService.signUp(account)
            return response.data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data)
        }
    }
)

export const onLogOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
    try {
        await persistor.purge()
        return {}
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message || "Logout failed")
    }
})

