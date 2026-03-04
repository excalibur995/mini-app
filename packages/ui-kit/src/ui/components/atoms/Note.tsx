// Usage Example:
// import Note from './Note';
// <Note items={["First note", "Second note", "Third note"]} />
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { theme } from "../../../theme/theme";

interface NoteProps {
  items: string[];
}

export const Note: React.FC<NoteProps> = ({ items }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.noteLabel}>Note:</Text>
      {items.map((item, idx) => (
        <View key={idx} style={styles.row}>
          <Text style={styles.number}>{idx + 1}.</Text>
          <Text style={styles.text}>{item}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginHorizontal: theme.spacing.md,
  },
  noteLabel: {
    fontWeight: theme.typography.fontWeight.bold,
    fontSize: theme.typography.fontSize.medium,
    marginBottom: theme.spacing.sm,
    color: theme.colors.text,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: theme.spacing.xs,
  },
  number: {
    fontWeight: theme.typography.fontWeight.bold,
    marginRight: theme.spacing.sm,
    color: theme.colors.muted,
    fontSize: theme.typography.fontSize.small,
  },
  text: {
    flex: 1,
    color: theme.colors.text,
    fontSize: theme.typography.fontSize.small,
    lineHeight: 18,
  },
});
