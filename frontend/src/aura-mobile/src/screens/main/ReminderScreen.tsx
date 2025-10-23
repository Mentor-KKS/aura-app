import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Switch,
  Alert,
} from 'react-native';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useReminderStore } from '../../state/reminderStore';
import { useUIStore } from '../../state/uiStore';
import { CreateReminderData } from '../../types/reminder.types';

interface ReminderScreenProps {
  navigation: any;
  route?: {
    params?: {
      reminderId?: string;
    };
  };
}

export const ReminderScreen: React.FC<ReminderScreenProps> = ({ navigation, route }) => {
  const reminderId = route?.params?.reminderId;
  const isEditMode = !!reminderId;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: new Date().toISOString().split('T')[0],
    priority: 'medium' as 'low' | 'medium' | 'high',
    isRecurring: false,
    recurrencePattern: undefined as 'daily' | 'weekly' | 'monthly' | 'yearly' | undefined,
    category: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const { reminders, createReminder, updateReminder, deleteReminder, isLoading } = useReminderStore();
  const { showToast } = useUIStore();

  // Load reminder data if editing
  useEffect(() => {
    if (isEditMode && reminderId) {
      const reminder = reminders.find((r) => r.id === reminderId);
      if (reminder) {
        setFormData({
          title: reminder.title,
          description: reminder.description || '',
          dueDate: new Date(reminder.dueDate).toISOString().split('T')[0],
          priority: reminder.priority,
          isRecurring: reminder.isRecurring,
          recurrencePattern: reminder.recurrencePattern as any,
          category: reminder.category || '',
        });
      }
    }
  }, [isEditMode, reminderId, reminders]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Titel ist erforderlich';
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'Fälligkeitsdatum ist erforderlich';
    }

    if (formData.isRecurring && !formData.recurrencePattern) {
      newErrors.recurrencePattern = 'Wiederholungsmuster ist erforderlich';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const reminderData: CreateReminderData = {
        title: formData.title,
        description: formData.description || undefined,
        dueDate: new Date(formData.dueDate).toISOString(),
        priority: formData.priority,
        isRecurring: formData.isRecurring,
        recurrencePattern: formData.isRecurring ? formData.recurrencePattern : undefined,
        category: formData.category || undefined,
      };

      if (isEditMode && reminderId) {
        await updateReminder(reminderId, reminderData);
        showToast('success', 'Erinnerung erfolgreich aktualisiert!');
      } else {
        await createReminder(reminderData);
        showToast('success', 'Erinnerung erfolgreich erstellt!');
      }
      navigation.goBack();
    } catch (error: any) {
      showToast(
        'error',
        error.message || `Fehler beim ${isEditMode ? 'Aktualisieren' : 'Erstellen'} der Erinnerung`
      );
    }
  };

  const handleDelete = () => {
    if (!reminderId) return;

    Alert.alert(
      'Erinnerung löschen',
      'Möchten Sie diese Erinnerung wirklich löschen?',
      [
        {
          text: 'Abbrechen',
          style: 'cancel',
        },
        {
          text: 'Löschen',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteReminder(reminderId);
              showToast('success', 'Erinnerung erfolgreich gelöscht!');
              navigation.goBack();
            } catch (error: any) {
              showToast('error', error.message || 'Fehler beim Löschen der Erinnerung');
            }
          },
        },
      ]
    );
  };

  const updateField = (field: string, value: any) => {
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
          <Text style={styles.title}>
            {isEditMode ? 'Erinnerung bearbeiten' : 'Neue Erinnerung'}
          </Text>
          <Text style={styles.subtitle}>
            {isEditMode
              ? 'Ändern Sie die Details Ihrer Erinnerung'
              : 'Erstellen Sie eine Erinnerung für wichtige Termine'}
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Titel"
            placeholder="z.B. Arzttermin, Zahlung, Anruf..."
            value={formData.title}
            onChangeText={(text) => updateField('title', text)}
            error={errors.title}
            required
          />

          <Input
            label="Beschreibung"
            placeholder="Optionale Details..."
            value={formData.description}
            onChangeText={(text) => updateField('description', text)}
            multiline
            numberOfLines={3}
            style={styles.descriptionInput}
          />

          <Input
            label="Fälligkeitsdatum"
            placeholder="YYYY-MM-DD"
            value={formData.dueDate}
            onChangeText={(text) => updateField('dueDate', text)}
            error={errors.dueDate}
            required
          />

          <View style={styles.priorityContainer}>
            <Text style={styles.label}>
              Priorität <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.priorityButtons}>
              {[
                { key: 'low', label: 'Niedrig', color: '#10B981' },
                { key: 'medium', label: 'Mittel', color: '#F59E0B' },
                { key: 'high', label: 'Hoch', color: '#EF4444' },
              ].map((option) => (
                <Button
                  key={option.key}
                  title={option.label}
                  onPress={() => updateField('priority', option.key)}
                  variant={formData.priority === option.key ? 'primary' : 'outline'}
                  size="small"
                  style={styles.priorityButton}
                />
              ))}
            </View>
          </View>

          <View style={styles.switchContainer}>
            <View style={styles.switchLabelContainer}>
              <Text style={styles.switchLabel}>Wiederholen</Text>
              <Text style={styles.switchSubtext}>
                Erinnerung regelmäßig wiederholen
              </Text>
            </View>
            <Switch
              value={formData.isRecurring}
              onValueChange={(value) => updateField('isRecurring', value)}
              trackColor={{ false: '#E5E7EB', true: '#93C5FD' }}
              thumbColor={formData.isRecurring ? '#4F46E5' : '#F3F4F6'}
            />
          </View>

          {formData.isRecurring && (
            <View style={styles.recurrenceContainer}>
              <Text style={styles.label}>
                Wiederholungsmuster <Text style={styles.required}>*</Text>
              </Text>
              <View style={styles.recurrenceButtons}>
                {[
                  { key: 'daily', label: 'Täglich' },
                  { key: 'weekly', label: 'Wöchentlich' },
                  { key: 'monthly', label: 'Monatlich' },
                  { key: 'yearly', label: 'Jährlich' },
                ].map((option) => (
                  <Button
                    key={option.key}
                    title={option.label}
                    onPress={() => updateField('recurrencePattern', option.key)}
                    variant={
                      formData.recurrencePattern === option.key ? 'primary' : 'outline'
                    }
                    size="small"
                    style={styles.recurrenceButton}
                  />
                ))}
              </View>
              {errors.recurrencePattern && (
                <Text style={styles.errorText}>{errors.recurrencePattern}</Text>
              )}
            </View>
          )}

          <Input
            label="Kategorie"
            placeholder="z.B. Gesundheit, Arbeit, Privat..."
            value={formData.category}
            onChangeText={(text) => updateField('category', text)}
          />

          <View style={styles.actions}>
            <Button
              title="Abbrechen"
              onPress={() => navigation.goBack()}
              variant="outline"
              style={styles.actionButton}
            />
            <Button
              title={isEditMode ? 'Aktualisieren' : 'Erstellen'}
              onPress={handleSave}
              loading={isLoading}
              style={styles.actionButton}
            />
          </View>

          {isEditMode && (
            <Button
              title="Löschen"
              onPress={handleDelete}
              variant="outline"
              style={[styles.deleteButton, { borderColor: '#EF4444' }]}
              textStyle={{ color: '#EF4444' }}
            />
          )}
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
  },
  header: {
    marginBottom: 24,
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
  descriptionInput: {
    minHeight: 80,
    textAlignVertical: 'top',
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
  priorityContainer: {
    marginBottom: 16,
  },
  priorityButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  priorityButton: {
    flex: 1,
    minWidth: '30%',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  switchLabelContainer: {
    flex: 1,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  switchSubtext: {
    fontSize: 13,
    color: '#6B7280',
  },
  recurrenceContainer: {
    marginBottom: 16,
  },
  recurrenceButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  recurrenceButton: {
    flex: 1,
    minWidth: '45%',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 8,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  actionButton: {
    flex: 1,
  },
  deleteButton: {
    marginTop: 16,
  },
});
