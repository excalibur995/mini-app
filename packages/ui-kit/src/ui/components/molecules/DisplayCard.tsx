import React from 'react';
import { View, StyleSheet, ImageSourcePropType, ViewStyle, Image } from 'react-native';
import { Logo } from '../atoms/Logo';
import { Label } from '../atoms/Label';
import { Card } from '../atoms/Card';
import { theme } from '../../../theme/theme';

type DisplayCardProps = {
    /** Primary text (title, message, name) */
    title: string;
    /** Secondary text (subtitle, role, account info) */
    subtitle?: string;
    /** Additional descriptive text */
    description?: string;

    /** Optional image source for avatar or logo */
    image?: ImageSourcePropType;
    /** Type of image to display */
    imageType?: 'avatar' | 'logo';
    /** Image size */
    imageSize?: number;

    /** Card variant */
    variant?: 'light' | 'medium';
    /** Card border radius */
    radius?: 'sm' | 'md' | 'lg';
    /** Optional custom styles */
    style?: ViewStyle;
};

/**
 * DisplayCard Molecule
 * 
 * A flexible card component for displaying information (text and optional images).
 * Pure display component with no interactive elements or state.
 * Consolidates functionality from InfoCard and AccountInfoCard.
 * 
 * @example
 * ```tsx
 * // Simple text display (replaces InfoCard)
 * <DisplayCard 
 *   title="Transaction completed successfully"
 * />
 * 
 * // With subtitle
 * <DisplayCard
 *   title="Important Notice"
 *   subtitle="Please review the following"
 * />
 * 
 * // With avatar (replaces AccountInfoCard)
 * <DisplayCard
 *   title="John Doe"
 *   subtitle="Recipient"
 *   image={require('./john.png')}
 *   imageType="avatar"
 * />
 * 
 * // With logo (replaces AccountInfoCard)
 * <DisplayCard
 *   title="Maybank"
 *   subtitle="Account •••• 1234"
 *   image={require('./maybank.png')}
 *   imageType="logo"
 * />
 * 
 * // With all fields
 * <DisplayCard
 *   title="Transfer Details"
 *   subtitle="Completed"
 *   description="Your transfer has been processed successfully"
 *   variant="medium"
 * />
 * ```
 */
export const DisplayCard: React.FC<DisplayCardProps> = ({
    title,
    subtitle,
    description,
    image,
    imageType = 'avatar',
    imageSize = 48,
    variant = 'light',
    radius = 'md',
    style,
}) => {
    return (
        <Card variant={variant} radius={radius} style={style}>
            <Card.Body style={styles.body}>
                {image ? (
                    /* Layout with image */
                    <View style={styles.containerWithImage}>
                        {/* Image: Avatar or Logo */}
                        <View style={styles.imageWrapper}>
                            {imageType === 'avatar' ? (
                                <Image
                                    source={image}
                                    style={[
                                        styles.avatar,
                                        { width: imageSize, height: imageSize, borderRadius: imageSize / 2 },
                                    ]}
                                    resizeMode="cover"
                                />
                            ) : (
                                <Logo
                                    source={image}
                                    width={imageSize}
                                    height={imageSize}
                                    resizeMode="contain"
                                />
                            )}
                        </View>

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
                            {description && (
                                <Label size="small" weight="regular" color="muted" style={styles.description}>
                                    {description}
                                </Label>
                            )}
                        </View>
                    </View>
                ) : (
                    /* Layout without image (simple text display) */
                    <View>
                        <Label size="large" weight="bold">
                            {title}
                        </Label>
                        {subtitle && (
                            <Label size="medium" weight="regular" color="muted" style={styles.subtitleSimple}>
                                {subtitle}
                            </Label>
                        )}
                        {description && (
                            <Label size="medium" weight="regular" color="muted" style={styles.descriptionSimple}>
                                {description}
                            </Label>
                        )}
                    </View>
                )}
            </Card.Body>
        </Card>
    );
};

const styles = StyleSheet.create({
    body: {
        padding: theme.spacing.md,
    },
    containerWithImage: {
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
    description: {
        marginTop: 4,
    },
    subtitleSimple: {
        marginTop: 4,
    },
    descriptionSimple: {
        marginTop: 8,
    },
});
