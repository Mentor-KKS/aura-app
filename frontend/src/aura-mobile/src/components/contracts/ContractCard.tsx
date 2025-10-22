import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Contract } from '../../types/contract.types';
import { Card } from '../ui/Card';

interface ContractCardProps {
  contract: Contract;
  onPress?: () => void;
}

export const ContractCard: React.FC<ContractCardProps> = ({ contract, onPress }) => {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  const getBillingCycleLabel = (cycle: string): string => {
    const labels: Record<string, string> = {
      monthly: 'Monatlich',
      yearly: 'Jährlich',
      quarterly: 'Quartalsweise',
      weekly: 'Wöchentlich',
    };
    return labels[cycle] || cycle;
  };

  const getStatusColor = (status: string): string => {
    const colors: Record<string, string> = {
      active: '#10B981',
      cancelled: '#EF4444',
      paused: '#F59E0B',
      expired: '#6B7280',
    };
    return colors[status] || '#6B7280';
  };

  const getStatusLabel = (status: string): string => {
    const labels: Record<string, string> = {
      active: 'Aktiv',
      cancelled: 'Gekündigt',
      paused: 'Pausiert',
      expired: 'Abgelaufen',
    };
    return labels[status] || status;
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} disabled={!onPress}>
      <Card variant="elevated" style={styles.card}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.provider}>{contract.provider}</Text>
            <Text style={styles.category}>{contract.category}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(contract.status) }]}>
            <Text style={styles.statusText}>{getStatusLabel(contract.status)}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.details}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Kosten:</Text>
            <Text style={styles.detailValue}>
              {formatCurrency(contract.costPerCycle)} / {getBillingCycleLabel(contract.billingCycle)}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Startdatum:</Text>
            <Text style={styles.detailValue}>{formatDate(contract.startDate)}</Text>
          </View>

          {contract.nextRenewalDate && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Nächste Verlängerung:</Text>
              <Text style={[styles.detailValue, styles.renewalDate]}>
                {formatDate(contract.nextRenewalDate)}
              </Text>
            </View>
          )}

          {contract.cancellationNoticeDeadline && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Kündigungsfrist:</Text>
              <Text style={[styles.detailValue, styles.deadlineDate]}>
                {formatDate(contract.cancellationNoticeDeadline)}
              </Text>
            </View>
          )}
        </View>

        {contract.notes && (
          <>
            <View style={styles.divider} />
            <Text style={styles.notes} numberOfLines={2}>
              {contract.notes}
            </Text>
          </>
        )}
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
  },
  provider: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    color: '#6B7280',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 12,
  },
  details: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  renewalDate: {
    color: '#10B981',
  },
  deadlineDate: {
    color: '#EF4444',
  },
  notes: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
  },
});
