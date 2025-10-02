import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSignUp } from "../hooks/useSignUp";
import { useInputFields } from "../hooks/useInputFields";
import { checkUsernameAvailable } from "../utils/validateAuth";
import { SocialButtons } from "../components/SocialButtons";
import { FormError } from "../components/FormError";
import { DividerWithText } from "../components/DividerWithText";
import { styles } from "../styles/signup.styles";

export default function SignUpScreen() {
  const router = useRouter();
  const { errors, setErrors, handleSignUp, loading } = useSignUp();

  const {
    username,
    setUsername,
    email,
    setEmail,
    password,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    validateField,
    handlePasswordChange,
  } = useInputFields(setErrors);

  const onSignUpPress = async () => {
    await handleSignUp({
      username,
      email,
      password,
      confirmPassword,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={[styles.input, errors.username && styles.inputError]}
        placeholder="Username"
        placeholderTextColor="#64748B"
        value={username}
        onChangeText={setUsername}
        onBlur={async () => {
          validateField("username", username);
          if (username && !errors.username) {
            const available = await checkUsernameAvailable(username);
            if (!available) {
              setErrors((prev) => ({
                ...prev,
                username: "Username is already taken",
              }));
            }
          }
        }}
        autoCapitalize="none"
        editable={!loading}
      />
      {errors.username && (
        <Text style={styles.errorText}>{errors.username}</Text>
      )}
      <View style={{ height: 16 }} />
      <TextInput
        style={[styles.input, errors.email && styles.inputError]}
        placeholder="Email"
        placeholderTextColor="#64748B"
        value={email}
        onChangeText={setEmail}
        onBlur={() => validateField("email", email)}
        autoCapitalize="none"
        keyboardType="email-address"
        editable={!loading}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      <View style={{ height: 16 }} />
      <View style={styles.inputWrapper}>
        <TextInput
          key={showPassword ? "text" : "password"}
          style={[styles.input, errors.password && styles.inputError]}
          placeholder="Password"
          placeholderTextColor="#64748B"
          value={password}
          onChangeText={handlePasswordChange}
          onBlur={() => validateField("password", password)}
          secureTextEntry={!showPassword}
          editable={!loading}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword((prev) => !prev)}
          accessibilityLabel={showPassword ? "Hide password" : "Show password"}
          disabled={loading}
        >
          <MaterialCommunityIcons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={24}
            color="#151718"
          />
        </TouchableOpacity>
      </View>
      {errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}
      <View style={{ height: 16 }} />
      <View style={styles.inputWrapper}>
        <TextInput
          key={showConfirmPassword ? "text" : "password"}
          style={[styles.input, errors.confirmPassword && styles.inputError]}
          placeholder="Confirm Password"
          placeholderTextColor="#64748B"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          onBlur={() => validateField("confirmPassword", confirmPassword)}
          secureTextEntry={!showConfirmPassword}
          editable={!loading}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowConfirmPassword((prev) => !prev)}
          accessibilityLabel={
            showConfirmPassword ? "Hide password" : "Show password"
          }
          disabled={loading}
        >
          <MaterialCommunityIcons
            name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
            size={24}
            color="#151718"
          />
        </TouchableOpacity>
      </View>
      {errors.confirmPassword && (
        <Text style={styles.errorText}>{errors.confirmPassword}</Text>
      )}
      <TouchableOpacity
        style={styles.signupButton}
        onPress={onSignUpPress}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.signupButtonText}>Sign Up</Text>
        )}
      </TouchableOpacity>
      {errors.general && <FormError message={errors.general} />}
      <DividerWithText text="Or sign up with" />
      <SocialButtons disabled={loading} />
      <View style={styles.loginPromptContainer}>
        <Text style={styles.loginPromptText}>
          Already have an account?
          <Text style={styles.loginLink} onPress={() => router.push("/login")}>
            {" "}
            Login
          </Text>
        </Text>
      </View>
    </View>
  );
}
