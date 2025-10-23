import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { ChevronDown, ChevronUp, Mail, MessageCircle, Book } from 'lucide-react-native';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useUIStore } from '../../state/uiStore';

interface HelpScreenProps {
  navigation: any;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const HelpScreen: React.FC<HelpScreenProps> = ({ navigation }) => {
  const { showToast } = useUIStore();
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const faqs: FAQ[] = [
    {
      id: '1',
      category: 'Erste Schritte',
      question: 'Wie füge ich einen neuen Vertrag hinzu?',
      answer:
        'Tippen Sie auf das "+" Symbol in der unteren Navigation, wählen Sie "Vertrag / Abo" und füllen Sie die erforderlichen Informationen aus. Sie können auch eine Vorlage verwenden, um Zeit zu sparen.',
    },
    {
      id: '2',
      category: 'Erste Schritte',
      question: 'Was sind Vorlagen und wie nutze ich sie?',
      answer:
        'Vorlagen sind vordefinierte Vertragstypen für beliebte Anbieter wie Netflix, Spotify, etc. Sie enthalten bereits die wichtigsten Informationen und sparen Ihnen Zeit beim Eingeben.',
    },
    {
      id: '3',
      category: 'Verträge',
      question: 'Wie bearbeite ich einen bestehenden Vertrag?',
      answer:
        'Tippen Sie auf den Vertrag in der Übersicht, um ihn zu öffnen. Dort können Sie alle Details bearbeiten oder den Vertrag löschen.',
    },
    {
      id: '4',
      category: 'Verträge',
      question: 'Was bedeuten die verschiedenen Vertragstypen?',
      answer:
        'Es gibt 5 Vertragstypen: Abo (wiederkehrend), Mitgliedschaft (Clubs, Vereine), Versicherung, Mobilfunk/Internet und Sonstige. Dies hilft bei der Organisation und Übersicht.',
    },
    {
      id: '5',
      category: 'Erinnerungen',
      question: 'Wie erstelle ich eine Erinnerung?',
      answer:
        'Tippen Sie auf "+" und wählen Sie "Erinnerung". Geben Sie einen Titel, Fälligkeitsdatum und optional weitere Details ein. Sie können auch wiederkehrende Erinnerungen erstellen.',
    },
    {
      id: '6',
      category: 'Erinnerungen',
      question: 'Was sind wiederkehrende Erinnerungen?',
      answer:
        'Wiederkehrende Erinnerungen werden automatisch in regelmäßigen Abständen wiederholt (täglich, wöchentlich, monatlich oder jährlich). Perfekt für regelmäßige Aufgaben.',
    },
    {
      id: '7',
      category: 'Benachrichtigungen',
      question: 'Wie aktiviere ich Benachrichtigungen?',
      answer:
        'Gehen Sie zu Einstellungen > Benachrichtigungen und aktivieren Sie die gewünschten Benachrichtigungstypen. Stellen Sie sicher, dass Push-Benachrichtigungen in Ihren Geräteeinstellungen erlaubt sind.',
    },
    {
      id: '8',
      category: 'Benachrichtigungen',
      question: 'Wann werde ich über Fristen benachrichtigt?',
      answer:
        'Sie werden standardmäßig 7 Tage vor einer Kündigungsfrist benachrichtigt. Diese Vorlaufzeit können Sie in den Benachrichtigungseinstellungen anpassen.',
    },
    {
      id: '9',
      category: 'Sicherheit',
      question: 'Sind meine Daten sicher?',
      answer:
        'Ja! Alle sensiblen Daten werden verschlüsselt gespeichert. Wir verwenden modernste Sicherheitsstandards und geben Ihre Daten niemals an Dritte weiter.',
    },
    {
      id: '10',
      category: 'Konto',
      question: 'Kann ich meine Daten exportieren?',
      answer:
        'Ja, Sie können Ihre Daten jederzeit exportieren. Gehen Sie zu Einstellungen > Datenschutz & Sicherheit > Daten exportieren.',
    },
  ];

  const categories = Array.from(new Set(faqs.map((faq) => faq.category)));

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const handleContactSupport = () => {
    showToast('info', 'Support-Kontakt wird geöffnet...');
  };

  const handleOpenDocs = () => {
    showToast('info', 'Dokumentation wird geöffnet...');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Schnelle Hilfe</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.quickAction}
            onPress={handleContactSupport}
            activeOpacity={0.7}
          >
            <Card style={styles.quickActionCard} padding="medium">
              <Mail color="#4F46E5" size={24} />
              <Text style={styles.quickActionText}>E-Mail Support</Text>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => showToast('info', 'Chat kommt bald!')}
            activeOpacity={0.7}
          >
            <Card style={styles.quickActionCard} padding="medium">
              <MessageCircle color="#4F46E5" size={24} />
              <Text style={styles.quickActionText}>Live Chat</Text>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickAction}
            onPress={handleOpenDocs}
            activeOpacity={0.7}
          >
            <Card style={styles.quickActionCard} padding="medium">
              <Book color="#4F46E5" size={24} />
              <Text style={styles.quickActionText}>Dokumentation</Text>
            </Card>
          </TouchableOpacity>
        </View>
      </View>

      {/* FAQs */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Häufig gestellte Fragen</Text>
        {categories.map((category) => (
          <View key={category} style={styles.categorySection}>
            <Text style={styles.categoryTitle}>{category}</Text>
            {faqs
              .filter((faq) => faq.category === category)
              .map((faq) => (
                <TouchableOpacity
                  key={faq.id}
                  onPress={() => toggleFAQ(faq.id)}
                  activeOpacity={0.7}
                >
                  <Card style={styles.faqCard} padding="medium">
                    <View style={styles.faqHeader}>
                      <Text style={styles.faqQuestion}>{faq.question}</Text>
                      {expandedFAQ === faq.id ? (
                        <ChevronUp color="#6B7280" size={20} />
                      ) : (
                        <ChevronDown color="#6B7280" size={20} />
                      )}
                    </View>
                    {expandedFAQ === faq.id && (
                      <Text style={styles.faqAnswer}>{faq.answer}</Text>
                    )}
                  </Card>
                </TouchableOpacity>
              ))}
          </View>
        ))}
      </View>

      {/* Contact */}
      <View style={styles.section}>
        <Card style={styles.contactCard} padding="large">
          <Text style={styles.contactTitle}>Haben Sie noch Fragen?</Text>
          <Text style={styles.contactText}>
            Unser Support-Team steht Ihnen gerne zur Verfügung.
          </Text>
          <Button
            title="Support kontaktieren"
            onPress={handleContactSupport}
            style={styles.contactButton}
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
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  quickAction: {
    flex: 1,
  },
  quickActionCard: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 8,
    textAlign: 'center',
  },
  categorySection: {
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
    paddingLeft: 4,
  },
  faqCard: {
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
    marginRight: 12,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 12,
    lineHeight: 20,
  },
  contactCard: {
    backgroundColor: '#EEF2FF',
    borderLeftWidth: 4,
    borderLeftColor: '#4F46E5',
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
    lineHeight: 20,
  },
  contactButton: {
    marginTop: 8,
  },
});
