import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser } from "../../services/AuthService";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: any) => {
    return await loginUser(email, password);
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: !!localStorage.getItem("access_token"),
    loading: false,
    error: null as string | null,
  },
  reducers: {
    logout: (state) => {
      localStorage.clear();
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state) => {
        console.log(state)  
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state) => {
        console.log(state)  

        state.loading = false;
        state.error = "Login failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;