import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "../atoms/Card";
import { theme } from "../../../theme/theme";

interface RecurringFrequencyProps {
  frequency: string;
  startDate: number | string;
  endDate: string;
}

export const RecurringFrequency: React.FC<RecurringFrequencyProps> = ({
  frequency,
  startDate,
  endDate,
}) => {
  // Helper to break string every 14 chars
  const formatTransferFrom = (str: string): string[] => {
    if (!str) return [];
    const words = str.split(" ");
    const lines: string[] = [];
    let current = "";
    for (let i = 0; i < words.length; i++) {
      if ((current + (current ? " " : "") + words[i]).length > 14) {
        if (current) lines.push(current);
        current = words[i];
      } else {
        current += (current ? " " : "") + words[i];
      }
    }
    if (current) lines.push(current);
    return lines;
  };

  return (
    <Card variant="medium" radius="md" style={styles.card}>
      <View>
        <View style={styles.row}>
          <Text style={styles.label}>Frequency</Text>
          <Text style={[styles.value, styles.valueRightText]}>{frequency}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Start date</Text>
          <Text style={[styles.value, styles.valueRightText]}>{startDate}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>End date</Text>
          <Text style={[styles.value, styles.valueRightText]}>
            {formatTransferFrom(endDate).map((chunk, idx, arr) => (
              <React.Fragment key={idx}>
                {chunk}
                {idx < arr.length - 1 && "\n"}
              </React.Fragment>
            ))}
          </Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.light,
  },
  row: {
    flexDirection: "row",
    marginBottom: theme.spacing.md,
    justifyContent: "space-between",
    textAlign: "right",
  },
  label: {
    fontWeight: theme.typography.fontWeight.regular,
    fontSize: theme.typography.fontSize.small + 2,
    color: theme.colors.muted,
  },
  value: {
    fontSize: 14,
    fontWeight: "bold",
    color: theme.colors.text,
  },
  tfvalue: {
    fontSize: 16,
    fontWeight: "bold",
    width: 100,
    color: theme.colors.secondary,
  },
  amountRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  valueRight: {
    flex: 1,
    alignItems: "flex-end",
  },
  valueRightText: {
    textAlign: "right",
    flex: 1,
  },
  amount: {
    fontSize: 20,
    color: theme.colors.secondary,
    marginRight: 4,
    fontWeight: "bold",
    maxWidth: 120,
    textAlign: "right",
  },
  amountWrap: {
    fontSize: 14,
    color: "#222",
    fontWeight: "bold",
    marginTop: 4,
    width: "50%",
    flexWrap: "wrap",
    textAlign: "right",
  },
  editButton: {
    marginLeft: 2,
    paddingVertical: 0,
    paddingHorizontal: 0,
    backgroundColor: "transparent",
  },
});
