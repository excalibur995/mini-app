// src/atoms/TableCell.tsx
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export type TableCellProps = {
  value: string | number;
  width?: number;
  height?: number;
  backgroundColor?: string;
  fullSize?: boolean;
};

export const TableCell: React.FC<TableCellProps> = ({
  value,
  width,
  height,
  backgroundColor = '#fff',
  fullSize = false,
}) => {
  return (
    <View
      style={[
        styles.cell,
        {
          width: width,
          minWidth: width || 100, // ✅ Ensures minimum width
          minHeight: height || 40,
          backgroundColor,
        },
        fullSize && styles.cellFullSize,
      ]}
    >
      <Text
        style={styles.cellText}
        // ✅ REMOVE numberOfLines to show full text
        // OR set numberOfLines={0} for wrapping
      >
        {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#000',
    paddingHorizontal: 12, // ✅ More padding
    paddingVertical: 10,
  },
  cellFullSize: {
    flex: 1,
    minWidth: 100,
  },
  cellText: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    flexWrap: 'wrap', // ✅ Allow text wrapping
    paddingHorizontal: 10, // ✅ Add this - gives text breathing room
    paddingVertical: 2,   // ✅ Add this
  },
});
