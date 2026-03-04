import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Toggle } from '../atoms/Toggle';
import { Label } from '../atoms/Label';
import { theme } from '../../../theme/theme';

type ToggleFieldProps = {
    /** Label text */
    label: string;
    /** Current toggle state */
    value: boolean;
    /** Callback when toggle changes */
    onChange: (value: boolean) => void;
    /** Optional description text */
    description?: string;
    /** Optional custom styles */
    style?: ViewStyle;
};

/**
 * ToggleField Molecule
 * 
 * Combines Label atom with Toggle atom for a complete toggle field.
 * Used in forms and settings where toggle needs a label.
 * 
 * @example
 * ```tsx
 * <ToggleField
 *   label="Enable notifications"
 *   description="Receive updates about your transfers"
 *   value={enabled}
 *   onChange={setEnabled}
 * />
 * ```
 */
export const ToggleField: React.FC<ToggleFieldProps> = ({
    label,
    value,
    onChange,
    description,
    style,
}) => {
    return (
        <View style={[styles.container, style]}>
            <View style={styles.textContainer}>
                <Label size="large" weight="bold">
                    {label}
                </Label>
                {description && (
                    <Label size="small" color="muted" style={styles.description}>
                        {description}
                    </Label>
                )}
            </View>
            <Toggle value={value} onChange={onChange} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: theme.spacing.md,
    },
    textContainer: {
        flex: 1,
        marginRight: theme.spacing.md,
    },
    description: {
        marginTop: theme.spacing.xs,
    },
});
