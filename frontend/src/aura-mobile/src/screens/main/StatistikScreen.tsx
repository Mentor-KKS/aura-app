import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { DollarSign, TrendingUp, Calendar, PieChart } from 'lucide-react-native';
import { useContractStore } from '../../state/contractStore';
import { Card } from '../../components/ui/Card';
import { ContractType, CONTRACT_TYPE_LABELS } from '../../types/contractType';

interface StatistikScreenProps {
  navigation: any;
}

export const StatistikScreen: React.FC<StatistikScreenProps> = ({ navigation }) => {
  const { contracts, stats, isLoading, fetchContracts } = useContractStore();

  useEffect(() => {
    fetchContracts();
  }, []);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  const getContractsByType = () => {
    const byType: Record<number, number> = {};
    contracts.forEach((contract) => {
      const type = contract.contractType;
      byType[type] = (byType[type] || 0) + 1;
    });
    return byType;
  };

  const getContractsByCategory = () => {
    const byCategory: Record<string, number> = {};
    contracts.forEach((contract) => {
      byCategory[contract.category] = (byCategory[contract.category] || 0) + 1;
    });
    return Object.entries(byCategory)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);
  };

  const contractsByType = getContractsByType();
  const topCategories = getContractsByCategory();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={fetchContracts} />
      }
    >
      {/* Hauptstatistiken */}
      {stats && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <DollarSign color="#4F46E5" size={24} />
            <Text style={styles.sectionTitle}>Kostenübersicht</Text>
          </View>

          <Card style={styles.statCard} padding="large">
            <Text style={styles.statLabel}>Monatliche Kosten</Text>
            <Text style={[styles.statValue, { color: '#4F46E5' }]}>
              {formatCurrency(stats.totalMonthlyCost)}
            </Text>
          </Card>

          <Card style={styles.statCard} padding="large">
            <Text style={styles.statLabel}>Jährliche Kosten</Text>
            <Text style={[styles.statValue, { color: '#10B981' }]}>
              {formatCurrency(stats.totalYearlyCost)}
            </Text>
          </Card>

          <View style={styles.statsRow}>
            <Card style={styles.smallStatCard} padding="medium">
              <Text style={styles.smallStatValue}>{stats.totalContracts}</Text>
              <Text style={styles.smallStatLabel}>Gesamt</Text>
            </Card>
            <Card style={styles.smallStatCard} padding="medium">
              <Text style={[styles.smallStatValue, { color: '#10B981' }]}>
                {stats.activeContracts}
              </Text>
              <Text style={styles.smallStatLabel}>Aktiv</Text>
            </Card>
          </View>
        </View>
      )}

      {/* Verteilung nach Typ */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <PieChart color="#F59E0B" size={24} />
          <Text style={styles.sectionTitle}>Nach Typ</Text>
        </View>

        {Object.entries(contractsByType).map(([type, count]) => (
          <Card key={type} style={styles.distributionCard} padding="medium">
            <View style={styles.distributionRow}>
              <Text style={styles.distributionLabel}>
                {CONTRACT_TYPE_LABELS[parseInt(type) as ContractType]}
              </Text>
              <Text style={styles.distributionValue}>{count}</Text>
            </View>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${(count / contracts.length) * 100}%`,
                    backgroundColor: '#4F46E5',
                  },
                ]}
              />
            </View>
          </Card>
        ))}
      </View>

      {/* Top Kategorien */}
      {topCategories.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <TrendingUp color="#10B981" size={24} />
            <Text style={styles.sectionTitle}>Top Kategorien</Text>
          </View>

          {topCategories.map(([category, count], index) => (
            <Card key={category} style={styles.distributionCard} padding="medium">
              <View style={styles.distributionRow}>
                <Text style={styles.distributionLabel}>
                  {index + 1}. {category}
                </Text>
                <Text style={styles.distributionValue}>{count}</Text>
              </View>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${(count / contracts.length) * 100}%`,
                      backgroundColor: '#10B981',
                    },
                  ]}
                />
              </View>
            </Card>
          ))}
        </View>
      )}

      {/* Empty State */}
      {contracts.length === 0 && (
        <View style={styles.emptyState}>
          <Calendar color="#9CA3AF" size={64} />
          <Text style={styles.emptyStateTitle}>Keine Daten verfügbar</Text>
          <Text style={styles.emptyStateText}>
            Fügen Sie Verträge hinzu, um Statistiken zu sehen
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
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginLeft: 8,
  },
  statCard: {
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1F2937',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  smallStatCard: {
    flex: 1,
    alignItems: 'center',
  },
  smallStatValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
  },
  smallStatLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  distributionCard: {
    marginBottom: 12,
  },
  distributionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  distributionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  distributionValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4F46E5',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});
