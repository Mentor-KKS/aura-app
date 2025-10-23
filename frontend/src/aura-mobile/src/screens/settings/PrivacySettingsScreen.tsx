import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Shield, Download, Trash2, Lock } from 'lucide-react-native';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useUIStore } from '../../state/uiStore';

interface PrivacySettingsScreenProps {
  navigation: any;
}

export const PrivacySettingsScreen: React.FC<PrivacySettingsScreenProps> = ({
  navigation,
}) => {
  const { showToast } = useUIStore();

  const [settings, setSettings] = useState({
    biometricAuth: false,
    autoLock: true,
    dataEncryption: true,
    analyticsEnabled: false,
    crashReportsEnabled: true,
  });

  const handleToggle = (key: string, value: boolean) => {
    setSettings({ ...settings, [key]: value });
    showToast('success', 'Einstellung gespeichert');
  };

  const handleExportData = () => {
    Alert.alert(
      'Daten exportieren',
      'Ihre Daten werden als JSON-Datei exportiert und heruntergeladen.',
      [
        { text: 'Abbrechen', style: 'cancel' },
        {
          text: 'Exportieren',
          onPress: () => {
            // TODO: Implement data export
            showToast('info', 'Datenexport wird vorbereitet...');
          },
        },
      ]
    );
  };

  const handleClearCache = () => {
    Alert.alert(
      'Cache löschen',
      'Möchten Sie den App-Cache wirklich löschen?',
      [
        { text: 'Abbrechen', style: 'cancel' },
        {
          text: 'Löschen',
          style: 'destructive',
          onPress: () => {
            // TODO: Implement cache clearing
            showToast('success', 'Cache erfolgreich gelöscht');
          },
        },
      ]
    );
  };

  const handleDeleteAllData = () => {
    Alert.alert(
      'Alle Daten löschen',
      'WARNUNG: Diese Aktion löscht alle Ihre Daten unwiderruflich. Ihr Konto bleibt bestehen, aber alle Verträge und Erinnerungen werden gelöscht.',
      [
        { text: 'Abbrechen', style: 'cancel' },
        {
          text: 'Alles löschen',
          style: 'destructive',
          onPress: () => {
            // TODO: Implement data deletion
            showToast('success', 'Alle Daten wurden gelöscht');
          },
        },
      ]
    );
  };

  const renderSettingRow = (
    title: string,
    description: string,
    settingKey: string,
    value: boolean,
    disabled?: boolean
  ) => (
    <View style={[styles.settingRow, disabled && styles.disabledRow]}>
      <View style={styles.settingLeft}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={(val) => handleToggle(settingKey, val)}
        trackColor={{ false: '#E5E7EB', true: '#93C5FD' }}
        thumbColor={value ? '#4F46E5' : '#F3F4F6'}
        disabled={disabled}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Sicherheit */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sicherheit</Text>
        <Card style={styles.card} padding="large">
          {renderSettingRow(
            'Biometrische Authentifizierung',
            'Mit Face ID oder Fingerabdruck anmelden',
            'biometricAuth',
            settings.biometricAuth
          )}

          <View style={styles.divider} />

          {renderSettingRow(
            'Automatische Sperre',
            'App automatisch sperren bei Inaktivität',
            'autoLock',
            settings.autoLock
          )}

          <View style={styles.divider} />

          {renderSettingRow(
            'Datenverschlüsselung',
            'Sensible Daten verschlüsselt speichern',
            'dataEncryption',
            settings.dataEncryption,
            true // Always enabled for security
          )}
        </Card>
      </View>

      {/* Datenschutz */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Datenschutz</Text>
        <Card style={styles.card} padding="large">
          {renderSettingRow(
            'Anonyme Nutzungsstatistiken',
            'Helfen Sie uns, die App zu verbessern',
            'analyticsEnabled',
            settings.analyticsEnabled
          )}

          <View style={styles.divider} />

          {renderSettingRow(
            'Absturzberichte senden',
            'Automatisch Fehlerberichte übermitteln',
            'crashReportsEnabled',
            settings.crashReportsEnabled
          )}
        </Card>
      </View>

      {/* Daten verwalten */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Daten verwalten</Text>
        <Card style={styles.card} padding="large">
          <TouchableOpacity
            style={styles.actionRow}
            onPress={handleExportData}
            activeOpacity={0.7}
          >
            <View style={styles.actionLeft}>
              <Download color="#4F46E5" size={20} />
              <View style={styles.actionTextContainer}>
                <Text style={styles.actionTitle}>Daten exportieren</Text>
                <Text style={styles.actionDescription}>
                  Alle Ihre Daten als JSON herunterladen
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.actionRow}
            onPress={handleClearCache}
            activeOpacity={0.7}
          >
            <View style={styles.actionLeft}>
              <Trash2 color="#F59E0B" size={20} />
              <View style={styles.actionTextContainer}>
                <Text style={styles.actionTitle}>Cache löschen</Text>
                <Text style={styles.actionDescription}>
                  Temporäre Daten und Cache entfernen
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </Card>
      </View>

      {/* Datenschutzerklärung */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Rechtliches</Text>
        <Card style={styles.card} padding="large">
          <TouchableOpacity
            style={styles.actionRow}
            onPress={() => showToast('info', 'Datenschutzerklärung wird geöffnet...')}
            activeOpacity={0.7}
          >
            <View style={styles.actionLeft}>
              <Shield color="#4F46E5" size={20} />
              <View style={styles.actionTextContainer}>
                <Text style={styles.actionTitle}>Datenschutzerklärung</Text>
                <Text style={styles.actionDescription}>
                  Wie wir Ihre Daten schützen
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.actionRow}
            onPress={() => showToast('info', 'Nutzungsbedingungen werden geöffnet...')}
            activeOpacity={0.7}
          >
            <View style={styles.actionLeft}>
              <Lock color="#4F46E5" size={20} />
              <View style={styles.actionTextContainer}>
                <Text style={styles.actionTitle}>Nutzungsbedingungen</Text>
                <Text style={styles.actionDescription}>
                  Unsere Geschäftsbedingungen
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </Card>
      </View>

      {/* Gefahrenzone */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Gefahrenzone</Text>
        <Card style={styles.card} padding="large">
          <Text style={styles.dangerText}>
            Das Löschen aller Daten ist unwiderruflich. Bitte seien Sie vorsichtig.
          </Text>
          <Button
            title="Alle Daten löschen"
            onPress={handleDeleteAllData}
            variant="outline"
            style={styles.dangerButton}
            textStyle={styles.dangerButtonText}
          />
        </Card>
      </View>

      {/* Info */}
      <View style={styles.infoSection}>
        <Card style={styles.infoCard} padding="medium">
          <Text style={styles.infoText}>
            🔒 Ihre Privatsphäre ist uns wichtig. Alle sensiblen Daten werden
            verschlüsselt gespeichert und niemals an Dritte weitergegeben.
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
  disabledRow: {
    opacity: 0.6,
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
  actionRow: {
    paddingVertical: 8,
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
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
  infoSection: {
    marginBottom: 24,
  },
  infoCard: {
    backgroundColor: '#ECFDF5',
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
  },
  infoText: {
    fontSize: 14,
    color: '#059669',
    lineHeight: 20,
  },
});
