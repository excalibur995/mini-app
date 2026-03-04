import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { Icon } from "../atoms/Icon"; // your atom
import { theme } from "../../../theme/theme";

export interface CheckboxProps {
  size?: number; // diameter
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export function Checkbox({
  size = 24,
  checked = false,
  onChange,
}: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(checked);

  const toggleCheck = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange?.(newValue);
  };

  return (
    <TouchableOpacity onPress={toggleCheck} activeOpacity={0.8}>
      <View
        style={[
          styles.checkbox,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: isChecked
              ? theme.colors.success
              : theme.colors.background,
            borderColor: isChecked
              ? theme.colors.success
              : theme.colors.gray.medium,
          },
        ]}
      >
        {isChecked && (
          <Icon
            icon="check"
            size={size * 0.6}
            color={theme.colors.background}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});
