import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { useContractStore } from "../../state/contractStore";
import { useAuthStore } from "../../state/authStore";
import { ContractCard } from "../../components/contracts/ContractCard";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { ContractType, CONTRACT_TYPE_LABELS } from "../../types/contractType";

interface HomeScreenProps {
  navigation: any;
}

type TabFilter = "all" | ContractType;

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { contracts, stats, isLoading, fetchContracts } = useContractStore();
  const { user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState<TabFilter>("all");

  useEffect(() => {
    fetchContracts();
  }, []);

  const handleRefresh = () => {
    fetchContracts();
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  // Filter contracts based on active tab
  const filteredContracts = contracts.filter((contract) => {
    if (activeTab === "all") return true;
    return contract.contractType === activeTab;
  });

  // Count contracts by type
  const subscriptionCount = contracts.filter(
    (c) => c.contractType === ContractType.Subscription
  ).length;
  const contractCount = contracts.filter(
    (c) => c.contractType === ContractType.Contract
  ).length;
  const membershipCount = contracts.filter(
    (c) => c.contractType === ContractType.Membership
  ).length;

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

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "all" && styles.tabActive]}
          onPress={() => setActiveTab("all")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "all" && styles.tabTextActive,
            ]}
          >
            Alle ({contracts.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === ContractType.Subscription && styles.tabActive,
          ]}
          onPress={() => setActiveTab(ContractType.Subscription)}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === ContractType.Subscription && styles.tabTextActive,
            ]}
          >
            {CONTRACT_TYPE_LABELS[ContractType.Subscription]} (
            {subscriptionCount})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === ContractType.Contract && styles.tabActive,
          ]}
          onPress={() => setActiveTab(ContractType.Contract)}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === ContractType.Contract && styles.tabTextActive,
            ]}
          >
            {CONTRACT_TYPE_LABELS[ContractType.Contract]} ({contractCount})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === ContractType.Membership && styles.tabActive,
          ]}
          onPress={() => setActiveTab(ContractType.Membership)}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === ContractType.Membership && styles.tabTextActive,
            ]}
          >
            {CONTRACT_TYPE_LABELS[ContractType.Membership]} ({membershipCount})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Contracts List */}
      <View style={styles.listContainer}>
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>
            {activeTab === "all"
              ? "Alle Verträge"
              : CONTRACT_TYPE_LABELS[activeTab as ContractType]}
          </Text>
          <Button
            title="+ Neu"
            onPress={() => navigation.navigate("CreateContract")}
            size="small"
          />
        </View>

        {filteredContracts.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>
              {activeTab === "all"
                ? "Keine Verträge vorhanden"
                : "Keine Einträge"}
            </Text>
            <Text style={styles.emptyStateText}>
              {activeTab === "all"
                ? "Fügen Sie Ihren ersten Vertrag hinzu"
                : `Keine ${
                    CONTRACT_TYPE_LABELS[activeTab as ContractType]
                  } vorhanden`}
            </Text>
            <Button
              title="Vertrag hinzufügen"
              onPress={() => navigation.navigate("CreateContract")}
              style={styles.emptyStateButton}
            />
          </View>
        ) : (
          <FlatList
            data={filteredContracts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ContractCard
                contract={item}
                onPress={() =>
                  navigation.navigate("EditContract", { contractId: item.id })
                }
              />
            )}
            contentContainerStyle={styles.listContent}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={handleRefresh}
              />
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
    backgroundColor: "#F9FAFB",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24,
    paddingTop: 60,
    backgroundColor: "#FFFFFF",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
  },
  subGreeting: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
  logoutButton: {
    padding: 8,
  },
  logoutText: {
    fontSize: 14,
    color: "#EF4444",
    fontWeight: "600",
  },
  statsContainer: {
    flexDirection: "row",
    padding: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1F2937",
  },
  costValue: {
    color: "#4F46E5",
  },
  statLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
  tabsContainer: {
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingBottom: 16,
    gap: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
  },
  tabActive: {
    backgroundColor: "#4F46E5",
    borderColor: "#4F46E5",
  },
  tabText: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "600",
  },
  tabTextActive: {
    color: "#FFFFFF",
  },
  listContainer: {
    flex: 1,
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 24,
  },
  emptyStateButton: {
    minWidth: 200,
  },
});
