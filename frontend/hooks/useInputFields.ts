import { useState } from "react";
import { validateSignup } from "../utils/validateAuth";
import type { AuthErrors } from "../utils/validateAuth";

export function useInputFields(
  setErrors: React.Dispatch<React.SetStateAction<AuthErrors>>
) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateField = (field: string, value: string) => {
    const fields = {
      username,
      email,
      password,
      confirmPassword,
      [field]: value,
    };
    const validationErrors = validateSignup(fields);
    setErrors((prev) => ({ ...prev, [field]: validationErrors[field] }));
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    validateField("password", text);
  };

  return {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    validateField,
    handlePasswordChange,
  };
}
