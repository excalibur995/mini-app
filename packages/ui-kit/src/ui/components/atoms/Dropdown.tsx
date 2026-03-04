import React, { useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle, // ✅ Import ViewStyle
} from "react-native";
import { theme } from "../../../theme/theme";
import { Icon } from "./Icon";

type DropdownProps = {
  options: string[];
  selected?: string;
  onSelect: (item: string) => void;
  placeholder?: string;
  style?: ViewStyle;

  /** Show checkmark icon on button when item is selected */
  showCheckmark?: boolean;
  /** Optional content to display below dropdown when item is selected */
  expandableContent?: React.ReactNode;
  /** Control visibility of expandable content (default: show when content exists and item selected) */
  showExpandableContent?: boolean;
};

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  selected,
  onSelect,
  placeholder = "Select Option",
  style,
  showCheckmark = false,
  expandableContent,
  showExpandableContent = true,
}) => {
  const [visible, setVisible] = useState(false);

  const handleSelect = (item: string) => {
    onSelect(item);
    setVisible(false);
  };

  return (
    <View style={{ width: "100%" }}>
      {/* Dropdown Button */}
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={[styles.button, style]}
          onPress={() => setVisible(true)}
        >
          <Text style={[styles.text, !selected && styles.placeholder]}>
            {selected || placeholder}
          </Text>
          <Icon icon="keyboard-arrow-down" size={24} color="#9E9E9E" />
        </TouchableOpacity>

        {/* Optional Checkmark Indicator */}
        {showCheckmark && selected && (
          <View style={styles.checkmarkContainer}>
            <Icon icon="check-circle" size={24} color={theme.colors.primary} />
          </View>
        )}
      </View>

      {/* Optional Expandable Content */}
      {showExpandableContent && selected && expandableContent && (
        <View style={styles.expandableContent}>{expandableContent}</View>
      )}

      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          {/* ✅ Adjust the dropdown list width to match the button if needed, 
              or keep it default. Here we keep it centered or standard. */}
          <View style={styles.dropdown}>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.optionText}>{item}</Text>
                  {selected === item && (
                    <Icon icon="check" size={20} color={theme.colors.primary} />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    position: "relative",
    width: "100%",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#BDBDBD",
    minHeight: 48,
  },
  checkmarkContainer: {
    position: "absolute",
    right: 40,
    top: "50%",
    transform: [{ translateY: -12 }],
    zIndex: 1,
  },
  expandableContent: {
    marginTop: theme.spacing.md,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.gray?.light || "#F5F5F5",
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary,
  },
  text: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.text,
    fontWeight: "600",
  },
  placeholder: {
    color: "#9E9E9E",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: theme.spacing.lg,
  },
  dropdown: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing.sm,
    maxHeight: 300,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  optionText: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.text,
  },
});
