import React from "react";
import { Text, TextStyle } from "react-native";
import { theme } from "../../../theme/theme"; // optional, use your theme/colors

interface TabTextProps {
  children: string;
  selected?: boolean; // true = selected, false = not selected
  style?: TextStyle; // optional additional style
}

export const TabText: React.FC<TabTextProps> = ({
  children,
  selected = false,
  style,
}) => {
  return (
    <Text
      style={[
        {
          fontSize: 16,
          fontWeight: selected ? "600" : "500",
          color: selected ? "#000000" : "#9ca3af",
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};
