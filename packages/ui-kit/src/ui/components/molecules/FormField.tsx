import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Label } from '../atoms/Label';
import { theme } from '../../../theme/theme';

type FormFieldProps = {
    /** The label text to display above the input */
    label?: string;
    /** The input component (Input, Dropdown, etc.) */
    children: ReactNode;
    /** Optional custom styles for the container */
    style?: ViewStyle;
    /** Label size */
    labelSize?: 'small' | 'medium' | 'large' | 'xlarge';
    /** Label weight */
    labelWeight?: 'regular' | 'medium' | 'bold';
    /** Label color */
    labelColor?: 'text' | 'muted' | 'primary';
};

/**
 * FormField Molecule
 * 
 * A reusable wrapper that combines a Label atom with any input atom (Input, Dropdown, etc.)
 * Provides consistent spacing and styling across forms.
 * 
 * @example
 * ```tsx
 * <FormField label="Email Address">
 *   <Input value={email} onChangeText={setEmail} placeholder="Enter email" />
 * </FormField>
 * 
 * <FormField label="Select Bank" labelWeight="bold">
 *   <Dropdown options={banks} selected={bank} onSelect={setBank} />
 * </FormField>
 * ```
 */
export const FormField: React.FC<FormFieldProps> = ({
    label,
    children,
    style,
    labelSize = 'medium',
    labelWeight = 'bold',
    labelColor = 'text',
}) => {
    return (
        <View style={[styles.container, style]}>
            {label && (
                <View style={styles.labelWrapper}>
                    <Label size={labelSize} weight={labelWeight} color={labelColor}>
                        {label}
                    </Label>
                </View>
            )}
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: theme.spacing.md,
    },
    labelWrapper: {
        marginBottom: theme.spacing.sm,
    },
});
