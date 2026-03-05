// import type { LucideIcon } from "lucide-react-native";
type LucideIcon = any; // Placeholder

import React from "react";
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";

import { theme } from "../../../theme/theme";

type ButtonSize = "sm" | "md" | "lg";
export type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  title: string;
  onPress: () => void;
  iconLeft?: LucideIcon;
  iconRight?: LucideIcon;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: TextStyle;
  variant?: ButtonVariant;
  size?: ButtonSize;
  backgroundColor?: string;
  textColor?: string;
};

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  iconLeft,
  iconRight,
  fullWidth = false,
  style,
  textStyle,
  variant = "primary",
  size = "md",
  backgroundColor,
  textColor,
}) => {
  const sizeStyles = {
    sm: {
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      fontSize: theme.typography.fontSize.small,
      iconSize: 16,
    },
    md: {
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.md,
      fontSize: theme.typography.fontSize.medium,
      iconSize: 20,
    },
    lg: {
      paddingVertical: theme.spacing.lg,
      paddingHorizontal: theme.spacing.lg,
      fontSize: theme.typography.fontSize.large,
      iconSize: 24,
    },
  }[size];

  const variantStyles = {
    primary: {
      backgroundColor: backgroundColor || theme.colors.primary,
      textColor: textColor || "#000000",
      borderColor: "transparent",
      borderWidth: 0,
    },
    secondary: {
      backgroundColor: backgroundColor || "#FFFFFF",
      textColor: textColor || "#000000",
      borderColor: "#000000",
      borderWidth: 1,
    },
  }[variant] || {
    backgroundColor: backgroundColor || theme.colors.primary,
    textColor: textColor || "#000000",
    borderColor: "transparent",
    borderWidth: 0,
  };

  const IconLeft = iconLeft;
  const IconRight = iconRight;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: variantStyles.backgroundColor,
          borderColor: variantStyles.borderColor,
          borderWidth: variantStyles.borderWidth,
          paddingVertical: sizeStyles.paddingVertical,
          paddingHorizontal: sizeStyles.paddingHorizontal,
        },
        fullWidth && { alignSelf: "stretch" },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        {IconLeft && <IconLeft size={sizeStyles.iconSize} color={variantStyles.textColor} style={styles.iconLeft} />}
        <Text style={[styles.text, { color: variantStyles.textColor, fontSize: sizeStyles.fontSize }, textStyle]}>
          {title}
        </Text>
        {IconRight && <IconRight size={sizeStyles.iconSize} color={variantStyles.textColor} style={styles.iconRight} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.radius.pill,
    justifyContent: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "700",
  },
  iconLeft: { marginRight: theme.spacing.sm },
  iconRight: { marginLeft: theme.spacing.sm },
});
