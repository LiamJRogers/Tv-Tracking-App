import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { SocialButtons } from "../components/SocialButtons";
import { FormError } from "../components/FormError";
import { DividerWithText } from "../components/DividerWithText";
import { useLogin } from "../hooks/useLogin";
import { styles } from "../styles/login.styles";

export default function LoginScreen() {
  const router = useRouter();
  const { errors, setErrors, handleLogin, loading } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLoginPress = async () => {
    await handleLogin({ email, password });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={[styles.input, errors.email && styles.inputError]}
        placeholder="Email"
        placeholderTextColor="#64748B"
        value={email}
        onChangeText={setEmail}
        onBlur={() => setErrors((prev) => ({ ...prev, email: undefined }))}
        autoCapitalize="none"
        keyboardType="email-address"
        editable={!loading}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      <View style={{ height: 16 }} />

      <TextInput
        style={[styles.input, errors.password && styles.inputError]}
        placeholder="Password"
        placeholderTextColor="#64748B"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        onBlur={() => setErrors((prev) => ({ ...prev, password: undefined }))}
        editable={!loading}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}
      <View style={styles.forgotPasswordContainer}>
        <TouchableOpacity onPress={() => alert("Forgot password pressed")}>
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={onLoginPress}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.loginButtonText}>Log In</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signupButton}
        onPress={() => router.push("/signup")}
        disabled={loading}
      >
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>
      {errors.general && <FormError message={errors.general} />}
      <DividerWithText text="Or connect with" />
      <SocialButtons disabled={loading} />
    </View>
  );
}
