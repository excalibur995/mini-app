// src/molecules/TableRow.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TableCell } from '../atoms/TableCell';

type TableRowProps = {
  rowData: (string | number)[];
  rowIndex: number;
  cellWidth?: number;
  cellHeight?: number;
  getRowColor?: (index: number) => string;
  fullSize?: boolean;
};

export const TableRow: React.FC<TableRowProps> = ({
  rowData,
  rowIndex,
  cellWidth,
  cellHeight,
  getRowColor,
  fullSize = true,
}) => {
  const backgroundColor = getRowColor ? getRowColor(rowIndex) : '#fff';

  return (
    <View style={[styles.row, fullSize && styles.rowFull]}>
      {rowData.map((cellValue, colIndex) => (
        <TableCell
          key={`${rowIndex}-${colIndex}`}
          value={cellValue}
          width={cellWidth}
          height={cellHeight}
          backgroundColor={backgroundColor}
          fullSize={fullSize && !cellWidth} // ✅ Only fullSize if no width specified
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  rowFull: {
    width: '100%', // ✅ Fill parent width
  },
});
