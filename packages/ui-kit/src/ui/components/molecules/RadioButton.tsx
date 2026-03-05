// libs/ui/src/components/molecules/RadioButton.tsx
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { Label } from "../atoms/Label";

export type RadioOption = {
  label: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
};

type RadioButtonProps = {
  options: RadioOption[];
  selectedValue?: string | number;
  onChange?: (value: string | number) => void;
  direction?: "row" | "column";
  labelSize?: "small" | "medium" | "large"; // <-- allow all sizes
};

export const RadioButton: React.FC<RadioButtonProps> = ({
  options,
  selectedValue,
  onChange,
  direction = "column",
  labelSize = "medium",
}) => {
  const [internalValue, setInternalValue] = useState(selectedValue);

  const handleSelect = (value: string | number) => {
    setInternalValue(value);
    onChange?.(value);
  };

  return (
    <View style={[styles.container, { flexDirection: direction }]}>
      {options.map((option) => {
        const isSelected = internalValue === option.value;
        return (
          <TouchableOpacity
            key={option.value}
            style={[styles.optionContainer, isSelected && styles.optionContainerSelected]}
            activeOpacity={0.7}
            onPress={() => handleSelect(option.value)}
          >
            <View style={styles.cardContent}>
              <View style={styles.headerRow}>
                {option.icon && <View style={styles.iconContainer}>{option.icon}</View>}
                <Label size={labelSize} weight={isSelected ? "bold" : "regular"}>
                  {option.label}
                </Label>
              </View>
              {!!option.description && (
                <Label size="small" color="muted" style={styles.description}>
                  {option.description}
                </Label>
              )}
            </View>

            <View style={[styles.circle, isSelected && styles.circleSelected]}>
              {/* Optional inner dot if needed, but per design it's fully yellow with border */}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },
  optionContainerSelected: {
    borderColor: "#FFC836",
    backgroundColor: "#FFFBEB",
  },
  cardContent: {
    flex: 1,
    paddingRight: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    marginRight: 8,
  },
  description: {
    marginTop: 4,
    lineHeight: 20,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  circleSelected: {
    borderColor: "#000000",
    backgroundColor: "#FFC836",
  },
});
