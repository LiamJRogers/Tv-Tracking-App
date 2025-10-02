import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../hooks/AuthContext";
import { API_URL } from "../utils/getApiUtils";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "../styles/enable-2fa.styles";
import { FormError } from "../components/FormError";

export default function Enable2FAScreen() {
  const router = useRouter();
  const { user, accessToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ general?: string }>({});

  const handleEnable2FA = async () => {
    setLoading(true);
    setErrors({});
    try {
      const response = await fetch(`${API_URL}/enable-2fa`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ userId: user?.id }),
      });
      const data = await response.json();
      if (response.ok) {
        router.replace("/home");
      } else {
        setErrors({ general: data.error || "Failed to enable 2FA" });
      }
    } catch {
      setErrors({ general: "Network error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.centeredContent}>
        <View style={styles.iconCircle}>
          <MaterialCommunityIcons
            name="shield-half-full"
            size={40}
            color="#13A4EC"
          />
        </View>
        <Text style={styles.heading}>Secure your account</Text>
        <Text style={styles.paragraph}>
          Enable Two-Factor Authentication (2FA) to add an extra layer of
          security. A verification code will be sent to your email each time you
          log in.
        </Text>
      </View>
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={styles.enableButton}
          onPress={handleEnable2FA}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.enableButtonText}>Enable 2FA</Text>
          )}
        </TouchableOpacity>
        {errors.general && <FormError message={errors.general} />}
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => router.replace("/home")}
          disabled={loading}
        >
          <Text style={styles.skipButtonText}>Maybe Later</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
