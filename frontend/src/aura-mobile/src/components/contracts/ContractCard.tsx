import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ChevronRight } from "lucide-react-native";
import { Contract } from "../../types/contract.types";
import { Card } from "../ui/Card";
import { StatusBadge } from "../ui/StatusBadge";
import { colors, spacing, typography, borderRadius } from "../../theme";

interface ContractCardProps {
  contract: Contract;
  onPress?: () => void;
}

export const ContractCard: React.FC<ContractCardProps> = ({
  contract,
  onPress,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Helper Functions
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  const getBillingCycleLabel = (cycle: string): string => {
    const labels: Record<string, string> = {
      monthly: "Monatlich",
      yearly: "Jährlich",
      quarterly: "Quartalsweise",
      weekly: "Wöchentlich",
    };
    return labels[cycle] || cycle;
  };

  const getStatusVariant = (status: string) => {
    const variants: Record<
      string,
      "success" | "error" | "warning" | "neutral"
    > = {
      active: "success",
      cancelled: "error",
      paused: "warning",
      expired: "neutral",
    };
    return variants[status] || "neutral";
  };

  const getStatusLabel = (status: string): string => {
    const labels: Record<string, string> = {
      active: "Aktiv",
      cancelled: "Gekündigt",
      paused: "Pausiert",
      expired: "Abgelaufen",
    };
    return labels[status] || status;
  };

  return (
    <TouchableOpacity
      onPress={() => setIsExpanded(!isExpanded)}
      activeOpacity={0.7}
    >
      <Card variant="elevated" style={styles.card}>
        {/* Header - Always Visible */}
        <View style={styles.header}>
          <View style={styles.leftSection}>
            <Text style={styles.provider}>{contract.provider}</Text>
            <Text style={styles.category}>{contract.category}</Text>
          </View>
          <View style={styles.rightSection}>
            <StatusBadge
              label={getStatusLabel(contract.status)}
              variant={getStatusVariant(contract.status)}
            />
          </View>
        </View>

        {/* Expanded Details */}
        {isExpanded && (
          <View style={styles.details}>
            <DetailRow
              label="Kosten"
              value={`${formatCurrency(
                contract.costPerCycle
              )} / ${getBillingCycleLabel(contract.billingCycle)}`}
            />
            {contract.startDate && (
              <DetailRow
                label="Startdatum"
                value={formatDate(contract.startDate)}
              />
            )}
            {contract.nextRenewalDate && (
              <DetailRow
                label="Nächste Verlängerung"
                value={formatDate(contract.nextRenewalDate)}
              />
            )}
            {contract.cancellationNoticeDeadline && (
              <DetailRow
                label="Kündigungsfrist"
                value={formatDate(contract.cancellationNoticeDeadline)}
              />
            )}
            {contract.notes && (
              <View style={styles.notesSection}>
                <Text style={styles.notesLabel}>Notizen:</Text>
                <Text style={styles.notesText}>{contract.notes}</Text>
              </View>
            )}
          </View>
        )}

        {/* Edit Button - Always Visible */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={onPress}
          activeOpacity={0.7}
        >
          <Text style={styles.editButtonText}>Bearbeiten</Text>
          <ChevronRight size={16} color={colors.primary[500]} />
        </TouchableOpacity>
      </Card>
    </TouchableOpacity>
  );
};

// Extracted Detail Row Component
const DetailRow: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}:</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: spacing.md,
  },
  leftSection: {
    flex: 1,
  },
  provider: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  category: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  rightSection: {
    marginLeft: spacing.md,
  },
  details: {
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    paddingTop: spacing.md,
    marginBottom: spacing.md,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },
  detailLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    fontWeight: typography.fontWeight.medium,
  },
  detailValue: {
    fontSize: typography.fontSize.sm,
    color: colors.text.primary,
    fontWeight: typography.fontWeight.semibold,
  },
  notesSection: {
    marginTop: spacing.sm,
    padding: spacing.md,
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.md,
  },
  notesLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  notesText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.primary,
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.sm,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  editButtonText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.primary[500],
    marginRight: spacing.xs,
  },
});
