// src/atoms/CheckIndicator.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
// import { Check } from "lucide-react-native";
const Check = (props: any) => null; // Placeholder
import { theme } from "../../../theme/theme";

type CheckIndicatorProps = {
  checked: boolean; // whether the option is checked
  size?: number; // customizable size (default 20)
};

export const CheckIndicator: React.FC<CheckIndicatorProps> = ({
  checked,
  size = 20,
}) => {
  return (
    <View
      style={[
        styles.circle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: checked ? theme.colors.success : "transparent",
          borderWidth: checked ? 0 : 1,
          borderColor: theme.colors.border,
        },
      ]}
    >
      {checked && (
        <Check
          size={size * 0.7}
          color={theme.colors.background} // ✅ white tick
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    justifyContent: "center",
    alignItems: "center",
  },
});
