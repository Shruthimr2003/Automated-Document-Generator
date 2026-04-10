import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export type LoginPayload = {
  username: string;
  password: string;
};

export type TokenResponse = {
  access_token: string;
  refresh_token: string;
  token_type: string;
};

export type UserResponse = {
  id: number;
  username: string;
  email: string;
  role: string;
  is_active: boolean;
  created_at: string;
};

export const loginApi = async (payload: LoginPayload) => {
  const res = await axios.post<TokenResponse>(`${API_URL}/auth/login`, payload);
  return res.data;
};

export const refreshApi = async (refreshToken: string) => {
  const res = await axios.post<TokenResponse>(
    `${API_URL}/auth/refresh?refresh_token=${refreshToken}`
  );
  return res.data;
};

export const logoutApi = async (refreshToken: string) => {
  const res = await axios.post(`${API_URL}/auth/logout?refresh_token=${refreshToken}`);
  return res.data;
};

export const getMeApi = async (accessToken: string) => {
  const res = await axios.get<UserResponse>(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res.data;
};