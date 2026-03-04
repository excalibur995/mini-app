import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Card } from "../atoms";
import { theme } from "../../../theme/theme";

interface TransactionDetailstProps {
  type: string;
  mode: string;
  purpose: string;
  remark: string;
  notifyEmail?: string;
  notifySMS?: string;
}

export const TransactionDetails: React.FC<TransactionDetailstProps> = ({
  type,
  mode,
  purpose,
  remark,
  notifyEmail,
  notifySMS,
}) => {
  return (
    <Card variant="medium" radius="md" style={styles.card}>
      <View>
        <View style={styles.amountRow}>
          <Text style={styles.title}>Transaction details</Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Transaction type</Text>
          <Text style={[styles.value, styles.valueRightText]}>{type}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Transfer mode</Text>
          <Text style={[styles.value, styles.valueRightText]}>{mode}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Purpose of transfer</Text>
          <Text style={[styles.value, styles.valueRightText]}>{purpose}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Remark</Text>
          <Text style={[styles.value, styles.valueRightText]}>{remark}</Text>
        </View>
        {notifySMS ? (
          <View style={styles.row}>
            <Text style={styles.label}>Notify via SMS</Text>
            <Text style={[styles.value, styles.valueRightText]}>
              {notifySMS}
            </Text>
          </View>
        ) : null}
        {notifyEmail ? (
          <View style={styles.row}>
            <Text style={styles.label}>Notify via email address</Text>
            <Text style={[styles.value, styles.valueRightText]}>
              {notifyEmail}
            </Text>
          </View>
        ) : null}
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
  amountRow: {
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    marginVertical: 6,
    justifyContent: "space-between",
    textAlign: "right",
  },
  rowWithButton: {
    flexDirection: "row",
    marginVertical: 8,
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
  editText: {
    fontSize: 14,
    color: theme.colors.secondary,
    fontWeight: "400",
  },
});
