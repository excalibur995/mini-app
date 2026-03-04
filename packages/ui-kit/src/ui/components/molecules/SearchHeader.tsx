import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon } from "../atoms/Icon";
import { Input } from "../atoms/Input";
import { theme } from "../../../theme/theme";

type SearchHeaderProps = {
  value: string;
  onChangeText: (text: string) => void;
  onBackPress?: () => void;
  onMicPress?: () => void;
};

export const SearchHeader: React.FC<SearchHeaderProps> = ({
  value,
  onChangeText,
  onBackPress,
  onMicPress,
}) => {
  return (
    <View style={styles.container}>
      {/* Atom: Back Icon - Only show if onBackPress is provided */}
      {onBackPress && (
        <TouchableOpacity style={styles.iconWrapper} onPress={onBackPress}>
          <Icon icon="arrow-back" size={30} color={theme.colors.gray.medium} />
        </TouchableOpacity>
      )}

      {/* Atom: Input */}
      <View style={styles.inputWrapper}>
        <Input
          value={value}
          onChangeText={onChangeText}
          placeholder="Search"
          style={styles.input}
        />
        {/* Atom: Search Icon (Absolute positioned or inside) */}
        <View style={styles.searchIcon}>
          <Icon icon="search" size={24} color={theme.colors.gray.medium} />
        </View>
      </View>

      {/* Atom: Mic Icon */}
      {onMicPress && (
        <TouchableOpacity style={styles.iconWrapper} onPress={onMicPress}>
          <Icon icon="mic" size={30} color={theme.colors.gray.medium} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.lg - 4,
  },
  iconWrapper: {
    padding: theme.spacing.xs + 1,
  },
  inputWrapper: {
    flex: 1, // Take up remaining space
    position: "relative",
    justifyContent: "center",
  },
  input: {
    width: "100%",
    backgroundColor: theme.colors.background,
    paddingLeft: 40, // Make room for search icon
    borderWidth: 0,
  },
  searchIcon: {
    position: "absolute",
    left: 10,
    zIndex: 1,
  },
});
