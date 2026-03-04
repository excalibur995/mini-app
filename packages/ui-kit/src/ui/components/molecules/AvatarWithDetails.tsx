import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Avatar } from '../atoms/Avatar';
import { Label } from '../atoms/Label';
import { theme } from '../../../theme/theme';

type AvatarWithDetailsProps = {
    /** Avatar image source - URI object format */
    avatarSource?: { uri: string };
    /** Name or main text */
    name: string;
    /** Subtitle or details */
    details?: string;
    /** Avatar size */
    size?: number;
    /** Optional custom styles */
    style?: ViewStyle;
};

/**
 * AvatarWithDetails Molecule
 * 
 * Combines Avatar and Label atoms to display user/account information.
 * Commonly used for showing account details in cards and lists.
 * 
 * @example
 * ```tsx
 * <AvatarWithDetails
 *   avatarSource={{ uri: 'https://example.com/avatar.png' }}
 *   name="John Doe"
 *   details="john@example.com"
 *   size={48}
 * />
 * ```
 */
export const AvatarWithDetails: React.FC<AvatarWithDetailsProps> = ({
    avatarSource,
    name,
    details,
    size = 48,
    style,
}) => {
    return (
        <View style={[styles.container, style]}>
            <Avatar source={avatarSource} size={size} />
            <View style={styles.textContainer}>
                <Label size="large" weight="bold">
                    {name}
                </Label>
                {details && (
                    <Label size="small" color="muted" style={styles.details}>
                        {details}
                    </Label>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
        marginLeft: theme.spacing.md,
    },
    details: {
        marginTop: 4,
    },
});
