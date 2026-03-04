import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Input } from "../atoms";
import { theme } from "../../../theme/theme";

const SearchInput = () => {
  return (
    <View style={styles.container}>
      <Icon icon="search" size={20} color={theme.colors.muted} />

      <View style={styles.inputWrapper}>
        <Input
          value=""
          onChangeText={(text) => console.log(text)}
          placeholder="Search"
          borderWidth={0}
          size="md"
          style={styles.inputContainer}
        />
      </View>

      <Icon icon="mic" size={20} color={theme.colors.muted} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.pill,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    marginTop: theme.spacing.md - 4,
    marginBottom: 0,
    gap: theme.spacing.sm,
  },
  inputWrapper: {
    flex: 1,
  },
  inputContainer: {
    backgroundColor: "transparent",
    paddingHorizontal: 0,
    paddingVertical: 0,
    minHeight: 0,
  },
});

export { SearchInput };
