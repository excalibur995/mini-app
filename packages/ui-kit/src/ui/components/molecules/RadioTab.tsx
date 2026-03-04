import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { TabText } from "../atoms/TabText";
import { theme } from "../../../theme/theme";

interface RadioTabProps {
  tabs?: [string, string];
  onTabChange?: (selected: string) => void;
}

export const RadioTab: React.FC<RadioTabProps> = ({
  tabs = ["Tab 1", "Tab 2"],
  onTabChange,
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handlePress = (tab: string) => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[styles.tab, activeTab === tab && styles.tabSelected]}
          onPress={() => handlePress(tab)}
          activeOpacity={0.7}
        >
          <TabText selected={activeTab === tab}>{tab}</TabText>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: theme.colors.background,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: theme.spacing.md - 2,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabSelected: {
    borderBottomColor: theme.colors.text,
  },
});
