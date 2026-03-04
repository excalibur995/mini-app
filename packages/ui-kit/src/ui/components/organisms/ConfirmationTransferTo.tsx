import React from "react";
import { StyleSheet, Text } from "react-native";
import { Card, Divider } from "../atoms";
import { AccountDetail } from "../molecules/AccountDetail";
import { TransferAmount } from "../molecules/TransferAmount";
import { theme } from "../../../theme/theme";

export const ConfirmationTransferTo: React.FC<
  React.ComponentProps<typeof AccountDetail> &
    React.ComponentProps<typeof TransferAmount>
> = (props) => {
  return (
    <Card variant="medium" radius="md" style={styles.card}>
      <Text style={styles.transferToLabel}>Transfer to</Text>
      <React.Fragment>
        <AccountDetail {...props} />
        <Divider style={styles.divider} />
        <TransferAmount {...props} />
      </React.Fragment>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginHorizontal: 16,
    backgroundColor: theme.colors.card,
    borderRadius: 8,
    borderWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  transferToLabel: {
    fontSize: 14,
    fontWeight: "400",
    color: "#9E9E9E",
    marginBottom: 12,
  },
  divider: {
    marginVertical: 16,
  },
});
