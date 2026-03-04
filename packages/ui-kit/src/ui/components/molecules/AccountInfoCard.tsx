import React from 'react';
import { View, StyleSheet, ImageSourcePropType, ViewStyle, Image } from 'react-native';
import { Logo } from '../atoms/Logo';
import { Label } from '../atoms/Label';
import { Card } from '../atoms/Card';
import { theme } from '../../../theme/theme';

type AccountInfoCardProps = {
    /** Primary text (name, bank name, etc.) */
    title: string;
    /** Secondary text (account number, role, etc.) */
    subtitle?: string;
    /** Image source for avatar or logo */
    imageSource?: ImageSourcePropType;
    /** Type of image to display */
    imageType?: 'avatar' | 'logo';
    /** Image size */
    imageSize?: number;
    /** Optional custom styles */
    style?: ViewStyle;
};

/**
 * AccountInfoCard Molecule
 * 
 * A flexible card component that displays an avatar or logo with text information.
 * Perfect for showing transfer participants, account details, user profiles, etc.
 * 
 * @example
 * ```tsx
 * // Recipient with avatar (To)
 * <AccountInfoCard
 *   title="John Doe"
 *   subtitle="Recipient"
 *   imageSource={require('./john.png')}
 *   imageType="avatar"
 * />
 * 
 * // Bank account with logo (From)
 * <AccountInfoCard
 *   title="Maybank"
 *   subtitle="Account •••• 1234"
 *   imageSource={require('./maybank.png')}
 *   imageType="logo"
 * />
 * ```
 */
export const AccountInfoCard: React.FC<AccountInfoCardProps> = ({
    title,
    subtitle,
    imageSource,
    imageType = 'avatar',
    imageSize = 48,
    style,
}) => {
    return (
        <Card variant="light" radius="md" style={style}>
            <Card.Body style={styles.body}>
                <View style={styles.container}>
                    {/* Image: Avatar or Logo */}
                    {imageSource && (
                        <View style={styles.imageWrapper}>
                            {imageType === 'avatar' ? (
                                <Image
                                    source={imageSource}
                                    style={[
                                        styles.avatar,
                                        { width: imageSize, height: imageSize, borderRadius: imageSize / 2 },
                                    ]}
                                    resizeMode="cover"
                                />
                            ) : (
                                <Logo
                                    source={imageSource}
                                    width={imageSize}
                                    height={imageSize}
                                    resizeMode="contain"
                                />
                            )}
                        </View>
                    )}

                    {/* Text Content */}
                    <View style={styles.textContainer}>
                        <Label size="large" weight="bold" style={styles.title}>
                            {title}
                        </Label>
                        {subtitle && (
                            <Label size="small" weight="regular" color="muted" style={styles.subtitle}>
                                {subtitle}
                            </Label>
                        )}
                    </View>
                </View>
            </Card.Body>
        </Card>
    );
};

const styles = StyleSheet.create({
    body: {
        padding: theme.spacing.md,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageWrapper: {
        marginRight: theme.spacing.md,
    },
    avatar: {
        backgroundColor: '#E0E0E0', // Fallback background
    },
    textContainer: {
        flex: 1,
    },
    title: {
        marginBottom: 4,
    },
    subtitle: {
        marginTop: 2,
    },
});
