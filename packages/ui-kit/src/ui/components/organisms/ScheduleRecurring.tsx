import React, { useState } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { ScheduleHeader } from './ScheduleHeader';
import { DropdownField } from '../molecules/DropdownField';
import { CalendarField } from '../molecules/CalendarField';
import { theme } from '../../../theme/theme';

export interface ScheduleRecurringProps {
  title?: string;
  description?: string;
  recurringOptions?: Array<{
    label: string;
    value: string;
    content?: React.ReactNode;
  }>;
  onToggleChange?: (isEnabled: boolean) => void;
  onSelectRecurrence?: (item: {
    label: string;
    value: string;
    content?: React.ReactNode;
  }) => void;
  onDateSelect?: (day: {
    dateString: string;
    day: number;
    month: number;
    year: number;
    timestamp: number;
  }) => void;
  style?: ViewStyle;
  toggleInitialValue?: boolean;
}

export const ScheduleRecurring: React.FC<ScheduleRecurringProps> = ({
  title = 'Recurring Schedule',
  description = 'Enable recurring transfers',
  recurringOptions = [
    { label: 'Daily', value: 'daily', content: <View /> },
    { label: 'Weekly', value: 'weekly', content: <View /> },
    { label: 'Monthly', value: 'monthly', content: <View /> },
    { label: 'Yearly', value: 'yearly', content: <View /> },
    { label: 'One-time', value: 'one-time', content: <View /> },
  ],
  onToggleChange,
  onSelectRecurrence,
  onDateSelect,
  style,
  toggleInitialValue = false,
}) => {
  const [isEnabled, setIsEnabled] = useState(toggleInitialValue);
  const [selectedRecurrence, setSelectedRecurrence] = useState<
    string | undefined
  >(undefined);

  const handleToggle = (value: boolean) => {
    setIsEnabled(value);
    onToggleChange?.(value);
  };

  const handleRecurrenceSelect = (label: string) => {
    setSelectedRecurrence(label);
    const selectedOption = recurringOptions.find((opt) => opt.label === label);
    if (selectedOption && onSelectRecurrence) {
      onSelectRecurrence(selectedOption);
    }
  };

  return (
    <View style={[styles.container, style]}>
      {/* Header with Title and Toggle */}
      <View style={styles.headerSection}>
        <ScheduleHeader
          title={title}
          description={description}
          dropdownOptions={[]}
          onToggleChange={handleToggle}
          toggleInitialValue={toggleInitialValue}
        />
      </View>

      {/* Molecule: DropdownField - Recurrence Type */}
      {isEnabled && (
        <View style={styles.dropdownSection}>
          <DropdownField
            options={recurringOptions.map((opt) => opt.label)}
            selected={selectedRecurrence}
            onSelect={handleRecurrenceSelect}
            placeholder="Select recurrence"
          />
        </View>
      )}

      {/* Molecule: CalendarField - Date Picker */}
      {isEnabled && (
        <View style={styles.dropdownSection}>
          <CalendarField onDayPress={(day) => onDateSelect?.(day)} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: theme.spacing.md,
  },
  headerSection: {
    width: '100%',
  },
  dropdownSection: {
    width: '100%',
    paddingHorizontal: theme.spacing.lg,
  },
});
