import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../../services/auth.service";

export const login = createAsyncThunk(
    "auth/login",
    async (item, thunkAPI) => {
        try {
            const data = await AuthService.login(item);
            return { user: data };
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue({ message });
        }
    }
);

export const signup = createAsyncThunk(
    "auth/signup",
    async (item, thunkAPI) => {
        try {
            const data = await AuthService.signup(item);
            return { user: data };
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue({ message });
        }
    }
);



export const getProfile = createAsyncThunk(
    "auth/getProfile",
    async (thunkAPI) => {
        try {
            const data = await AuthService.getProfile();
            return { user: data };
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue({ message });
        }
    }
);





export const logout = createAsyncThunk("auth/logout", async () => {
    AuthService.logout();
});


const initialState = {
    loading: false,
    error: "",
    user: AuthService.getUserDetails() || null,
    isLoggedIn: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: {
       
       
    },
});

const { reducer } = authSlice;
export default reducer;