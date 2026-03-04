// src/organisms/Table.tsx
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TableRow } from '../molecules/TableRow';

type TableProps = {
  data: (string | number)[][];
  cellWidth?: number;
  cellHeight?: number;
  fullSize?: boolean;
  getRowColor?: (index: number) => string;
  horizontalScroll?: boolean;
};

export const Table: React.FC<TableProps> = ({
  data,
  cellWidth, // ✅ No default - will auto-calculate
  cellHeight = 40,
  fullSize = true, // ✅ Changed to true by default
  getRowColor,
  horizontalScroll = false, // ✅ Changed to false - only scroll if needed
}) => {
  const tableContent = (
    <View style={[styles.table, fullSize && styles.tableFull]}>
      {data.map((rowData, rowIndex) => (
        <TableRow
          key={rowIndex}
          rowData={rowData}
          rowIndex={rowIndex}
          cellWidth={cellWidth}
          cellHeight={cellHeight}
          getRowColor={getRowColor}
          fullSize={fullSize}
        />
      ))}
    </View>
  );

  if (horizontalScroll) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.scrollContent}
      >
        {tableContent}
      </ScrollView>
    );
  }

  return tableContent;
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  table: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#000',
  },
  tableFull: {
    width: '100%', // ✅ Fill parent width
  },
});
