import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
} from 'react-native';
import { Card } from '../../components/ui/Card';
import { useUIStore } from '../../state/uiStore';

interface NotificationSettingsScreenProps {
  navigation: any;
}

export const NotificationSettingsScreen: React.FC<NotificationSettingsScreenProps> = ({
  navigation,
}) => {
  const { showToast } = useUIStore();

  const [settings, setSettings] = useState({
    // Push Notifications
    pushEnabled: true,
    contractReminders: true,
    deadlineAlerts: true,
    customReminders: true,

    // Email Notifications
    emailEnabled: false,
    weeklyDigest: false,
    monthlyReport: false,

    // Timing
    advanceNotice: 7, // days before deadline
    reminderTime: '09:00', // time of day
  });

  const handleToggle = (key: string, value: boolean) => {
    setSettings({ ...settings, [key]: value });
    showToast('success', 'Einstellung gespeichert');
  };

  const renderSettingRow = (
    title: string,
    description: string,
    settingKey: string,
    value: boolean
  ) => (
    <View style={styles.settingRow}>
      <View style={styles.settingLeft}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={(val) => handleToggle(settingKey, val)}
        trackColor={{ false: '#E5E7EB', true: '#93C5FD' }}
        thumbColor={value ? '#4F46E5' : '#F3F4F6'}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Push Benachrichtigungen */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Push Benachrichtigungen</Text>
        <Card style={styles.card} padding="large">
          {renderSettingRow(
            'Push Benachrichtigungen',
            'Hauptschalter für alle Push-Benachrichtigungen',
            'pushEnabled',
            settings.pushEnabled
          )}

          <View style={styles.divider} />

          {renderSettingRow(
            'Vertragserinnerungen',
            'Benachrichtigungen für Kündigungsfristen',
            'contractReminders',
            settings.contractReminders
          )}

          <View style={styles.divider} />

          {renderSettingRow(
            'Fristenalarm',
            'Warnungen für nahende Fristen',
            'deadlineAlerts',
            settings.deadlineAlerts
          )}

          <View style={styles.divider} />

          {renderSettingRow(
            'Benutzerdefinierte Erinnerungen',
            'Benachrichtigungen für Ihre Erinnerungen',
            'customReminders',
            settings.customReminders
          )}
        </Card>
      </View>

      {/* E-Mail Benachrichtigungen */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>E-Mail Benachrichtigungen</Text>
        <Card style={styles.card} padding="large">
          {renderSettingRow(
            'E-Mail Benachrichtigungen',
            'Benachrichtigungen per E-Mail erhalten',
            'emailEnabled',
            settings.emailEnabled
          )}

          <View style={styles.divider} />

          {renderSettingRow(
            'Wöchentliche Zusammenfassung',
            'Erhalten Sie jeden Montag eine Übersicht',
            'weeklyDigest',
            settings.weeklyDigest
          )}

          <View style={styles.divider} />

          {renderSettingRow(
            'Monatlicher Bericht',
            'Monatliche Statistiken und Übersicht',
            'monthlyReport',
            settings.monthlyReport
          )}
        </Card>
      </View>

      {/* Benachrichtigungszeiten */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vorlaufzeit & Timing</Text>
        <Card style={styles.card} padding="large">
          <View style={styles.timingRow}>
            <View style={styles.timingLeft}>
              <Text style={styles.settingTitle}>Vorlaufzeit</Text>
              <Text style={styles.settingDescription}>
                Tage vor Frist benachrichtigen
              </Text>
            </View>
            <View style={styles.timingRight}>
              <Text style={styles.timingValue}>{settings.advanceNotice} Tage</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.timingRow}>
            <View style={styles.timingLeft}>
              <Text style={styles.settingTitle}>Benachrichtigungszeit</Text>
              <Text style={styles.settingDescription}>
                Bevorzugte Tageszeit
              </Text>
            </View>
            <View style={styles.timingRight}>
              <Text style={styles.timingValue}>{settings.reminderTime} Uhr</Text>
            </View>
          </View>
        </Card>
      </View>

      {/* Info */}
      <View style={styles.infoSection}>
        <Card style={styles.infoCard} padding="medium">
          <Text style={styles.infoText}>
            💡 Tipp: Push-Benachrichtigungen helfen Ihnen, keine wichtigen
            Fristen zu verpassen. Sie können jederzeit individuell angepasst werden.
          </Text>
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
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  settingLeft: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 12,
  },
  timingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  timingLeft: {
    flex: 1,
  },
  timingRight: {
    paddingLeft: 16,
  },
  timingValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4F46E5',
  },
  infoSection: {
    marginBottom: 24,
  },
  infoCard: {
    backgroundColor: '#EEF2FF',
    borderLeftWidth: 4,
    borderLeftColor: '#4F46E5',
  },
  infoText: {
    fontSize: 14,
    color: '#4F46E5',
    lineHeight: 20,
  },
});
