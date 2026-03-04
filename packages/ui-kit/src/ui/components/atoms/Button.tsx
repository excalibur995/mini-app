// import type { LucideIcon } from "lucide-react-native";
type LucideIcon = any; // Placeholder

import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import { theme } from "../../../theme/theme";

type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  title: string;
  onPress: () => void;
  iconLeft?: LucideIcon;
  iconRight?: LucideIcon;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>; // ✅ Add this
  textStyle?: TextStyle;
  backgroundColor?: string;
  textColor?: string;
  size?: ButtonSize;
};

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  iconLeft,
  iconRight,
  fullWidth = false,
  style,
  textStyle,
  backgroundColor = theme.colors.primary,
  textColor = theme.colors.text,
  size = "md",
}) => {
  const sizeStyles = {
    sm: {
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.sm,
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

  const IconLeft = iconLeft;
  const IconRight = iconRight;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor },
        {
          paddingVertical: sizeStyles.paddingVertical,
          paddingHorizontal: sizeStyles.paddingHorizontal,
        },
        fullWidth && { alignSelf: "stretch" },
        style, // ✅ now works
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        {IconLeft && (
          <IconLeft
            size={sizeStyles.iconSize}
            color={textColor}
            style={styles.iconLeft}
          />
        )}
        <Text
          style={[
            styles.text,
            { color: textColor, fontSize: sizeStyles.fontSize },
            textStyle,
          ]}
        >
          {title}
        </Text>
        {IconRight && (
          <IconRight
            size={sizeStyles.iconSize}
            color={textColor}
            style={styles.iconRight}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radius.pill,
    justifyContent: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: theme.typography.fontSize.medium,
    fontWeight: "700",
  },
  iconLeft: { marginRight: theme.spacing.sm },
  iconRight: { marginLeft: theme.spacing.sm },
});
