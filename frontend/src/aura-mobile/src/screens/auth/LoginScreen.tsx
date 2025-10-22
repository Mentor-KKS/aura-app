import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { useAuthStore } from "../../state/authStore";
import { useUIStore } from "../../state/uiStore";

interface LoginScreenProps {
  navigation: any;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const { login, isLoading } = useAuthStore();
  const { showToast } = useUIStore();

  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = "E-Mail ist erforderlich";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Ungültige E-Mail-Adresse";
    }

    if (!password) {
      newErrors.password = "Passwort ist erforderlich";
    } else if (password.length < 8) {
      newErrors.password = "Passwort muss mindestens 8 Zeichen lang sein";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await login({ email, password });
      showToast("success", "Erfolgreich angemeldet!");
      // Navigation will be handled by the auth state change
    } catch (error: any) {
      console.log("Login failed", error);
      showToast("error", error.message || "Anmeldung fehlgeschlagen");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Willkommen zurück</Text>
          <Text style={styles.subtitle}>
            Melden Sie sich an, um fortzufahren
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            label="E-Mail"
            placeholder="ihre.email@beispiel.de"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (errors.email) setErrors({ ...errors, email: undefined });
            }}
            error={errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            required
          />

          <Input
            label="Passwort"
            placeholder="Mindestens 8 Zeichen"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (errors.password)
                setErrors({ ...errors, password: undefined });
            }}
            error={errors.password}
            secureTextEntry
            required
          />

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Passwort vergessen?</Text>
          </TouchableOpacity>

          <Button
            title="Anmelden"
            onPress={handleLogin}
            loading={isLoading}
            fullWidth
            style={styles.loginButton}
          />

          <View style={styles.footer}>
            <Text style={styles.footerText}>Noch kein Konto? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.footerLink}>Registrieren</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  header: {
    marginBottom: 32,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
  },
  form: {
    width: "100%",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: -8,
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#4F46E5",
    fontWeight: "600",
  },
  loginButton: {
    marginTop: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
    color: "#6B7280",
  },
  footerLink: {
    fontSize: 14,
    color: "#4F46E5",
    fontWeight: "600",
  },
});
