// libs/ui/src/components/molecules/RadioButton.tsx
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Label } from '../atoms/Label';
import { theme } from '../../../theme/theme';

export type RadioOption = {
  label: string;
  value: string | number;
};

type RadioButtonProps = {
  options: RadioOption[];
  selectedValue?: string | number;
  onChange?: (value: string | number) => void;
  direction?: 'row' | 'column';
  labelSize?: 'small' | 'medium' | 'large'; // <-- allow all sizes
};

export const RadioButton: React.FC<RadioButtonProps> = ({
  options,
  selectedValue,
  onChange,
  direction = 'column',
  labelSize = 'medium',
}) => {
  const [internalValue, setInternalValue] = useState(selectedValue);

  const handleSelect = (value: string | number) => {
    setInternalValue(value);
    onChange?.(value);
  };

  return (
    <View style={[styles.container, { flexDirection: direction }]}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={styles.optionContainer}
          activeOpacity={0.7}
          onPress={() => handleSelect(option.value)}
        >
          {/* Circle */}
          <View
            style={[
              styles.circle,
              {
                borderColor:
                  internalValue === option.value
                    ? theme.colors.primary
                    : theme.colors.muted,
              },
            ]}
          >
            {internalValue === option.value && (
              <View style={styles.innerCircle} />
            )}
          </View>

          {/* Label */}
          <Label size={labelSize}>{option.label}</Label>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    marginRight: 16,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.primary,
  },
});
