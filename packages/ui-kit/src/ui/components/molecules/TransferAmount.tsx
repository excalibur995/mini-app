// import { Pencil } from "lucide-react-native";
const Pencil = (props: any) => null; // Placeholder
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "../atoms/Button";
import { theme } from "../../../theme/theme";

interface TransferAmountProps {
  transferAmount: number | string;
  total: number | string;
  transferFrom: string;
  currency?: string;
}

export const TransferAmount: React.FC<TransferAmountProps> = ({
  transferAmount,
  total,
  transferFrom,
  currency = "IDR",
}) => {
  // Helper to format number with commas
  const formatNumber = (value: number | string): string => {
    const num = typeof value === "string" ? parseFloat(value) : value;
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

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
    <View>
      <View style={styles.row}>
        <Text style={styles.label}>Transfer Amount</Text>
        <View style={styles.valueRight}>
          <View style={styles.amountRow}>
            <Text style={styles.amount}>
              {currency} {formatNumber(transferAmount)}
            </Text>
            <Button
              title=""
              onPress={() => {
                /* empty */
              }}
              iconLeft={Pencil}
              size="sm"
              style={styles.editButton}
              textColor={theme.colors.secondary}
            />
          </View>
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Total (incl. fees)</Text>
        <Text style={[styles.value, styles.valueRightText]}>
          {currency} {formatNumber(total)}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Transfer From</Text>
        <Text style={[styles.value, styles.valueRightText]}>
          {formatTransferFrom(transferFrom).map((chunk, idx, arr) => (
            <React.Fragment key={idx}>
              {chunk}
              {idx < arr.length - 1 && "\n"}
            </React.Fragment>
          ))}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginBottom: 12,
    justifyContent: "space-between",
    textAlign: "right",
  },
  label: {
    fontWeight: "400",
    fontSize: 14,
    color: "#555",
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
