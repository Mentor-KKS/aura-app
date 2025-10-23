import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { AlertTriangle, TrendingUp, DollarSign } from 'lucide-react-native';
import { useContractStore } from '../../state/contractStore';
import { ContractCard } from '../../components/contracts/ContractCard';
import { Card } from '../../components/ui/Card';

interface AktuellesScreenProps {
  navigation: any;
}

export const AktuellesScreen: React.FC<AktuellesScreenProps> = ({ navigation }) => {
  const { contracts, stats, isLoading, fetchContracts } = useContractStore();

  useEffect(() => {
    fetchContracts();
  }, []);

  const getDaysUntilDeadline = (contract: any): number => {
    if (!contract.cancellationNoticeDeadline) return 999;
    const deadline = new Date(contract.cancellationNoticeDeadline);
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Überfällige Fristen
  const overdueContracts = contracts.filter(
    (c) => getDaysUntilDeadline(c) < 0
  );

  // Wichtige Fristen (nächsten 7 Tage)
  const urgentContracts = contracts.filter(
    (c) => getDaysUntilDeadline(c) >= 0 && getDaysUntilDeadline(c) <= 7
  );

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={fetchContracts} />
      }
    >
      {/* Überfällige Fristen */}
      {overdueContracts.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <AlertTriangle color="#EF4444" size={24} />
            <Text style={[styles.sectionTitle, { color: '#EF4444' }]}>
              ÜBERFÄLLIG ({overdueContracts.length})
            </Text>
          </View>
          <Text style={styles.sectionSubtitle}>
            Diese Fristen sind bereits abgelaufen!
          </Text>
          {overdueContracts.map((contract) => (
            <ContractCard
              key={contract.id}
              contract={contract}
              onPress={() =>
                navigation.navigate('EditContract', { contractId: contract.id })
              }
            />
          ))}
        </View>
      )}

      {/* Wichtige Fristen (diese Woche) */}
      {urgentContracts.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <TrendingUp color="#F59E0B" size={24} />
            <Text style={[styles.sectionTitle, { color: '#F59E0B' }]}>
              WICHTIG ({urgentContracts.length})
            </Text>
          </View>
          <Text style={styles.sectionSubtitle}>
            Diese Fristen laufen in den nächsten 7 Tagen ab
          </Text>
          {urgentContracts.map((contract) => (
            <ContractCard
              key={contract.id}
              contract={contract}
              onPress={() =>
                navigation.navigate('EditContract', { contractId: contract.id })
              }
            />
          ))}
        </View>
      )}

      {/* Schnell-Statistik */}
      {stats && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <DollarSign color="#10B981" size={24} />
            <Text style={[styles.sectionTitle, { color: '#10B981' }]}>
              ÜBERSICHT
            </Text>
          </View>

          <View style={styles.statsContainer}>
            <Card style={styles.statCard} padding="medium">
              <Text style={styles.statValue}>{stats.activeContracts}</Text>
              <Text style={styles.statLabel}>Aktive Verträge</Text>
            </Card>
            <Card style={styles.statCard} padding="medium">
              <Text style={[styles.statValue, { color: '#4F46E5' }]}>
                {formatCurrency(stats.totalMonthlyCost)}
              </Text>
              <Text style={styles.statLabel}>Pro Monat</Text>
            </Card>
          </View>

          <Card style={styles.statCard} padding="medium">
            <Text style={[styles.statValue, { color: '#10B981' }]}>
              {formatCurrency(stats.totalYearlyCost)}
            </Text>
            <Text style={styles.statLabel}>Pro Jahr</Text>
          </Card>
        </View>
      )}

      {/* Empty State */}
      {overdueContracts.length === 0 && urgentContracts.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateTitle}>🎉 Alles erledigt!</Text>
          <Text style={styles.emptyStateText}>
            Sie haben keine überfälligen oder dringenden Fristen
          </Text>
        </View>
      )}
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
    letterSpacing: 0.5,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
    paddingLeft: 32,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});
