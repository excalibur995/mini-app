import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { Label } from "../../atoms/Label";
import { Card } from "../../atoms/Card";
import { theme } from "../../../../theme/theme";

export interface MerchantInfoBlockProps {
  merchantName: string;
  merchantId: string;
  description?: string;
  containerStyle?: ViewStyle;
}

export const MerchantInfoBlock: React.FC<MerchantInfoBlockProps> = ({
  merchantName,
  merchantId,
  description,
  containerStyle,
}: MerchantInfoBlockProps) => {
  return (
    <Card padding="md" style={containerStyle}>
      <Label size="small" weight="medium" style={styles.label}>
        Recipient
      </Label>
      <Text style={styles.merchantName}>{merchantName}</Text>
      <Text style={styles.merchantId}>ID: {merchantId}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
    </Card>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: theme.spacing.xs,
    color: theme.colors.muted,
  },
  merchantName: {
    marginBottom: theme.spacing.xs,
    fontSize: theme.typography.fontSize.large,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
  },
  merchantId: {
    marginBottom: theme.spacing.sm,
    fontSize: theme.typography.fontSize.small,
    color: theme.colors.muted,
  },
  description: {
    marginTop: theme.spacing.sm,
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.muted,
  },
});
