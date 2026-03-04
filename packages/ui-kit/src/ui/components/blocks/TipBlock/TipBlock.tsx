import React from "react";
import { View, Text, TextInput, StyleSheet, ViewStyle } from "react-native";
import { Label } from "../../atoms/Label";
import { Card } from "../../atoms/Card";
import { theme } from "../../../../theme/theme";

export interface TipBlockProps {
  tip: number;
  onTipChange: (tip: number) => void;
  currency?: string;
  containerStyle?: ViewStyle;
}

export const TipBlock: React.FC<TipBlockProps> = ({
  tip,
  onTipChange,
  currency = "MYR",
  containerStyle,
}: TipBlockProps) => {
  return (
    <Card padding="md" style={containerStyle}>
      <Label size="small" weight="medium" style={styles.label}>
        Tip (Optional)
      </Label>
      <View style={styles.inputWrapper}>
        <Text style={styles.currency}>{currency}</Text>
        <TextInput
          style={styles.input}
          value={tip.toString()}
          onChangeText={(text: string) => {
            const num = parseFloat(text) || 0;
            onTipChange(num);
          }}
          keyboardType="decimal-pad"
          placeholder="0.00"
          placeholderTextColor={theme.colors.muted}
        />
      </View>
      <Text style={styles.hint}>Add a tip to support the merchant</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: theme.spacing.sm,
    color: theme.colors.muted,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  currency: {
    marginRight: theme.spacing.sm,
    color: theme.colors.primary,
    fontSize: theme.typography.fontSize.large,
    fontWeight: "600",
  },
  input: {
    flex: 1,
    fontSize: theme.typography.fontSize.large,
    fontWeight: "600",
    color: theme.colors.text,
  },
  hint: {
    fontSize: theme.typography.fontSize.small,
    color: theme.colors.muted,
    fontStyle: "italic",
  },
});
