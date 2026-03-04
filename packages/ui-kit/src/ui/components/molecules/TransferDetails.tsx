import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "../atoms";
import { theme } from "../../../theme/theme";

interface TransferDetailsProps {
  fee: number;
  currency?: string;
}

export const TransferDetails: React.FC<TransferDetailsProps> = ({
  fee,
  currency = "IDR",
}) => {
  const formatNumber = (value: number): string => {
    return value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <Card variant="medium" radius="md" style={styles.card}>
      <View>
        <Text style={styles.title}>Transfer details</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Service fee</Text>
          <Text style={[styles.value, styles.valueRightText]}>
            {currency} {formatNumber(fee)}
          </Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.light,
  },
  title: {
    fontWeight: "700",
    fontSize: 14,
    color: theme.colors.text,
  },
  row: {
    flexDirection: "row",
    marginTop: 12,
    marginBottom: 0,
    justifyContent: "space-between",
    textAlign: "right",
  },
  label: {
    fontWeight: "500",
    fontSize: 14,
    color: "#555",
  },
  value: {
    fontSize: 14,
    fontWeight: "bold",
    color: theme.colors.text,
  },
  valueRightText: {
    textAlign: "right",
    flex: 1,
  },
});
