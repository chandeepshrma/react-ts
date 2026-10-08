import type {
  LoginRequest,
  LoginResponse,
  AuthUser,
  RefreshTokenResponse,
} from "./auth.model";

import { apiClient } from "../api/axios";

export const login = async (
  credentials: LoginRequest
): Promise<LoginResponse> => {
  const { data } = await apiClient.post<LoginResponse>(
    "/auth/login",
    credentials
  );

  return data;
};

export const getCurrentUser = async (
  accessToken: string
): Promise<AuthUser> => {
  const { data } = await apiClient.get<AuthUser>("/auth/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
};

export const refreshAccessToken = async (
  refreshToken: string
): Promise<RefreshTokenResponse> => {
  const { data } = await apiClient.post<RefreshTokenResponse>(
    "/auth/refresh",
    {
      refreshToken,
      expiresInMins: 30,
    }
  );

  return data;
};