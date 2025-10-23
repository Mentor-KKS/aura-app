import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { FileText, Bell, Calendar } from 'lucide-react-native';
import { Card } from '../../components/ui/Card';

interface AddNewScreenProps {
  navigation: any;
}

export const AddNewScreen: React.FC<AddNewScreenProps> = ({ navigation }) => {
  const handleAddContract = () => {
    navigation.navigate('EditContract');
  };

  const handleAddReminder = () => {
    navigation.navigate('ReminderScreen');
  };

  const handleAddAppointment = () => {
    // TODO: Implement appointment creation
    console.log('Add appointment - to be implemented');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Was möchten Sie hinzufügen?</Text>
      <Text style={styles.subtitle}>
        Wählen Sie eine Option, um eine neue Frist oder Erinnerung zu erstellen
      </Text>

      <TouchableOpacity
        style={styles.optionButton}
        onPress={handleAddContract}
        activeOpacity={0.7}
      >
        <Card style={styles.optionCard} padding="large">
          <View style={styles.iconContainer}>
            <FileText color="#4F46E5" size={32} />
          </View>
          <View style={styles.optionContent}>
            <Text style={styles.optionTitle}>Vertrag / Abo</Text>
            <Text style={styles.optionDescription}>
              Fügen Sie einen neuen Vertrag, Abo oder Mitgliedschaft hinzu
            </Text>
          </View>
        </Card>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionButton}
        onPress={handleAddReminder}
        activeOpacity={0.7}
      >
        <Card style={styles.optionCard} padding="large">
          <View style={styles.iconContainer}>
            <Bell color="#10B981" size={32} />
          </View>
          <View style={styles.optionContent}>
            <Text style={styles.optionTitle}>Erinnerung</Text>
            <Text style={styles.optionDescription}>
              Erstellen Sie eine benutzerdefinierte Erinnerung
            </Text>
          </View>
        </Card>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionButton}
        onPress={handleAddAppointment}
        activeOpacity={0.7}
      >
        <Card style={styles.optionCard} padding="large">
          <View style={styles.iconContainer}>
            <Calendar color="#F59E0B" size={32} />
          </View>
          <View style={styles.optionContent}>
            <Text style={styles.optionTitle}>Termin</Text>
            <Text style={styles.optionDescription}>
              Fügen Sie einen wichtigen Termin hinzu
            </Text>
          </View>
        </Card>
      </TouchableOpacity>
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
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 24,
  },
  optionButton: {
    marginBottom: 16,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 16,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
});
