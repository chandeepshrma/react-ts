import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import type {
  AuthState,
  AuthUser,
} from "../../services/auth/auth.model";

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isInitialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{
        user: AuthUser;
        accessToken: string;
        refreshToken: string;
      }>,
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      state.isInitialized = true;
    },

    restoreAuth: (
      state,
      action: PayloadAction<{
        user: AuthUser;
        accessToken: string;
        refreshToken: string | null;
      }>,
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
    },

    // Used when the access token is refreshed
    updateTokens: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken?: string | null;
      }>,
    ) => {
      state.accessToken = action.payload.accessToken;

      if (action.payload.refreshToken !== undefined) {
        state.refreshToken = action.payload.refreshToken;
      }
    },

    authInitialized: (state) => {
      state.isInitialized = true;
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.isInitialized = true;
    },
  },
});

export const {
  loginSuccess,
  restoreAuth,
  updateTokens,
  authInitialized,
  logout,
} = authSlice.actions;

export default authSlice.reducer;