import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useAuthStore } from '../../state/authStore';
import { useUIStore } from '../../state/uiStore';
import { userApi } from '../../services/api/userApi';

interface AccountSettingsScreenProps {
  navigation: any;
}

export const AccountSettingsScreen: React.FC<AccountSettingsScreenProps> = ({
  navigation,
}) => {
  const { user, logout, setUser } = useAuthStore();
  const { showToast } = useUIStore();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleUpdateProfile = async () => {
    setIsLoading(true);
    try {
      const updatedProfile = await userApi.updateProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber || undefined,
      });

      // Update user in auth store
      if (user) {
        setUser({
          ...user,
          firstName: updatedProfile.firstName,
          lastName: updatedProfile.lastName,
        });
      }

      showToast('success', 'Profil erfolgreich aktualisiert!');
    } catch (error: any) {
      showToast('error', error.message || 'Fehler beim Aktualisieren des Profils');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showToast('error', 'Passwörter stimmen nicht überein');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      showToast('error', 'Passwort muss mindestens 8 Zeichen lang sein');
      return;
    }

    setIsLoading(true);
    try {
      await userApi.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      showToast('success', 'Passwort erfolgreich geändert!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error: any) {
      showToast('error', error.message || 'Fehler beim Ändern des Passworts');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Konto löschen',
      'Möchten Sie Ihr Konto wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.',
      [
        {
          text: 'Abbrechen',
          style: 'cancel',
        },
        {
          text: 'Löschen',
          style: 'destructive',
          onPress: async () => {
            setIsLoading(true);
            try {
              await userApi.deleteAccount();
              await logout();
              showToast('success', 'Konto erfolgreich gelöscht');
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            } catch (error: any) {
              showToast('error', error.message || 'Fehler beim Löschen des Kontos');
            } finally {
              setIsLoading(false);
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Profil Informationen */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profil Informationen</Text>
        <Card style={styles.card} padding="large">
          <Input
            label="Vorname"
            placeholder="Ihr Vorname"
            value={formData.firstName}
            onChangeText={(text) => setFormData({ ...formData, firstName: text })}
          />

          <Input
            label="Nachname"
            placeholder="Ihr Nachname"
            value={formData.lastName}
            onChangeText={(text) => setFormData({ ...formData, lastName: text })}
          />

          <Input
            label="E-Mail"
            placeholder="ihre@email.com"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={false}
            style={styles.disabledInput}
          />

          <Input
            label="Telefon"
            placeholder="+49 123 456789"
            value={formData.phoneNumber}
            onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })}
            keyboardType="phone-pad"
          />

          <Button
            title="Profil aktualisieren"
            onPress={handleUpdateProfile}
            loading={isLoading}
            style={styles.button}
          />
        </Card>
      </View>

      {/* Passwort ändern */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Passwort ändern</Text>
        <Card style={styles.card} padding="large">
          <Input
            label="Aktuelles Passwort"
            placeholder="Aktuelles Passwort eingeben"
            value={passwordData.currentPassword}
            onChangeText={(text) =>
              setPasswordData({ ...passwordData, currentPassword: text })
            }
            secureTextEntry
          />

          <Input
            label="Neues Passwort"
            placeholder="Neues Passwort eingeben"
            value={passwordData.newPassword}
            onChangeText={(text) =>
              setPasswordData({ ...passwordData, newPassword: text })
            }
            secureTextEntry
          />

          <Input
            label="Passwort bestätigen"
            placeholder="Neues Passwort wiederholen"
            value={passwordData.confirmPassword}
            onChangeText={(text) =>
              setPasswordData({ ...passwordData, confirmPassword: text })
            }
            secureTextEntry
          />

          <Button
            title="Passwort ändern"
            onPress={handleChangePassword}
            loading={isLoading}
            style={styles.button}
          />
        </Card>
      </View>

      {/* Abo Informationen */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Abo & Mitgliedschaft</Text>
        <Card style={styles.card} padding="large">
          <View style={styles.subscriptionInfo}>
            <Text style={styles.subscriptionLabel}>Aktueller Plan:</Text>
            <Text style={styles.subscriptionValue}>
              {user?.subscriptionTier === 'free' ? 'Kostenlos' : 'Premium'}
            </Text>
          </View>

          {user?.subscriptionTier === 'free' && (
            <Button
              title="Zu Premium upgraden"
              onPress={() => showToast('info', 'Premium-Upgrade kommt bald!')}
              style={styles.button}
            />
          )}
        </Card>
      </View>

      {/* Konto löschen */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Gefahrenzone</Text>
        <Card style={styles.card} padding="large">
          <Text style={styles.dangerText}>
            Das Löschen Ihres Kontos ist eine permanente Aktion und kann nicht
            rückgängig gemacht werden. Alle Ihre Daten werden gelöscht.
          </Text>
          <Button
            title="Konto löschen"
            onPress={handleDeleteAccount}
            variant="outline"
            style={[styles.button, styles.dangerButton]}
            textStyle={styles.dangerButtonText}
          />
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 12,
    paddingLeft: 4,
  },
  card: {
    backgroundColor: '#FFFFFF',
  },
  button: {
    marginTop: 8,
  },
  disabledInput: {
    opacity: 0.6,
    backgroundColor: '#F3F4F6',
  },
  subscriptionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
  },
  subscriptionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  subscriptionValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4F46E5',
  },
  dangerText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
    lineHeight: 20,
  },
  dangerButton: {
    borderColor: '#EF4444',
  },
  dangerButtonText: {
    color: '#EF4444',
  },
});
