import React from "react";
import { ImageSourcePropType, StyleSheet, View } from "react-native";

// ✅ Updated paths based on your request
import { Label } from "../atoms/Label";
import { Logo } from "../atoms/Logo";
import { theme } from "../../../theme/theme";

type BankListProps = {
  name: string;
  logoSource: ImageSourcePropType;
};

export const BankList: React.FC<BankListProps> = ({ name, logoSource }) => {
  return (
    <View style={styles.container}>
      {/* Atom 1: Logo */}
      <View style={styles.logoWrapper}>
        <Logo source={logoSource} width={40} height={40} resizeMode="contain" />
      </View>

      {/* Atom 2: Label */}
      <Label weight="medium" size="medium">
        {name}
      </Label>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: theme.spacing.md,
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.sm,
    marginHorizontal: theme.spacing.md,
    borderWidth: 0,
    borderColor: theme.colors.border,
    ...theme.shadows.light,
  },
  logoWrapper: {
    marginRight: theme.spacing.md,
  },
});
