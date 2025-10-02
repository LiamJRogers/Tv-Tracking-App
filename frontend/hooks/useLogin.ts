import { useRouter } from "expo-router";
import { useState } from "react";
import { validateLogin } from "../utils/validateAuth";
import type { AuthErrors } from "../utils/validateAuth";
import { useAuth } from "./AuthContext";
import { API_URL } from "../utils/getApiUtils";

type LoginFields = {
  email: string;
  password: string;
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useLogin() {
  const router = useRouter();
  const { login: authLogin } = useAuth();
  const [errors, setErrors] = useState<AuthErrors>({});
  const [loading, setLoading] = useState(false);

  const handleLogin = async (fields: LoginFields) => {
    const validationErrors = validateLogin(fields);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return false;

    setLoading(true);
    try {
      await sleep(1000);
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const data = await response.json();
      if (response.ok) {
        await authLogin(data.accessToken, data.refreshToken, data.user);
        router.replace("/home");
        return true;
      } else {
        setErrors({ general: data.error || "Login failed" });
        return false;
      }
    } catch {
      setErrors({ general: "Network error" });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { errors, setErrors, handleLogin, loading };
}
