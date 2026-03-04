import React, { useState } from 'react';
import { View, StyleSheet, ViewStyle, Text } from 'react-native';
import { Toggle } from '../atoms/Toggle';
import { SelectableDropdown } from './SelectableDropdown';
import { theme } from '../../../theme/theme';

export interface ScheduleHeaderProps {
  title: string;
  description?: string;
  dropdownOptions?: Array<{
    label: string;
    value: string;
    content?: React.ReactNode;
  }>;
  onToggleChange?: (isEnabled: boolean) => void;
  onSelectOption?: (item: {
    label: string;
    value: string;
    content?: React.ReactNode;
  }) => void;
  style?: ViewStyle;
  toggleInitialValue?: boolean;
}

export const ScheduleHeader: React.FC<ScheduleHeaderProps> = ({
  title,
  description,
  dropdownOptions = [],
  onToggleChange,
  onSelectOption,
  style,
  toggleInitialValue = false,
}) => {
  const [isEnabled, setIsEnabled] = useState(toggleInitialValue);

  const handleToggle = (value: boolean) => {
    setIsEnabled(value);
    onToggleChange?.(value);
  };

  return (
    <View style={[styles.container, style]}>
      {/* Header with Title and Toggle */}
      <View style={styles.headerRow}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          {description && <Text style={styles.description}>{description}</Text>}
        </View>
        <Toggle value={isEnabled} onChange={handleToggle} />
      </View>

      {/* Selectable Dropdown - appears when toggle is on */}
      {isEnabled && dropdownOptions.length > 0 && (
        <View style={styles.dropdownContainer}>
          <SelectableDropdown
            options={dropdownOptions}
            placeholder="Select schedule"
            onSelect={onSelectOption}
            showContent={true}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.gray.light,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.fontSize.large,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  description: {
    fontSize: theme.typography.fontSize.small,
    color: theme.colors.gray.medium,
    fontWeight: theme.typography.fontWeight.regular,
  },
  dropdownContainer: {
    marginTop: theme.spacing.lg,
  },
});
