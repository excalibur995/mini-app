import React, { useState } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Dropdown } from '../atoms/Dropdown';
import { Icon } from '../atoms/Icon';
import { theme } from '../../../theme/theme';

export interface SelectableDropdownProps {
  options: Array<{
    label: string;
    value: string;
    content?: React.ReactNode;
  }>;
  placeholder?: string;
  onSelect?: (item: {
    label: string;
    value: string;
    content?: React.ReactNode;
  }) => void;
  style?: ViewStyle;
  showContent?: boolean;
}

export const SelectableDropdown: React.FC<SelectableDropdownProps> = ({
  options,
  placeholder = 'Select an option',
  onSelect,
  style,
  showContent = true,
}) => {
  const [selected, setSelected] = useState<string | undefined>(undefined);

  const handleSelect = (item: string) => {
    setSelected(item);
    const selectedOption = options.find((opt) => opt.label === item);
    if (selectedOption && onSelect) {
      onSelect(selectedOption);
    }
  };

  const selectedOption = options.find((opt) => opt.label === selected);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.dropdownWrapper}>
        <Dropdown
          options={options.map((opt) => opt.label)}
          selected={selected}
          onSelect={handleSelect}
          placeholder={placeholder}
        />
        {selected && (
          <View style={styles.checkmarkContainer}>
            <Icon icon="check-circle" size={24} color={theme.colors.primary} />
          </View>
        )}
      </View>

      {showContent && selected && selectedOption?.content && (
        <View style={styles.contentContainer}>{selectedOption.content}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  dropdownWrapper: {
    position: 'relative',
    width: '100%',
  },
  checkmarkContainer: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  contentContainer: {
    marginTop: theme.spacing.md,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.gray.light,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary,
  },
});
