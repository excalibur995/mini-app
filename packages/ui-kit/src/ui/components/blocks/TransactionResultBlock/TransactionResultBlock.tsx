import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { Label } from "../../atoms/Label";
import { Button } from "../../atoms/Button";
import { Card } from "../../atoms/Card";
import { theme } from "../../../../theme/theme";

export interface TransactionResultBlockProps {
  status: "success" | "failure" | "pending";
  message: string;
  transactionId?: string;
  onDone: () => void;
  containerStyle?: ViewStyle;
}

export const TransactionResultBlock: React.FC<TransactionResultBlockProps> = ({
  status,
  message,
  transactionId,
  onDone,
  containerStyle,
}: TransactionResultBlockProps) => {
  const statusConfig = {
    success: {
      color: "#4CAF50",
      icon: "✓",
      title: "Transaction Successful",
    },
    failure: {
      color: "#F44336",
      icon: "✕",
      title: "Transaction Failed",
    },
    pending: {
      color: "#FF9800",
      icon: "⏳",
      title: "Processing...",
    },
  };

  const config = statusConfig[status];

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.iconContainer, { borderColor: config.color }]}>
        <Text style={[styles.icon, { color: config.color }]}>
          {config.icon}
        </Text>
      </View>

      <Text style={[styles.statusText, { color: config.color }]}>
        {config.title}
      </Text>

      <Text style={styles.messageText}>{message}</Text>

      {transactionId && (
        <Card padding="md" style={styles.transactionCard}>
          <Label size="small" weight="medium" style={styles.transactionLabel}>
            Transaction ID
          </Label>
          <Text style={styles.transactionId}>{transactionId}</Text>
        </Card>
      )}

      <Button
        onPress={onDone}
        title={status === "success" ? "Make Another Transfer" : "Try Again"}
        size="lg"
        fullWidth
        style={[styles.button, { backgroundColor: config.color }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing.lg,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.lg,
  },
  icon: {
    fontSize: 40,
  },
  statusText: {
    marginBottom: theme.spacing.md,
    fontSize: theme.typography.fontSize.xlarge,
    fontWeight: theme.typography.fontWeight.bold,
    textAlign: "center",
  },
  messageText: {
    marginBottom: theme.spacing.lg,
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.muted,
    textAlign: "center",
  },
  transactionCard: {
    width: "100%",
    marginBottom: theme.spacing.lg,
  },
  transactionLabel: {
    textAlign: "center",
    color: theme.colors.muted,
    marginBottom: theme.spacing.xs,
  },
  transactionId: {
    textAlign: "center",
    fontSize: theme.typography.fontSize.medium,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
  },
  button: {
    marginTop: theme.spacing.md,
  },
});
