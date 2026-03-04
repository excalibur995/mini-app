import React from 'react';
import { ViewStyle } from 'react-native';
import { Dropdown } from '../atoms/Dropdown';

type DropdownFieldProps = {
    /** Array of options to display */
    options: string[];
    /** Currently selected option */
    selected?: string;
    /** Callback when option is selected */
    onSelect: (item: string) => void;
    /** Placeholder text */
    placeholder?: string;
    /** Show checkmark when selected */
    showCheckmark?: boolean;
    /** Expandable content below dropdown */
    expandableContent?: React.ReactNode;
    /** Control expandable content visibility */
    showExpandableContent?: boolean;
    /** Optional custom styles */
    style?: ViewStyle;
};

/**
 * DropdownField Molecule
 * 
 * Molecule wrapper around the enhanced Dropdown atom.
 * This provides a molecule-level interface for organisms to use dropdowns
 * without directly importing atoms.
 * 
 * @example
 * ```tsx
 * <DropdownField
 *   options={['Daily', 'Weekly', 'Monthly']}
 *   selected={frequency}
 *   onSelect={setFrequency}
 *   showCheckmark={true}
 * />
 * ```
 */
export const DropdownField: React.FC<DropdownFieldProps> = ({
    options,
    selected,
    onSelect,
    placeholder,
    showCheckmark = false,
    expandableContent,
    showExpandableContent = true,
    style,
}) => {
    return (
        <Dropdown
            options={options}
            selected={selected}
            onSelect={onSelect}
            placeholder={placeholder}
            showCheckmark={showCheckmark}
            expandableContent={expandableContent}
            showExpandableContent={showExpandableContent}
            style={style}
        />
    );
};
