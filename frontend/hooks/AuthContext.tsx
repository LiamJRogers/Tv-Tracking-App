import React, { createContext, useContext, useEffect, useState } from "react";
import {
  saveTokens,
  getAccessToken,
  getRefreshToken,
  clearTokens,
} from "../utils/tokenStorage";
import { API_URL } from "../utils/getApiUtils";

type User = { id: string; username: string; email: string } | null;

type AuthContextType = {
  user: User;
  accessToken: string | null;
  loading: boolean;
  login: (
    accessToken: string,
    refreshToken: string,
    user: User
  ) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const token = await getAccessToken();
      if (token) setAccessToken(token);
      setLoading(false);
    })();
  }, []);

  const login = async (
    accessToken: string,
    refreshToken: string,
    user: User
  ) => {
    await saveTokens(accessToken, refreshToken);
    setAccessToken(accessToken);
    setUser(user);
  };

  const logout = async () => {
    await clearTokens();
    setAccessToken(null);
    setUser(null);
  };

  const refresh = async () => {
    const refreshToken = await getRefreshToken();
    if (!refreshToken) return false;
    try {
      const response = await fetch(`${API_URL}/refresh-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });
      const data = await response.json();
      if (response.ok && data.accessToken) {
        await saveTokens(data.accessToken, refreshToken);
        setAccessToken(data.accessToken);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, accessToken, loading, login, logout, refresh }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
