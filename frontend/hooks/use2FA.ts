import { useRef, useState } from "react";
import { TextInput } from "react-native";
import { API_URL } from "../utils/getApiUtils";

type Use2FAProps = {
  userId: string;
  accessToken: string;
  authLogin: (
    accessToken: string,
    refreshToken: string,
    user: any
  ) => Promise<void>;
  router: any;
};

export function use2FA({
  userId,
  accessToken,
  authLogin,
  router,
}: Use2FAProps) {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ general?: string }>({});
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, idx: number) => {
    if (!/^\d*$/.test(text)) return;
    const newCode = [...code];
    newCode[idx] = text.slice(-1);
    setCode(newCode);

    if (text && idx < 5) {
      inputRefs.current[idx + 1]?.focus();
    }
    if (text === "" && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    setErrors({});
    try {
      const response = await fetch(`${API_URL}/verify-2fa`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          userId,
          code: code.join(""),
        }),
      });
      const data = await response.json();
      if (response.ok) {
        await authLogin(data.accessToken, data.refreshToken, data.user);
        router.replace("/home");
      } else {
        setErrors({ general: data.error || "Invalid code" });
      }
    } catch {
      setErrors({ general: "Network error" });
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    setErrors({});
    try {
      const response = await fetch(`${API_URL}/resend-2fa`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();
      if (response.ok) {
        setErrors({ general: "A new code has been sent to your email." });
      } else {
        setErrors({ general: data.error || "Failed to resend code" });
      }
    } catch {
      setErrors({ general: "Network error" });
    } finally {
      setLoading(false);
    }
  };

  return {
    code,
    setCode,
    loading,
    errors,
    inputRefs,
    handleChange,
    handleVerify,
    handleResend,
  };
}
