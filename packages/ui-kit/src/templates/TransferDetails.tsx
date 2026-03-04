import React from "react";
import { StyleSheet, View } from "react-native";
import { theme } from "../theme/theme";

type TransferDetailsProps = {
  Header?: React.ReactNode;
  AccountDetail?: React.ReactNode;
  TransferForm?: React.ReactNode;
  NotificationForm?: React.ReactNode;
  Button?: React.ReactNode;
};

const TransferDetails = ({
  Header,
  AccountDetail,
  TransferForm,
  NotificationForm,
  Button,
}: TransferDetailsProps) => {
  return (
    <View style={styles.container}>
      {Header}
      {AccountDetail}
      {TransferForm}
      {NotificationForm}
      {Button}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    gap: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: 16,
  },
});

export { TransferDetails };
