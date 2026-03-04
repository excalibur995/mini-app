import { StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import { Chip, Label } from "../atoms";
import { theme } from "../../../theme/theme";

export type ExtendedChipProps = {
  title: string;
  variant?: "selectable" | "display";
  description?: string;
};

interface ChipListProps {
  data?: ExtendedChipProps[];
}

const ChipList: React.FC<ChipListProps> = ({ data }) => {
  const [selectedTitle, setSelectedTitle] = useState<string | null>("Frequent");

  const handlePress = (title: string) => {
    setSelectedTitle(title); // select clicked chip
  };

  return (
    <>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {data?.map((item) => (
          <Chip
            key={item.title}
            {...item}
            onPress={() => handlePress(item.title)}
            isSelected={selectedTitle === item.title}
            style={{ marginRight: 8 }}
          />
        ))}
        <Chip
          key="extra-chip"
          title="+"
          variant="selectable"
          isSelected={selectedTitle === "+"}
          onPress={() => handlePress("+")}
          style={{ marginRight: 8 }}
        />
      </ScrollView>

      {/* Description below the row */}
      {data?.map(
        (item) =>
          selectedTitle === item.title &&
          item.description && (
            <Label
              key={item.title + "-desc"}
              style={{
                backgroundColor: "#f5f5f5",
                paddingVertical: 12,
                paddingHorizontal: theme.spacing.lg,
                textAlign: "center",
                marginTop: theme.spacing.xs,
                borderRadius: 8,
                lineHeight: 20,
              }}
              size="small"
              color="muted"
            >
              {item.description}
            </Label>
          )
      )}
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    paddingHorizontal: 0,
    gap: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
});

export { ChipList };
