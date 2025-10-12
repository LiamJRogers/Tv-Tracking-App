import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "../styles/verify-2fa.styles";
import { useAuth } from "../hooks/AuthContext";
import { FormError } from "../components/FormError";
import { useLocalSearchParams } from "expo-router";
import { use2FA } from "../hooks/use2FA";

export default function Verify2FAScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const userId = params.userId as string;
  const { accessToken, login: authLogin } = useAuth();

  const {
    code,
    loading,
    errors,
    inputRefs,
    handleChange,
    handleVerify,
    handleResend,
  } = use2FA({ userId, accessToken: accessToken ?? "", authLogin, router });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.replace("/login")}
      >
        <MaterialIcons name="arrow-back" size={28} color="#000" />
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.heading}>Enter 2FA Code</Text>
        <Text style={styles.paragraph}>
          We sent a 6-digit code to your email. Please enter it below.
        </Text>
        <View style={styles.inputsRow}>
          {code.map((digit, idx) => (
            <TextInput
              key={idx}
              ref={(ref) => {
                inputRefs.current[idx] = ref;
              }}
              style={styles.inputBox}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleChange(text, idx)}
              autoFocus={idx === 0}
              onSubmitEditing={() => {
                if (idx < 5) inputRefs.current[idx + 1]?.focus();
                else Keyboard.dismiss();
              }}
            />
          ))}
        </View>
        <TouchableOpacity
          style={styles.verifyButton}
          onPress={handleVerify}
          disabled={loading || code.some((d) => !d)}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.verifyButtonText}>Verify</Text>
          )}
        </TouchableOpacity>
        {errors.general && <FormError message={errors.general} />}
      </View>
      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={[styles.bottomButton, styles.resendButton]}
          onPress={handleResend}
        >
          <Text style={styles.resendButtonText}>Resend Code</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.bottomButton, styles.getHelpButton]}
          onPress={() => alert("HELP!")}
        >
          <Text style={styles.getHelpButtonText}>Get Help</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
