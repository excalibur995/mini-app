import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "../../atoms/Card";
import { theme } from "../../../../theme/theme";

export interface TransactionBlockProps {
  title: string;
  amount: number;
  currency?: string;
  description?: string;
  status?: "pending" | "success" | "failed";
}

export const TransactionBlock: React.FC<TransactionBlockProps> = ({
  title,
  amount,
  currency = "RM",
  description,
  status = "pending",
}) => {
  const statusColors = {
    pending: "#FF9800",
    success: "#4CAF50",
    failed: "#F44336",
  };

  return (
    <Card padding="md">
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View style={[styles.badge, { backgroundColor: statusColors[status] }]}>
          <Text style={styles.badgeText}>{status.toUpperCase()}</Text>
        </View>
      </View>
      <View style={styles.amount}>
        <Text style={styles.amountText}>
          {currency} {amount.toFixed(2)}
        </Text>
      </View>
      {description && <Text style={styles.description}>{description}</Text>}
    </Card>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.fontSize.large,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text,
  },
  badge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radius.sm,
  },
  badgeText: {
    fontSize: theme.typography.fontSize.small,
    fontWeight: theme.typography.fontWeight.medium,
    color: "#ffffff",
  },
  amount: {
    marginVertical: theme.spacing.sm,
  },
  amountText: {
    fontSize: theme.typography.fontSize.xlarge,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
  },
  description: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.muted,
  },
});
