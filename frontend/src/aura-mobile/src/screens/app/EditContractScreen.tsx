import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { DecimalInput } from "../../components/ui/DecimalInput";
import { TemplateSelector } from "../../components/templates/TemplateSelector";
import { useContractStore } from "../../state/contractStore";
import { useTemplateStore } from "../../state/templateStore";
import { useUIStore } from "../../state/uiStore";
import { parseGermanDecimal } from "../../utils/formatting";
import { Template } from "../../types/template.types";
import { ContractType, CONTRACT_TYPE_LABELS } from "../../types/contractType";

interface EditContractScreenProps {
  navigation: any;
  route?: any;
}

export const EditContractScreen: React.FC<EditContractScreenProps> = ({
  navigation,
  route,
}) => {
  const contractId = route?.params?.contractId;
  const isEditMode = !!contractId;

  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [formData, setFormData] = useState({
    provider: "",
    category: "",
    contractType: ContractType.Subscription,
    costPerCycle: "",
    billingCycle: "monthly" as "monthly" | "yearly" | "quarterly" | "weekly",
    startDate: new Date().toISOString().split("T")[0],
    cancellationNoticePeriodDays: "",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const {
    contracts,
    createContract,
    updateContract,
    deleteContract,
    isLoading,
  } = useContractStore();
  const { selectedTemplate, selectTemplate } = useTemplateStore();
  const { showToast } = useUIStore();

  // Load existing contract data when editing
  useEffect(() => {
    if (isEditMode && contractId) {
      const existingContract = contracts.find((c) => c.id === contractId);
      if (existingContract) {
        // Calculate days from cancellationNoticeDeadline if it exists
        let noticeDays = "";
        if (existingContract.cancellationNoticeDeadline) {
          const deadline = new Date(
            existingContract.cancellationNoticeDeadline
          );
          const start = new Date(existingContract.startDate);
          const diffTime = Math.abs(deadline.getTime() - start.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          noticeDays = diffDays.toString();
        }

        setFormData({
          provider: existingContract.provider,
          category: existingContract.category,
          contractType:
            existingContract.contractType ?? ContractType.Subscription,
          costPerCycle: existingContract.costPerCycle
            .toFixed(2)
            .replace(".", ","),
          billingCycle: existingContract.billingCycle,
          startDate: existingContract.startDate.split("T")[0],
          cancellationNoticePeriodDays: noticeDays,
          notes: existingContract.notes || "",
        });
      }
    }
  }, [isEditMode, contractId, contracts]);

  // Auto-fill from template when selected
  useEffect(() => {
    if (selectedTemplate) {
      applyTemplate(selectedTemplate);
    }
  }, [selectedTemplate]);

  const applyTemplate = (template: Template) => {
    setFormData((prev) => ({
      ...prev,
      provider: template.provider,
      category: template.category,
      contractType: template.contractType ?? ContractType.Subscription,
      costPerCycle: template.estimatedCost
        ? template.estimatedCost.toFixed(2).replace(".", ",")
        : prev.costPerCycle,
      billingCycle:
        mapBillingCycle(template.defaultBillingCycle) || prev.billingCycle,
      cancellationNoticePeriodDays:
        template.defaultNoticePeriodDays?.toString() || "",
    }));
    setShowTemplateSelector(false);
  };

  const mapBillingCycle = (
    cycle?: string
  ): "monthly" | "yearly" | "quarterly" | "weekly" | undefined => {
    if (!cycle) return undefined;
    const cycleLower = cycle.toLowerCase();
    if (cycleLower.includes("monat")) return "monthly";
    if (cycleLower.includes("jahr")) return "yearly";
    if (cycleLower.includes("quartal")) return "quarterly";
    if (cycleLower.includes("woche")) return "weekly";
    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.provider) {
      newErrors.provider = "Anbieter ist erforderlich";
    }

    if (!formData.category) {
      newErrors.category = "Kategorie ist erforderlich";
    }

    if (!formData.costPerCycle) {
      newErrors.costPerCycle = "Kosten sind erforderlich";
    } else {
      const numericValue = parseGermanDecimal(formData.costPerCycle);
      if (isNaN(numericValue) || numericValue <= 0) {
        newErrors.costPerCycle = "Ungültiger Betrag";
      }
    }

    if (!formData.startDate) {
      newErrors.startDate = "Startdatum ist erforderlich";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      // Calculate cancellationNoticeDeadline from startDate + days
      let cancellationNoticeDeadline: string | undefined;
      if (formData.cancellationNoticePeriodDays) {
        const startDate = new Date(formData.startDate);
        const days = parseInt(formData.cancellationNoticePeriodDays);
        const deadline = new Date(startDate);
        deadline.setDate(deadline.getDate() + days);
        cancellationNoticeDeadline = deadline.toISOString();
      }

      const contractData = {
        provider: formData.provider,
        category: formData.category,
        contractType: formData.contractType,
        costPerCycle: parseGermanDecimal(formData.costPerCycle),
        billingCycle: formData.billingCycle,
        startDate: new Date(formData.startDate).toISOString(),
        cancellationNoticeDeadline,
        notes: formData.notes || undefined,
      };

      if (isEditMode) {
        await updateContract(contractId, contractData);
        showToast("success", "Vertrag erfolgreich aktualisiert!");
      } else {
        await createContract(contractData);
        showToast("success", "Vertrag erfolgreich erstellt!");
      }

      navigation.goBack();
    } catch (error: any) {
      showToast("error", error.message || "Fehler beim Speichern des Vertrags");
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

  const handleDelete = () => {
    Alert.alert(
      "Vertrag löschen",
      "Möchten Sie diesen Vertrag wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.",
      [
        {
          text: "Abbrechen",
          style: "cancel",
        },
        {
          text: "Löschen",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteContract(contractId);
              showToast("success", "Vertrag erfolgreich gelöscht!");
              navigation.goBack();
            } catch (error: any) {
              showToast(
                "error",
                error.message || "Fehler beim Löschen des Vertrags"
              );
            }
          },
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>
            {isEditMode ? "Vertrag bearbeiten" : "Neuer Vertrag"}
          </Text>
          <Text style={styles.subtitle}>
            {isEditMode
              ? "Ändern Sie die Vertragsdaten"
              : "Fügen Sie einen neuen Vertrag hinzu"}
          </Text>
        </View>

        {!isEditMode && (
          <TouchableOpacity
            style={styles.templateButton}
            onPress={() => setShowTemplateSelector(true)}
          >
            <Text style={styles.templateButtonText}>📋 Vorlage verwenden</Text>
            <Text style={styles.templateButtonSubtext}>
              {selectedTemplate
                ? `Aktuell: ${selectedTemplate.provider}`
                : "Wählen Sie eine Vorlage für schnelleres Ausfüllen"}
            </Text>
          </TouchableOpacity>
        )}

        <View style={styles.form}>
          <Input
            label="Anbieter"
            placeholder="z.B. Netflix, Telekom, ..."
            value={formData.provider}
            onChangeText={(text) => updateField("provider", text)}
            error={errors.provider}
            required
          />

          <Input
            label="Kategorie"
            placeholder="z.B. Streaming, Telekom, Versicherung, ..."
            value={formData.category}
            onChangeText={(text) => updateField("category", text)}
            error={errors.category}
            required
          />

          <View style={styles.contractTypeContainer}>
            <Text style={styles.label}>
              Vertragstyp <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.contractTypeButtons}>
              {[
                {
                  key: ContractType.Subscription,
                  label: CONTRACT_TYPE_LABELS[ContractType.Subscription],
                },
                {
                  key: ContractType.Contract,
                  label: CONTRACT_TYPE_LABELS[ContractType.Contract],
                },
                {
                  key: ContractType.Membership,
                  label: CONTRACT_TYPE_LABELS[ContractType.Membership],
                },
              ].map((option) => (
                <Button
                  key={option.key}
                  title={option.label}
                  onPress={() =>
                    setFormData({ ...formData, contractType: option.key })
                  }
                  variant={
                    formData.contractType === option.key ? "primary" : "outline"
                  }
                  size="small"
                  style={styles.contractTypeButton}
                />
              ))}
            </View>
          </View>

          <DecimalInput
            label="Kosten pro Abrechnungszeitraum"
            placeholder="12,99"
            value={formData.costPerCycle}
            onChangeText={(text) => updateField("costPerCycle", text)}
            error={errors.costPerCycle}
            required
          />

          <View style={styles.billingCycleContainer}>
            <Text style={styles.label}>
              Abrechnungszeitraum <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.billingCycleButtons}>
              {[
                { key: "monthly", label: "Monatlich" },
                { key: "quarterly", label: "Quartalsweise" },
                { key: "yearly", label: "Jährlich" },
                { key: "weekly", label: "Wöchentlich" },
              ].map((option) => (
                <Button
                  key={option.key}
                  title={option.label}
                  onPress={() => updateField("billingCycle", option.key)}
                  variant={
                    formData.billingCycle === option.key ? "primary" : "outline"
                  }
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
            onChangeText={(text) => updateField("startDate", text)}
            error={errors.startDate}
            required
          />

          <Input
            label="Kündigungsfrist (Tage)"
            placeholder="z.B. 30"
            value={formData.cancellationNoticePeriodDays}
            onChangeText={(text) =>
              updateField("cancellationNoticePeriodDays", text)
            }
            keyboardType="numeric"
          />

          <Input
            label="Notizen"
            placeholder="Optionale Notizen..."
            value={formData.notes}
            onChangeText={(text) => updateField("notes", text)}
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
              title={isEditMode ? "Aktualisieren" : "Erstellen"}
              onPress={handleSave}
              loading={isLoading}
              style={styles.actionButton}
            />
          </View>

          {isEditMode && (
            <View style={styles.deleteContainer}>
              <Button
                title="Vertrag löschen"
                onPress={handleDelete}
                variant="outline"
                style={styles.deleteButton}
              />
            </View>
          )}
        </View>
      </ScrollView>

      <Modal
        visible={showTemplateSelector}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowTemplateSelector(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowTemplateSelector(false)}>
              <Text style={styles.modalCloseButton}>✕</Text>
            </TouchableOpacity>
          </View>
          <TemplateSelector
            onSelect={(template) => {
              selectTemplate(template);
              applyTemplate(template);
            }}
          />
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollContent: {
    padding: 24,
    paddingTop: 60,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
  },
  templateButton: {
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#BFDBFE",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  templateButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E40AF",
    marginBottom: 4,
  },
  templateButtonSubtext: {
    fontSize: 13,
    color: "#60A5FA",
  },
  form: {
    width: "100%",
  },
  contractTypeContainer: {
    marginBottom: 16,
  },
  contractTypeButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  contractTypeButton: {
    flex: 1,
    minWidth: "30%",
  },
  billingCycleContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  required: {
    color: "#EF4444",
  },
  billingCycleButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  billingCycleButton: {
    flex: 1,
    minWidth: "45%",
  },
  notesInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
  },
  actionButton: {
    flex: 1,
  },
  deleteContainer: {
    marginTop: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  deleteButton: {
    borderColor: "#EF4444",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  modalCloseButton: {
    fontSize: 24,
    color: "#6B7280",
    fontWeight: "600",
  },
});
