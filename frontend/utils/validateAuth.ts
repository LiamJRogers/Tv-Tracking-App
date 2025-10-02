import { API_URL } from "./getApiUtils";

export interface AuthFields {
  username?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface AuthErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
  [key: string]: string | undefined;
}

export async function checkUsernameAvailable(
  username: string
): Promise<boolean> {
  if (!username) return false;
  try {
    const response = await fetch(`${API_URL}/check-username`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });
    const data = await response.json();
    return data.available === true;
  } catch {
    return false;
  }
}

export function validateSignup(fields: AuthFields): AuthErrors {
  const errors: AuthErrors = {};
  if (!fields.username || fields.username.trim() === "") {
    errors.username = "Username is required";
  } else if (fields.username.length < 3 || fields.username.length > 20) {
    errors.username = "Username must be 3-20 characters long";
  } else if (!/^[a-zA-Z0-9_]+$/.test(fields.username)) {
    errors.username =
      "Username can only contain letters, numbers, and underscores";
  }
  if (!fields.email || fields.email.trim() === "") {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "Invalid email format";
  }
  if (!fields.password) {
    errors.password = "Password is required";
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(fields.password)
  ) {
    errors.password =
      "Password must:\n" +
      "• Be at least 8 characters\n" +
      "• Include 1 uppercase letter\n" +
      "• Include 1 lowercase letter\n" +
      "• Include 1 number\n" +
      "• Include 1 symbol";
  }
  if (
    fields.confirmPassword !== undefined &&
    fields.password !== fields.confirmPassword
  ) {
    errors.confirmPassword = "Passwords do not match";
  }
  return errors;
}

export function validateLogin(fields: AuthFields): AuthErrors {
  const errors: AuthErrors = {};
  if (!fields.email || fields.email.trim() === "") {
    errors.email = "Email is required";
  }
  if (!fields.password) {
    errors.password = "Password is required";
  }
  return errors;
}
