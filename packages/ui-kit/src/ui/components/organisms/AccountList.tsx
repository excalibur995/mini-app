import { ScrollView, StyleSheet } from "react-native";
import React from "react";
import { AccountDetailProps, AccountDetail } from "../molecules";
import { theme } from "../../../theme/theme";

const AccountList: React.FC<{ data: AccountDetailProps[] }> = ({ data }) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {data?.map((item) => (
        <AccountDetail key={item.name} {...item} variant="variant1" />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.md,
    gap: theme.spacing.xs,
  },
});

export { AccountList };
