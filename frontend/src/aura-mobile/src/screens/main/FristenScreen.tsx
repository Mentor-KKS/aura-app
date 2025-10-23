import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  RefreshControl,
  TextInput,
} from "react-native";
import {
  Search,
  AlertCircle,
  Clock,
  Calendar,
  Bell,
} from "lucide-react-native";
import { useContractStore } from "../../state/contractStore";
import { useReminderStore } from "../../state/reminderStore";
import { ContractCard } from "../../components/contracts/ContractCard";
import { ReminderCard } from "../../components/reminders/ReminderCard";
import { Contract } from "../../types/contract.types";
import { Reminder } from "../../types/reminder.types";

interface FristenScreenProps {
  navigation: any;
}

type ItemType = "contract" | "reminder";

type CombinedItem = {
  type: ItemType;
  data: Contract | Reminder;
  daysUntil: number;
};

type Section = {
  title: string;
  icon: any;
  color: string;
  data: CombinedItem[];
};

export const FristenScreen: React.FC<FristenScreenProps> = ({ navigation }) => {
  const {
    contracts,
    isLoading: contractsLoading,
    fetchContracts,
  } = useContractStore();
  const {
    reminders,
    isLoading: remindersLoading,
    fetchReminders,
    toggleComplete,
  } = useReminderStore();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchContracts();
    fetchReminders();
  }, []);

  const getDaysUntilDeadline = (contract: Contract): number => {
    if (!contract.cancellationNoticeDeadline) return 999;
    const deadline = new Date(contract.cancellationNoticeDeadline);
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDaysUntilReminder = (reminder: Reminder): number => {
    if (reminder.isCompleted) return 999;
    const dueDate = new Date(reminder.dueDate);
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const categorizeItems = (): Section[] => {
    const overdue: CombinedItem[] = [];
    const thisWeek: CombinedItem[] = [];
    const thisMonth: CombinedItem[] = [];
    const later: CombinedItem[] = [];
    const completed: CombinedItem[] = [];

    // Add contracts
    contracts.forEach((contract) => {
      const days = getDaysUntilDeadline(contract);
      const item: CombinedItem = {
        type: "contract",
        data: contract,
        daysUntil: days,
      };

      if (days < 0) {
        overdue.push(item);
      } else if (days <= 7) {
        thisWeek.push(item);
      } else if (days <= 30) {
        thisMonth.push(item);
      } else {
        later.push(item);
      }
    });

    // Add reminders
    reminders.forEach((reminder) => {
      const days = getDaysUntilReminder(reminder);
      const item: CombinedItem = {
        type: "reminder",
        data: reminder,
        daysUntil: days,
      };

      if (reminder.isCompleted) {
        completed.push(item);
      } else if (days < 0) {
        overdue.push(item);
      } else if (days <= 7) {
        thisWeek.push(item);
      } else if (days <= 30) {
        thisMonth.push(item);
      } else {
        later.push(item);
      }
    });

    const sections: Section[] = [];

    if (overdue.length > 0) {
      sections.push({
        title: `ÜBERFÄLLIG (${overdue.length})`,
        icon: AlertCircle,
        color: "#EF4444",
        data: overdue.sort((a, b) => a.daysUntil - b.daysUntil),
      });
    }

    if (thisWeek.length > 0) {
      sections.push({
        title: `DIESE WOCHE (${thisWeek.length})`,
        icon: Clock,
        color: "#F59E0B",
        data: thisWeek.sort((a, b) => a.daysUntil - b.daysUntil),
      });
    }

    if (thisMonth.length > 0) {
      sections.push({
        title: `DIESEN MONAT (${thisMonth.length})`,
        icon: Calendar,
        color: "#10B981",
        data: thisMonth.sort((a, b) => a.daysUntil - b.daysUntil),
      });
    }

    if (later.length > 0) {
      sections.push({
        title: `SPÄTER (${later.length})`,
        icon: Calendar,
        color: "#6B7280",
        data: later.sort((a, b) => a.daysUntil - b.daysUntil),
      });
    }

    if (completed.length > 0) {
      sections.push({
        title: `ERLEDIGT (${completed.length})`,
        icon: Bell,
        color: "#9CA3AF",
        data: completed,
      });
    }

    return sections;
  };

  const sections = categorizeItems();

  const filteredSections = searchQuery
    ? sections
        .map((section) => ({
          ...section,
          data: section.data.filter((item) => {
            const query = searchQuery.toLowerCase();
            if (item.type === "contract") {
              const contract = item.data as Contract;
              return (
                contract.provider.toLowerCase().includes(query) ||
                contract.category.toLowerCase().includes(query)
              );
            } else {
              const reminder = item.data as Reminder;
              return (
                reminder.title.toLowerCase().includes(query) ||
                reminder.description?.toLowerCase().includes(query) ||
                reminder.category?.toLowerCase().includes(query)
              );
            }
          }),
        }))
        .filter((section) => section.data.length > 0)
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

  const handleToggleComplete = async (reminderId: string) => {
    try {
      await toggleComplete(reminderId);
    } catch (error) {
      console.error("Error toggling reminder:", error);
    }
  };

  const renderItem = ({ item }: { item: CombinedItem }) => {
    if (item.type === "contract") {
      const contract = item.data as Contract;
      return (
        <ContractCard
          contract={contract}
          onPress={() =>
            navigation.navigate("EditContract", { contractId: contract.id })
          }
        />
      );
    } else {
      const reminder = item.data as Reminder;
      return (
        <ReminderCard
          reminder={reminder}
          onPress={() =>
            navigation.navigate("ReminderScreen", { reminderId: reminder.id })
          }
          onToggleComplete={() => handleToggleComplete(reminder.id)}
        />
      );
    }
  };

  const isLoading = contractsLoading || remindersLoading;

  const handleRefresh = () => {
    fetchContracts();
    fetchReminders();
  };

  // Header component that scrolls with the list
  const ListHeader = () => (
    <View style={styles.listHeader}>
      <Text style={styles.headerTitle}>Alle Fristen</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Search color="#9CA3AF" size={20} />
        <TextInput
          style={styles.searchInput}
          placeholder="Fristen & Erinnerungen durchsuchen..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#9CA3AF"
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <SectionList
        sections={filteredSections}
        keyExtractor={(item) => {
          if (item.type === "contract") {
            return `contract-${(item.data as Contract).id}`;
          } else {
            return `reminder-${(item.data as Reminder).id}`;
          }
        }}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Calendar color="#9CA3AF" size={64} />
            <Text style={styles.emptyStateTitle}>Keine Fristen vorhanden</Text>
            <Text style={styles.emptyStateText}>
              Fügen Sie Ihren ersten Vertrag oder Erinnerung hinzu
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
    backgroundColor: "#F9FAFB",
  },
  listHeader: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
    backgroundColor: "#F9FAFB",
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
    color: "#1F2937",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderLeftWidth: 4,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    marginLeft: 8,
    letterSpacing: 0.5,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 64,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: "#6B7280",
  },
});
