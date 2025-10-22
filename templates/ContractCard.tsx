import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import { de } from "date-fns/locale";

interface Contract {
  id: string;
  provider: string;
  category: string;
  costPerCycle: number;
  billingCycle: string;
  nextRenewalDate: string;
  cancellationNoticeDeadline?: string;
  status: string;
  reminder?: {
    enabled: boolean;
    levels: Array<{
      name: string;
      color: string;
      daysBeforeDeadline: number;
    }>;
  };
}

interface ContractCardProps {
  contract: Contract;
  onPress?: (id: string) => void;
}

export const ContractCard: React.FC<ContractCardProps> = ({
  contract,
  onPress,
}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress(contract.id);
    } else {
      navigation.navigate("ContractDetail", { id: contract.id });
    }
  };

  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      streaming: "#E50914",
      fitness: "#00D084",
      telecom: "#E20074",
      utilities: "#FFA500",
      insurance: "#0066CC",
      software: "#7B68EE",
    };
    return colors[category] || "#6B7280";
  };

  const getReminderBadgeColor = (): string | null => {
    if (!contract.reminder?.enabled || !contract.cancellationNoticeDeadline) {
      return null;
    }

    const deadline = new Date(contract.cancellationNoticeDeadline);
    const now = new Date();
    const daysUntilDeadline = Math.floor(
      (deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysUntilDeadline <= 3) return "#EF4444"; // Red
    if (daysUntilDeadline <= 14) return "#F59E0B"; // Yellow
    if (daysUntilDeadline <= 56) return "#3B82F6"; // Blue

    return null;
  };

  const formatCost = (cost: number, cycle: string): string => {
    const formatted = cost.toFixed(2);
    const cycleText =
      cycle === "monthly"
        ? "/Monat"
        : cycle === "yearly"
        ? "/Jahr"
        : cycle === "quarterly"
        ? "/Quartal"
        : "/Woche";
    return `${formatted}€${cycleText}`;
  };

  const reminderColor = getReminderBadgeColor();

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="bg-white rounded-lg p-4 mb-3 shadow-sm active:opacity-70"
      activeOpacity={0.7}
    >
      {/* Header with Provider and Cost */}
      <View className="flex-row justify-between items-start mb-2">
        <View className="flex-1">
          <Text className="text-lg font-semibold text-gray-900">
            {contract.provider}
          </Text>
          <View className="flex-row items-center mt-1">
            <View
              className="px-2 py-1 rounded"
              style={{
                backgroundColor: getCategoryColor(contract.category) + "20",
              }}
            >
              <Text
                className="text-xs font-medium"
                style={{ color: getCategoryColor(contract.category) }}
              >
                {contract.category}
              </Text>
            </View>
          </View>
        </View>

        <View className="items-end">
          <Text className="text-xl font-bold text-gray-900">
            {formatCost(contract.costPerCycle, contract.billingCycle)}
          </Text>
          {reminderColor && (
            <View
              className="mt-2 w-3 h-3 rounded-full"
              style={{ backgroundColor: reminderColor }}
            />
          )}
        </View>
      </View>

      {/* Renewal Date */}
      {contract.nextRenewalDate && (
        <View className="flex-row items-center mt-2">
          <Text className="text-sm text-gray-600">Nächste Verlängerung: </Text>
          <Text className="text-sm font-medium text-gray-900">
            {format(new Date(contract.nextRenewalDate), "dd.MM.yyyy", {
              locale: de,
            })}
          </Text>
        </View>
      )}

      {/* Cancellation Deadline */}
      {contract.cancellationNoticeDeadline && (
        <View className="flex-row items-center mt-1">
          <Text className="text-sm text-gray-600">Kündigungsfrist: </Text>
          <Text className="text-sm font-medium text-gray-900">
            {format(
              new Date(contract.cancellationNoticeDeadline),
              "dd.MM.yyyy",
              { locale: de }
            )}
          </Text>
        </View>
      )}

      {/* Status Badge */}
      <View className="flex-row items-center mt-3">
        <View
          className={`px-2 py-1 rounded ${
            contract.status === "active"
              ? "bg-green-100"
              : contract.status === "cancelled"
              ? "bg-red-100"
              : "bg-gray-100"
          }`}
        >
          <Text
            className={`text-xs font-medium ${
              contract.status === "active"
                ? "text-green-800"
                : contract.status === "cancelled"
                ? "text-red-800"
                : "text-gray-800"
            }`}
          >
            {contract.status === "active"
              ? "Aktiv"
              : contract.status === "cancelled"
              ? "Gekündigt"
              : contract.status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
