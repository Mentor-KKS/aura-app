import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { DecimalInput } from '../../components/ui/DecimalInput';
import { useContractStore } from '../../state/contractStore';
import { useUIStore } from '../../state/uiStore';
import { parseGermanDecimal } from '../../utils/formatting';

interface CreateContractScreenProps {
  navigation: any;
}

export const CreateContractScreen: React.FC<CreateContractScreenProps> = ({ navigation }) => {
  const [formData, setFormData] = useState({
    provider: '',
    category: '',
    costPerCycle: '',
    billingCycle: 'monthly' as 'monthly' | 'yearly' | 'quarterly' | 'weekly',
    startDate: new Date().toISOString().split('T')[0],
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const { createContract, isLoading } = useContractStore();
  const { showToast } = useUIStore();

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.provider) {
      newErrors.provider = 'Anbieter ist erforderlich';
    }

    if (!formData.category) {
      newErrors.category = 'Kategorie ist erforderlich';
    }

    if (!formData.costPerCycle) {
      newErrors.costPerCycle = 'Kosten sind erforderlich';
    } else {
      const numericValue = parseGermanDecimal(formData.costPerCycle);
      if (isNaN(numericValue) || numericValue <= 0) {
        newErrors.costPerCycle = 'Ungültiger Betrag';
      }
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Startdatum ist erforderlich';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await createContract({
        provider: formData.provider,
        category: formData.category,
        costPerCycle: parseGermanDecimal(formData.costPerCycle),
        billingCycle: formData.billingCycle,
        startDate: new Date(formData.startDate).toISOString(),
        notes: formData.notes || undefined,
      });

      showToast('success', 'Vertrag erfolgreich erstellt!');
      navigation.goBack();
    } catch (error: any) {
      showToast('error', error.message || 'Fehler beim Erstellen des Vertrags');
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
          <Text style={styles.title}>Neuer Vertrag</Text>
          <Text style={styles.subtitle}>Fügen Sie einen neuen Vertrag hinzu</Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Anbieter"
            placeholder="z.B. Netflix, Telekom, ..."
            value={formData.provider}
            onChangeText={(text) => updateField('provider', text)}
            error={errors.provider}
            required
          />

          <Input
            label="Kategorie"
            placeholder="z.B. Streaming, Telekom, Versicherung, ..."
            value={formData.category}
            onChangeText={(text) => updateField('category', text)}
            error={errors.category}
            required
          />

          <DecimalInput
            label="Kosten pro Abrechnungszeitraum"
            placeholder="12,99"
            value={formData.costPerCycle}
            onChangeText={(text) => updateField('costPerCycle', text)}
            error={errors.costPerCycle}
            required
          />

          <View style={styles.billingCycleContainer}>
            <Text style={styles.label}>
              Abrechnungszeitraum <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.billingCycleButtons}>
              {[
                { key: 'monthly', label: 'Monatlich' },
                { key: 'quarterly', label: 'Quartalsweise' },
                { key: 'yearly', label: 'Jährlich' },
                { key: 'weekly', label: 'Wöchentlich' },
              ].map((option) => (
                <Button
                  key={option.key}
                  title={option.label}
                  onPress={() => updateField('billingCycle', option.key)}
                  variant={formData.billingCycle === option.key ? 'primary' : 'outline'}
                  size="small"
                  style={styles.billingCycleButton}
                />
              ))}
            </View>
          </View>

          <Input
            label="Startdatum"
            placeholder="YYYY-MM-DD"
            value={formData.startDate}
            onChangeText={(text) => updateField('startDate', text)}
            error={errors.startDate}
            required
          />

          <Input
            label="Notizen"
            placeholder="Optionale Notizen..."
            value={formData.notes}
            onChangeText={(text) => updateField('notes', text)}
            multiline
            numberOfLines={4}
            style={styles.notesInput}
          />

          <View style={styles.actions}>
            <Button
              title="Abbrechen"
              onPress={() => navigation.goBack()}
              variant="outline"
              style={styles.actionButton}
            />
            <Button
              title="Erstellen"
              onPress={handleCreate}
              loading={isLoading}
              style={styles.actionButton}
            />
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
    padding: 24,
    paddingTop: 60,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  form: {
    width: '100%',
  },
  billingCycleContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  required: {
    color: '#EF4444',
  },
  billingCycleButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  billingCycleButton: {
    flex: 1,
    minWidth: '45%',
  },
  notesInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  actionButton: {
    flex: 1,
  },
});
