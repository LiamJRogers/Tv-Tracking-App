import { useRouter } from "expo-router";
import { useState } from "react";
import { validateSignup } from "../utils/validateAuth";
import type { AuthErrors } from "../utils/validateAuth";
import { useAuth } from "./AuthContext";
import { API_URL } from "../utils/getApiUtils";

type SignUpFields = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useSignUp() {
  const router = useRouter();
  const { login: authLogin } = useAuth();
  const [errors, setErrors] = useState<AuthErrors>({});
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (fields: SignUpFields) => {
    const validationErrors = validateSignup(fields);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return false;

    setLoading(true);
    try {
      await sleep(1500);
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: fields.username,
          email: fields.email,
          password: fields.password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        const loginResponse = await fetch(`${API_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: fields.email,
            password: fields.password,
          }),
        });
        const loginData = await loginResponse.json();
        if (loginResponse.ok) {
          await authLogin(
            loginData.accessToken,
            loginData.refreshToken,
            loginData.user
          );
          router.replace("/home");
          return true;
        } else {
          setErrors({
            general: loginData.error || "Login after signup failed",
          });
          return false;
        }
      } else {
        setErrors({ general: data.error || "Signup failed" });
        return false;
      }
    } catch {
      setErrors({ general: "Network error" });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { errors, setErrors, handleSignUp, loading };
}
