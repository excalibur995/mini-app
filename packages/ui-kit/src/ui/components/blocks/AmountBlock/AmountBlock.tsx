import React from "react";
import { StyleSheet, Text, TextInput, View, ViewStyle } from "react-native";
import { theme } from "../../../../theme/theme";
import { Label } from "../../atoms/Label";

export interface AmountBlockProps {
  amount: number;
  onAmountChange: (amount: number) => void;
  currency?: string;
  label?: string;
  containerStyle?: ViewStyle;
}

export const AmountBlock: React.FC<AmountBlockProps> = ({
  amount,
  onAmountChange,
  currency = "MYR",
  label = "Amount",
  containerStyle,
}: AmountBlockProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Label size="small" weight="medium" style={styles.label}>
        {label}
      </Label>
      <View style={styles.inputWrapper}>
        <Text style={styles.currency}>{currency}</Text>
        <TextInput
          style={styles.input}
          value={amount.toString()}
          onChangeText={(text) => {
            const num = parseFloat(text) || 0;
            onAmountChange(num);
          }}
          keyboardType="decimal-pad"
          placeholder="0.00"
          placeholderTextColor={theme.colors.muted}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.light,
  },
  label: {
    marginBottom: theme.spacing.sm,
    color: theme.colors.muted,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  currency: {
    fontSize: theme.typography.fontSize.xlarge,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
  },
  input: {
    flex: 1,
    fontSize: theme.typography.fontSize.xlarge,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
    padding: 0,
  },
});
