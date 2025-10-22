import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuthStore } from '../../state/authStore';
import { useUIStore } from '../../state/uiStore';

interface RegisterScreenProps {
  navigation: any;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const { register, isLoading } = useAuthStore();
  const { showToast } = useUIStore();

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'E-Mail ist erforderlich';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Ungültige E-Mail-Adresse';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Passwort ist erforderlich';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Passwort muss mindestens 8 Zeichen lang sein';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Bitte Passwort bestätigen';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwörter stimmen nicht überein';
    }

    // First name validation
    if (!formData.firstName) {
      newErrors.firstName = 'Vorname ist erforderlich';
    }

    // Last name validation
    if (!formData.lastName) {
      newErrors.lastName = 'Nachname ist erforderlich';
    }

    // Phone number validation (optional, but format check if provided)
    if (formData.phoneNumber && !/^\+?[\d\s-]+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Ungültige Telefonnummer';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber || undefined,
      });
      showToast('success', 'Registrierung erfolgreich!');
      // Navigation will be handled by the auth state change
    } catch (error: any) {
      showToast('error', error.message || 'Registrierung fehlgeschlagen');
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Konto erstellen</Text>
          <Text style={styles.subtitle}>Registrieren Sie sich für Aura</Text>
        </View>

        <View style={styles.form}>
          <Input
            label="E-Mail"
            placeholder="ihre.email@beispiel.de"
            value={formData.email}
            onChangeText={(text) => updateField('email', text)}
            error={errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            required
          />

          <Input
            label="Vorname"
            placeholder="Max"
            value={formData.firstName}
            onChangeText={(text) => updateField('firstName', text)}
            error={errors.firstName}
            autoCapitalize="words"
            required
          />

          <Input
            label="Nachname"
            placeholder="Mustermann"
            value={formData.lastName}
            onChangeText={(text) => updateField('lastName', text)}
            error={errors.lastName}
            autoCapitalize="words"
            required
          />

          <Input
            label="Telefonnummer"
            placeholder="+49 123 456789 (optional)"
            value={formData.phoneNumber}
            onChangeText={(text) => updateField('phoneNumber', text)}
            error={errors.phoneNumber}
            keyboardType="phone-pad"
          />

          <Input
            label="Passwort"
            placeholder="Mindestens 8 Zeichen"
            value={formData.password}
            onChangeText={(text) => updateField('password', text)}
            error={errors.password}
            secureTextEntry
            required
          />

          <Input
            label="Passwort bestätigen"
            placeholder="Passwort wiederholen"
            value={formData.confirmPassword}
            onChangeText={(text) => updateField('confirmPassword', text)}
            error={errors.confirmPassword}
            secureTextEntry
            required
          />

          <Button
            title="Registrieren"
            onPress={handleRegister}
            loading={isLoading}
            fullWidth
            style={styles.registerButton}
          />

          <View style={styles.footer}>
            <Text style={styles.footerText}>Bereits ein Konto? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.footerLink}>Anmelden</Text>
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
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  form: {
    width: '100%',
  },
  registerButton: {
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
  },
  footerLink: {
    fontSize: 14,
    color: '#4F46E5',
    fontWeight: '600',
  },
});
