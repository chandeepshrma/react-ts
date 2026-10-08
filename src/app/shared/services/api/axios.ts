import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import store from "../../store/store";
import { logout, updateTokens } from "../../features/auth/authSlice";

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

const API_URL = "https://dummyjson.com";

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const refreshClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

let refreshPromise: Promise<RefreshTokenResponse> | null = null;

const refreshAccessToken = async (): Promise<RefreshTokenResponse> => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    throw new Error("Refresh token not available");
  }

  const { data } = await refreshClient.post<RefreshTokenResponse>(
    "/auth/refresh",
    {
      refreshToken,
      expiresInMins: 30,
    },
  );

  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);

  store.dispatch(
    updateTokens({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    }),
  );

  return data;
};

apiClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = refreshAccessToken();

        refreshPromise.finally(() => {
          refreshPromise = null;
        });
      }

      const tokens = await refreshPromise;

      originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;

      return apiClient(originalRequest);
    } catch (refreshError) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      store.dispatch(logout());

      return Promise.reject(refreshError);
    }
  },
);
