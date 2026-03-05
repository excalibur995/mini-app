// src/atoms/Input.tsx
import React, { useState } from "react";
import { KeyboardTypeOptions, StyleSheet, TextInput, TextStyle, View, ViewStyle } from "react-native";
import { theme } from "../../../theme/theme";

type SizeKey = "sm" | "md" | "lg" | "xl";

const sizeMap: Record<SizeKey, number> = {
  sm: theme.typography.fontSize.small,
  md: theme.typography.fontSize.medium,
  lg: theme.typography.fontSize.large,
  xl: theme.typography.fontSize.xlarge,
};

type InputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  radius?: number;
  borderWidth?: number;
  borderColor?: string;
  textColor?: string;
  selectionColor?: string;
  size?: SizeKey; // ✅ shortform size
  keyboardType?: KeyboardTypeOptions;
};

export const Input: React.FC<InputProps> = ({
  value,
  onChangeText,
  placeholder,
  style,
  inputStyle,
  borderWidth,
  radius = theme.radius.sm,
  borderColor = theme.colors.border,
  textColor = theme.colors.text,
  selectionColor = theme.colors.primary,
  keyboardType = "default",
  size = "md",
}) => {
  const [focused, setFocused] = useState(false);

  const borderWidthValue = borderWidth !== undefined ? borderWidth : focused ? 2 : 1;

  return (
    <View
      style={[
        styles.container,
        {
          borderRadius: radius,
          borderColor: focused ? theme.colors.primary : borderColor,
          borderWidth: borderWidthValue, // ✅ thicker border on focus
        },
        style,
      ]}
    >
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.muted}
        style={[
          styles.input,
          {
            color: textColor,
            fontSize: sizeMap[size],
            fontWeight: "600",
          },
          inputStyle,
        ]}
        keyboardType={keyboardType}
        selectionColor={selectionColor}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md - 2,
    backgroundColor: theme.colors.background,
    minHeight: 48,
  },
  input: {
    fontFamily: theme.typography.fontFamily,
    padding: 0,
    margin: 0,
  },
});
