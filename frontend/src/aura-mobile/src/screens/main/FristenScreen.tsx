import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  RefreshControl,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Search, AlertCircle, Clock, Calendar } from 'lucide-react-native';
import { useContractStore } from '../../state/contractStore';
import { ContractCard } from '../../components/contracts/ContractCard';
import { Contract } from '../../types/contract.types';

interface FristenScreenProps {
  navigation: any;
}

type Section = {
  title: string;
  icon: any;
  color: string;
  data: Contract[];
};

export const FristenScreen: React.FC<FristenScreenProps> = ({ navigation }) => {
  const { contracts, isLoading, fetchContracts } = useContractStore();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchContracts();
  }, []);

  const getDaysUntilDeadline = (contract: Contract): number => {
    if (!contract.cancellationNoticeDeadline) return 999;
    const deadline = new Date(contract.cancellationNoticeDeadline);
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const categorizeContracts = (): Section[] => {
    const overdue: Contract[] = [];
    const thisWeek: Contract[] = [];
    const thisMonth: Contract[] = [];
    const later: Contract[] = [];

    contracts.forEach((contract) => {
      const days = getDaysUntilDeadline(contract);

      if (days < 0) {
        overdue.push(contract);
      } else if (days <= 7) {
        thisWeek.push(contract);
      } else if (days <= 30) {
        thisMonth.push(contract);
      } else {
        later.push(contract);
      }
    });

    const sections: Section[] = [];

    if (overdue.length > 0) {
      sections.push({
        title: `ÜBERFÄLLIG (${overdue.length})`,
        icon: AlertCircle,
        color: '#EF4444',
        data: overdue,
      });
    }

    if (thisWeek.length > 0) {
      sections.push({
        title: `DIESE WOCHE (${thisWeek.length})`,
        icon: Clock,
        color: '#F59E0B',
        data: thisWeek,
      });
    }

    if (thisMonth.length > 0) {
      sections.push({
        title: `DIESEN MONAT (${thisMonth.length})`,
        icon: Calendar,
        color: '#10B981',
        data: thisMonth,
      });
    }

    if (later.length > 0) {
      sections.push({
        title: `SPÄTER (${later.length})`,
        icon: Calendar,
        color: '#6B7280',
        data: later,
      });
    }

    return sections;
  };

  const sections = categorizeContracts();

  const filteredSections = searchQuery
    ? sections.map((section) => ({
        ...section,
        data: section.data.filter((contract) =>
          contract.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contract.category.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      })).filter((section) => section.data.length > 0)
    : sections;

  const renderSectionHeader = ({ section }: { section: Section }) => {
    const Icon = section.icon;
    return (
      <View style={[styles.sectionHeader, { borderLeftColor: section.color }]}>
        <Icon color={section.color} size={18} />
        <Text style={[styles.sectionTitle, { color: section.color }]}>
          {section.title}
        </Text>
      </View>
    );
  };

  const renderItem = ({ item }: { item: Contract }) => (
    <ContractCard
      contract={item}
      onPress={() => navigation.navigate('EditContract', { contractId: item.id })}
    />
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Search color="#9CA3AF" size={20} />
        <TextInput
          style={styles.searchInput}
          placeholder="Verträge durchsuchen..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#9CA3AF"
        />
      </View>

      {/* Contracts List */}
      <SectionList
        sections={filteredSections}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetchContracts} />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Calendar color="#9CA3AF" size={64} />
            <Text style={styles.emptyStateTitle}>Keine Fristen vorhanden</Text>
            <Text style={styles.emptyStateText}>
              Fügen Sie Ihren ersten Vertrag hinzu
            </Text>
          </View>
        }
        stickySectionHeadersEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderLeftWidth: 4,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    marginLeft: 8,
    letterSpacing: 0.5,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
});
