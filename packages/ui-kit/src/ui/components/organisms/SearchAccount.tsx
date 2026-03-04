import { View, StyleSheet, Text } from "react-native";
import { SearchInput, ChipList } from "../molecules";
import { ExtendedChipProps } from "../molecules/ChipList";
import { theme } from "../../../theme/theme";

const chipData: ExtendedChipProps[] = [
  { title: "All", variant: "selectable" },
  {
    title: "Frequent",
    variant: "selectable",
    description:
      "Recipients you send money to regularly in the last 90 days will appear here.",
  },
  { title: "Favourites", variant: "selectable" },
  { title: "Own", variant: "selectable" },
];

const SearchAccount = () => {
  return (
    <View style={styles.container}>
      <SearchInput />
      <ChipList data={chipData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.xs,
    gap: 12,
  },
});

export { SearchAccount };
