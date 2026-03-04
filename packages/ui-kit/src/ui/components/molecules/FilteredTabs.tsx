import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Chip } from "../atoms/Chip";
import { theme } from "../../../theme/theme";

// Define the exact types of tabs you want
type TabOption = "All" | "Banks" | "Ewallets";

type FilteredTabsProps = {
  selectedTab: string; // Or use TabOption if you want strict typing
  onTabSelect: (tab: string) => void;
};

export const FilteredTabs: React.FC<FilteredTabsProps> = ({
  selectedTab,
  onTabSelect,
}) => {
  const tabs: TabOption[] = ["All", "Banks", "Ewallets"];

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {tabs.map((tab) => (
          <Chip
            key={tab}
            title={tab}
            isSelected={selectedTab === tab}
            onPress={() => onTabSelect(tab)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  scrollContent: {
    alignItems: "center",
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.sm,
  },
});
