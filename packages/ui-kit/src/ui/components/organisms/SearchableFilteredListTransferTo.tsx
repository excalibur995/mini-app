// import { X } from "lucide-react-native";
const X = (props: any) => null; // Placeholder
import React, { useMemo, useState } from "react";
import {
  FlatList,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SearchInput } from "../molecules";
import { BankList } from "../molecules/BankList";
import { FilteredTabs } from "../molecules/FilteredTabs";
import { theme } from "../../../theme/theme";

export type ListItem = {
  id: string;
  name: string;
  logoSource: ImageSourcePropType;
  category: string; // e.g., 'Banks', 'Ewallets', 'All'
};

type SearchableFilteredListTransferToProps = {
  /** Array of items to display */
  items: ListItem[];
  /** Callback when an item is selected */
  onItemSelect?: (item: ListItem) => void;
  /** Optional callback when back button is pressed */
  onBackPress?: () => void;
  /** Optional callback when close button is pressed */
  onClose?: () => void;
  /** Optional callback when mic button is pressed */
  onMicPress?: () => void;
  /** Tab options for filtering. Defaults to ['All', 'Banks', 'Ewallets'] */
  tabs?: string[];
  /** Placeholder text for search input */
  searchPlaceholder?: string;
  /** Callback when Next button is pressed */
  onNext?: () => void;
  /** Next button text */
  nextButtonText?: string;
  /** Selected item (for Next button state and visual feedback) */
  selectedItem?: ListItem | null;
  /** Title to display in header */
  title?: string;
};

/**
 * SearchableFilteredListTransferTo Organism
 *
 * A reusable component that combines SearchHeader, FilteredTabs, and a scrollable list.
 * Perfect for displaying searchable, filterable lists like banks, e-wallets, contacts, etc.
 * Optimized for transfer workflows.
 *
 * @example
 * ```tsx
 * const bankData = [
 *   { id: '1', name: 'Maybank', logoSource: require('./maybank.png'), category: 'Banks' },
 *   { id: '2', name: 'CIMB', logoSource: require('./cimb.png'), category: 'Banks' },
 * ];
 *
 * <SearchableFilteredListTransferTo
 *   items={bankData}
 *   onItemSelect={(item) => console.log('Selected:', item.name)}
 *   selectedItem={selectedBank}
 *   onNext={() => console.log('Next pressed')}
 * />
 * ```
 */
export const SearchableFilteredListTransferTo: React.FC<
  SearchableFilteredListTransferToProps
> = ({
  items,
  onItemSelect,
  onBackPress,
  onClose,
  onMicPress,
  tabs = ["All", "Banks", "Ewallets"],
  searchPlaceholder = "Search",
  onNext,
  nextButtonText = "Next",
  selectedItem = null,
  title = "Transfer to",
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("All");

  // Filter items based on search query and selected tab
  const filteredItems = useMemo(() => {
    let filtered = items;

    // Filter by tab (category)
    if (selectedTab !== "All") {
      filtered = filtered.filter((item) => item.category === selectedTab);
    }

    // Filter by search query
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [items, selectedTab, searchQuery]);

  const handleItemPress = (item: ListItem) => {
    onItemSelect?.(item);
  };

  return (
    <View style={styles.container}>
      {/* Drag Indicator */}
      <View style={styles.dragIndicatorContainer}>
        <View style={styles.dragIndicator} />
      </View>

      {/* Header with title and close button */}
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {onClose && (
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color={theme.colors.text} />
          </TouchableOpacity>
        )}
      </View>

      {/* Molecule 1: SearchHeader */}
      <View style={styles.searchWrapper}>
        <SearchInput />
      </View>

      {/* Molecule 2: FilteredTabs */}
      <FilteredTabs selectedTab={selectedTab} onTabSelect={setSelectedTab} />

      {/* Molecule 3: BankList (rendered in FlatList) */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleItemPress(item)}>
            <BankList name={item.name} logoSource={item.logoSource} />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  dragIndicatorContainer: {
    alignItems: "center",
    paddingVertical: theme.spacing.sm,
  },
  dragIndicator: {
    width: 40,
    height: 4,
    backgroundColor: "#d1d5db",
    borderRadius: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    position: "relative",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: theme.colors.text,
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing.md,
    padding: theme.spacing.xs,
  },
  searchWrapper: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  listContent: {
    paddingBottom: theme.spacing.lg,
  },
  buttonContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
    backgroundColor: theme.colors.background,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
});
