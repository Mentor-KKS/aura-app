import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { useContractStore } from '../../state/contractStore';
import { useAuthStore } from '../../state/authStore';
import { ContractCard } from '../../components/contracts/ContractCard';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { contracts, stats, isLoading, fetchContracts } = useContractStore();
  const { user, logout } = useAuthStore();

  useEffect(() => {
    fetchContracts();
  }, []);

  const handleRefresh = () => {
    fetchContracts();
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hallo, {user?.firstName}!</Text>
          <Text style={styles.subGreeting}>Ihre Vertragsübersicht</Text>
        </View>
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Abmelden</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Cards */}
      {stats && (
        <View style={styles.statsContainer}>
          <Card style={styles.statCard} padding="medium">
            <Text style={styles.statValue}>{stats.activeContracts}</Text>
            <Text style={styles.statLabel}>Aktive Verträge</Text>
          </Card>
          <Card style={styles.statCard} padding="medium">
            <Text style={[styles.statValue, styles.costValue]}>
              {formatCurrency(stats.totalMonthlyCost)}
            </Text>
            <Text style={styles.statLabel}>Pro Monat</Text>
          </Card>
        </View>
      )}

      {/* Contracts List */}
      <View style={styles.listContainer}>
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>Meine Verträge</Text>
          <Button
            title="+ Neu"
            onPress={() => navigation.navigate('CreateContract')}
            size="small"
          />
        </View>

        {contracts.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>Keine Verträge vorhanden</Text>
            <Text style={styles.emptyStateText}>
              Fügen Sie Ihren ersten Vertrag hinzu
            </Text>
            <Button
              title="Vertrag hinzufügen"
              onPress={() => navigation.navigate('CreateContract')}
              style={styles.emptyStateButton}
            />
          </View>
        ) : (
          <FlatList
            data={contracts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ContractCard
                contract={item}
                onPress={() => navigation.navigate('ContractDetail', { contractId: item.id })}
              />
            )}
            contentContainerStyle={styles.listContent}
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
            }
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    paddingTop: 60,
    backgroundColor: '#FFFFFF',
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
  },
  subGreeting: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  logoutButton: {
    padding: 8,
  },
  logoutText: {
    fontSize: 14,
    color: '#EF4444',
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1F2937',
  },
  costValue: {
    color: '#4F46E5',
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  listContainer: {
    flex: 1,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 24,
  },
  emptyStateButton: {
    minWidth: 200,
  },
});
