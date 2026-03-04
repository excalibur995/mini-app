import { View, StyleSheet, ScrollView, Modal, TouchableWithoutFeedback, Dimensions } from 'react-native';
import React from 'react';
import { ModalHeader } from '../molecules';
import { Table } from './Table';
import { theme } from '../../../theme/theme';

const { height: SCREEN_HEIGHT } = Dimensions.get('window'); // ✅ Get screen height

const demoTableData: (string | number)[][] = [
  ["Name", "Age"],
  ["Alice", 25],
  ["Bob", 30],
  ["Charlie", 28],
];

const getRowColor = (rowIndex: number) => {
  if (rowIndex === 0) return theme.colors.primary;
  return '#fff';
};

export type ModalTableProps = {
  visible?: boolean;
  onClose?: () => void;
  tableData?: (string | number)[][];
  title?: string;
  subheading?: string;
  getRowColor?: (rowIndex: number) => string;
  onRightPress?: () => void;
};

const ModalTable: React.FC<ModalTableProps> = ({
  visible = false,
  onClose,
  tableData = demoTableData,
  title = 'Table',
  subheading,
  getRowColor: customGetRowColor,
  onRightPress,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback>
            <View style={styles.container}>
              <ModalHeader
                title={title}
                subheading={subheading || 'View the data below'}
                onRightPress={onRightPress || onClose}
              />

              {/* ✅ FIX: Give explicit height instead of flex: 1 */}
              <View style={styles.tableContainer}>
                <Table
                  data={tableData}
                  getRowColor={customGetRowColor || getRowColor}
                  cellHeight={50}
                  fullSize={true}
                  horizontalScroll={false}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.md,
  },
  container: {
    width: '100%',
    maxWidth: 500,
    height: SCREEN_HEIGHT * 0.6, // ✅ Fixed height instead of maxHeight
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    borderRadius: 25,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  tableContainer: {
    flex: 1, // ✅ Now this works properly
    marginTop: theme.spacing.md,
    overflow: 'hidden', // ✅ Important
  },
});

export { ModalTable };
