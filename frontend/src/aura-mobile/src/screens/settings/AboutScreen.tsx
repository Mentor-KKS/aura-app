import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Github, Globe, Mail, Heart, Shield, FileText } from 'lucide-react-native';
import { Card } from '../../components/ui/Card';
import { useUIStore } from '../../state/uiStore';

interface AboutScreenProps {
  navigation: any;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({ navigation }) => {
  const { showToast } = useUIStore();

  const appVersion = '1.0.0';
  const buildNumber = '001';
  const releaseDate = '2025-10-23';

  const handleOpenLink = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        showToast('error', 'Link konnte nicht geöffnet werden');
      }
    } catch (error) {
      showToast('error', 'Fehler beim Öffnen des Links');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* App Logo/Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Aura</Text>
        </View>
        <Text style={styles.appName}>Aura Contract Manager</Text>
        <Text style={styles.tagline}>
          Behalten Sie Ihre Verträge und Fristen im Blick
        </Text>
      </View>

      {/* Version Info */}
      <View style={styles.section}>
        <Card style={styles.card} padding="large">
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Version</Text>
            <Text style={styles.infoValue}>{appVersion}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Build</Text>
            <Text style={styles.infoValue}>{buildNumber}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Veröffentlicht</Text>
            <Text style={styles.infoValue}>{releaseDate}</Text>
          </View>
        </Card>
      </View>

      {/* Features */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Funktionen</Text>
        <Card style={styles.card} padding="large">
          <View style={styles.featureItem}>
            <Shield color="#4F46E5" size={20} />
            <Text style={styles.featureText}>
              Sichere Verschlüsselung aller Daten
            </Text>
          </View>
          <View style={styles.featureItem}>
            <FileText color="#4F46E5" size={20} />
            <Text style={styles.featureText}>
              Verwaltung unbegrenzter Verträge
            </Text>
          </View>
          <View style={styles.featureItem}>
            <Heart color="#4F46E5" size={20} />
            <Text style={styles.featureText}>
              Intelligente Erinnerungen
            </Text>
          </View>
          <View style={styles.featureItem}>
            <Globe color="#4F46E5" size={20} />
            <Text style={styles.featureText}>
              Plattformübergreifend verfügbar
            </Text>
          </View>
        </Card>
      </View>

      {/* Links */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Links</Text>
        <TouchableOpacity
          onPress={() => handleOpenLink('https://github.com/yourusername/aura')}
          activeOpacity={0.7}
        >
          <Card style={styles.linkCard} padding="medium">
            <View style={styles.linkRow}>
              <View style={styles.linkLeft}>
                <Github color="#1F2937" size={20} />
                <Text style={styles.linkText}>GitHub Repository</Text>
              </View>
            </View>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleOpenLink('https://aura-app.com')}
          activeOpacity={0.7}
        >
          <Card style={styles.linkCard} padding="medium">
            <View style={styles.linkRow}>
              <View style={styles.linkLeft}>
                <Globe color="#1F2937" size={20} />
                <Text style={styles.linkText}>Website</Text>
              </View>
            </View>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleOpenLink('mailto:support@aura-app.com')}
          activeOpacity={0.7}
        >
          <Card style={styles.linkCard} padding="medium">
            <View style={styles.linkRow}>
              <View style={styles.linkLeft}>
                <Mail color="#1F2937" size={20} />
                <Text style={styles.linkText}>Kontakt</Text>
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      </View>

      {/* Legal */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Rechtliches</Text>
        <TouchableOpacity
          onPress={() => showToast('info', 'Datenschutzerklärung wird geöffnet...')}
          activeOpacity={0.7}
        >
          <Card style={styles.linkCard} padding="medium">
            <View style={styles.linkRow}>
              <Text style={styles.legalText}>Datenschutzerklärung</Text>
            </View>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => showToast('info', 'Nutzungsbedingungen werden geöffnet...')}
          activeOpacity={0.7}
        >
          <Card style={styles.linkCard} padding="medium">
            <View style={styles.linkRow}>
              <Text style={styles.legalText}>Nutzungsbedingungen</Text>
            </View>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => showToast('info', 'Lizenzen werden geöffnet...')}
          activeOpacity={0.7}
        >
          <Card style={styles.linkCard} padding="medium">
            <View style={styles.linkRow}>
              <Text style={styles.legalText}>Open Source Lizenzen</Text>
            </View>
          </Card>
        </TouchableOpacity>
      </View>

      {/* Credits */}
      <View style={styles.section}>
        <Card style={styles.creditsCard} padding="large">
          <Text style={styles.creditsTitle}>Entwickelt mit ❤️</Text>
          <Text style={styles.creditsText}>
            Aura Contract Manager wurde entwickelt, um Ihnen zu helfen, Ihre
            Verträge und Fristen einfach und sicher zu verwalten.
          </Text>
          <Text style={styles.copyright}>
            © 2025 Aura App. Alle Rechte vorbehalten.
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
  header: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  appName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    paddingHorizontal: 32,
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
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  featureText: {
    fontSize: 15,
    color: '#1F2937',
    marginLeft: 12,
  },
  linkCard: {
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
  },
  linkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  linkLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginLeft: 12,
  },
  legalText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  creditsCard: {
    backgroundColor: '#EEF2FF',
    borderLeftWidth: 4,
    borderLeftColor: '#4F46E5',
  },
  creditsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  creditsText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 16,
  },
  copyright: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});
