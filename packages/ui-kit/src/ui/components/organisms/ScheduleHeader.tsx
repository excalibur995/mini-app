import React, { useState } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { ToggleField } from '../molecules/ToggleField';
import { DropdownField } from '../molecules/DropdownField';
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
  const [selectedLabel, setSelectedLabel] = useState<string | undefined>(undefined);

  const handleToggle = (value: boolean) => {
    setIsEnabled(value);
    onToggleChange?.(value);
  };

  const handleSelect = (label: string) => {
    setSelectedLabel(label);
    const selectedOption = dropdownOptions.find((opt) => opt.label === label);
    if (selectedOption && onSelectOption) {
      onSelectOption(selectedOption);
    }
  };

  const selectedOption = dropdownOptions.find((opt) => opt.label === selectedLabel);

  return (
    <View style={[styles.container, style]}>
      {/* ToggleField Molecule */}
      <ToggleField
        label={title}
        description={description}
        value={isEnabled}
        onChange={handleToggle}
      />

      {/* DropdownField Molecule - appears when toggle is on */}
      {isEnabled && dropdownOptions.length > 0 && (
        <View style={styles.dropdownContainer}>
          <DropdownField
            options={dropdownOptions.map((opt) => opt.label)}
            selected={selectedLabel}
            onSelect={handleSelect}
            placeholder="Select schedule"
            showCheckmark={true}
            expandableContent={selectedOption?.content}
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
  dropdownContainer: {
    marginTop: theme.spacing.lg,
  },
});
