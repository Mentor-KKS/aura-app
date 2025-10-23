import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  User,
  Bell,
  Lock,
  HelpCircle,
  Info,
  LogOut,
  ChevronRight,
} from 'lucide-react-native';
import { Card } from '../../components/ui/Card';
import { useAuthStore } from '../../state/authStore';

interface SettingsScreenProps {
  navigation: any;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    Alert.alert(
      'Abmelden',
      'Möchten Sie sich wirklich abmelden?',
      [
        {
          text: 'Abbrechen',
          style: 'cancel',
        },
        {
          text: 'Abmelden',
          style: 'destructive',
          onPress: () => {
            logout();
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
        },
      ]
    );
  };

  const handleAccountSettings = () => {
    navigation.navigate('AccountSettings');
  };

  const handleNotificationSettings = () => {
    navigation.navigate('NotificationSettings');
  };

  const handlePrivacySettings = () => {
    navigation.navigate('PrivacySettings');
  };

  const handleHelp = () => {
    navigation.navigate('Help');
  };

  const handleAbout = () => {
    navigation.navigate('About');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* User Info */}
      {user && (
        <Card style={styles.userCard} padding="large">
          <View style={styles.userInfo}>
            <View style={styles.avatarContainer}>
              <User color="#FFFFFF" size={32} />
            </View>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{user.email}</Text>
              <Text style={styles.userEmail}>Konto verwalten</Text>
            </View>
          </View>
        </Card>
      )}

      {/* Einstellungen */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Einstellungen</Text>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={handleAccountSettings}
          activeOpacity={0.7}
        >
          <Card style={styles.settingCard} padding="medium">
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <User color="#4F46E5" size={20} />
                <Text style={styles.settingLabel}>Konto</Text>
              </View>
              <ChevronRight color="#9CA3AF" size={20} />
            </View>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={handleNotificationSettings}
          activeOpacity={0.7}
        >
          <Card style={styles.settingCard} padding="medium">
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Bell color="#4F46E5" size={20} />
                <Text style={styles.settingLabel}>Benachrichtigungen</Text>
              </View>
              <ChevronRight color="#9CA3AF" size={20} />
            </View>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={handlePrivacySettings}
          activeOpacity={0.7}
        >
          <Card style={styles.settingCard} padding="medium">
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Lock color="#4F46E5" size={20} />
                <Text style={styles.settingLabel}>Datenschutz & Sicherheit</Text>
              </View>
              <ChevronRight color="#9CA3AF" size={20} />
            </View>
          </Card>
        </TouchableOpacity>
      </View>

      {/* Support */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={handleHelp}
          activeOpacity={0.7}
        >
          <Card style={styles.settingCard} padding="medium">
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <HelpCircle color="#4F46E5" size={20} />
                <Text style={styles.settingLabel}>Hilfe</Text>
              </View>
              <ChevronRight color="#9CA3AF" size={20} />
            </View>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={handleAbout}
          activeOpacity={0.7}
        >
          <Card style={styles.settingCard} padding="medium">
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Info color="#4F46E5" size={20} />
                <Text style={styles.settingLabel}>Über</Text>
              </View>
              <ChevronRight color="#9CA3AF" size={20} />
            </View>
          </Card>
        </TouchableOpacity>
      </View>

      {/* Abmelden */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
        activeOpacity={0.7}
      >
        <Card style={styles.logoutCard} padding="medium">
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <LogOut color="#EF4444" size={20} />
              <Text style={[styles.settingLabel, { color: '#EF4444' }]}>
                Abmelden
              </Text>
            </View>
          </View>
        </Card>
      </TouchableOpacity>

      <Text style={styles.version}>Version 1.0.0</Text>
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
  userCard: {
    marginBottom: 24,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#6B7280',
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
  settingItem: {
    marginBottom: 8,
  },
  settingCard: {
    backgroundColor: '#FFFFFF',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginLeft: 12,
  },
  logoutButton: {
    marginTop: 8,
    marginBottom: 24,
  },
  logoutCard: {
    backgroundColor: '#FFFFFF',
  },
  version: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 24,
  },
});
