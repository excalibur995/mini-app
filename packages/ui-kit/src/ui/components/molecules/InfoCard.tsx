import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Label } from '../atoms/Label';
import { Card } from '../atoms/Card';
import { theme } from '../../../theme/theme';

type InfoCardProps = {
    /** Primary text (title, message, information) */
    text: string;
    /** Text size */
    textSize?: 'small' | 'medium' | 'large' | 'xlarge';
    /** Text weight */
    textWeight?: 'regular' | 'medium' | 'bold';
    /** Text color */
    textColor?: 'text' | 'muted' | 'primary' | 'secondary';
    /** Optional custom styles */
    style?: ViewStyle;
};

/**
 * InfoCard Molecule
 * 
 * A simple card with text label - perfect for displaying information, messages, or notes.
 * Highly reusable for any text-in-card scenario.
 * 
 * @example
 * ```tsx
 * // Simple info
 * <InfoCard text="Transaction completed successfully" />
 * 
 * // Custom styling
 * <InfoCard
 *   text="Important Notice"
 *   textSize="large"
 *   textWeight="bold"
 * />
 * 
 * // Message display
 * <InfoCard
 *   text="Your transfer is being processed"
 *   textSize="medium"
 *   textColor="muted"
 * />
 * ```
 */
export const InfoCard: React.FC<InfoCardProps> = ({
    text,
    textSize = 'medium',
    textWeight = 'regular',
    textColor = 'text',
    style,
}) => {
    return (
        <Card variant="light" radius="md" style={style}>
            <Card.Body style={styles.body}>
                <Label size={textSize} weight={textWeight} color={textColor}>
                    {text}
                </Label>
            </Card.Body>
        </Card>
    );
};

const styles = StyleSheet.create({
    body: {
        padding: theme.spacing.md,
    },
});
