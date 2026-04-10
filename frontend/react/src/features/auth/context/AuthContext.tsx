import React, { createContext, useEffect, useState } from "react";
import { getMeApi, loginApi, logoutApi, refreshApi, type UserResponse } from "../../../api/auth";

type AuthContextType = {
    user: UserResponse | null;
    accessToken: string | null;
    refreshToken: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserResponse | null>(null);


    const [accessToken, setAccessToken] = useState<string | null>(
        localStorage.getItem("access_token")
    );

    const [refreshToken, setRefreshToken] = useState<string | null>(
        localStorage.getItem("refresh_token")
    );

    const [loading, setLoading] = useState(true);

    const saveTokens = (access: string, refresh: string) => {
        setAccessToken(access);
        setRefreshToken(refresh);
        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);
    };

    const clearTokens = () => {
        setUser(null);
        setAccessToken(null);
        setRefreshToken(null);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
    };

    const login = async (username: string, password: string) => {
        setLoading(true);
        try {
            const tokens = await loginApi({ username, password });
            saveTokens(tokens.access_token, tokens.refresh_token);

            const profile = await getMeApi(tokens.access_token);
            setUser(profile);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            if (refreshToken) {
                await logoutApi(refreshToken);
            }
        } catch (err) {
            console.log("Logout error:", err);
        } finally {
            clearTokens();
        }
    };

    // Auto load session on refresh
    useEffect(() => {
        const init = async () => {
            try {
                if (!accessToken || !refreshToken) {
                    setLoading(false);
                    return;
                }

                try {
                    const profile = await getMeApi(accessToken);
                    setUser(profile);
                } catch {
                    const newTokens = await refreshApi(refreshToken);
                    saveTokens(newTokens.access_token, newTokens.refresh_token);

                    const profile = await getMeApi(newTokens.access_token);
                    setUser(profile);
                }
            } catch {
                clearTokens();
            } finally {
                setLoading(false);
            }
        };

        init();
    }, []);

    return (
        <AuthContext.Provider value={{ user, accessToken, refreshToken, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};