import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    ImageSourcePropType,
    ViewStyle,
    Image,
    TouchableOpacity,
    GestureResponderEvent,
} from 'react-native';
import { Logo } from '../atoms/Logo';
import { Label } from '../atoms/Label';
import { Icon } from '../atoms/Icon';
import { Card } from '../atoms/Card';
import { theme } from '../../../theme/theme';

type InteractiveCardProps = {
    /** Optional header content */
    header?: React.ReactNode;

    /** Primary text (amount, name, title) */
    title: string;
    /** Secondary text (name, subtitle) */
    subtitle?: string;
    /** Additional details (bank account, etc.) */
    details?: string;

    /** Optional image source */
    image?: ImageSourcePropType;
    /** Type of image to display */
    imageType?: 'avatar' | 'logo';
    /** Image size */
    imageSize?: number;

    /** Enable favorite toggle */
    favorite?: boolean;
    /** Callback when favorite is toggled */
    onFavoriteToggle?: (isFavorite: boolean) => void;

    /** Optional action button element */
    actionButton?: React.ReactNode;
    /** Callback when card is pressed (makes entire card clickable) */
    onCardPress?: () => void;

    /** Card variant */
    variant?: 'light' | 'medium';
    /** Card border radius */
    radius?: 'sm' | 'md' | 'lg';
    /** Optional custom styles */
    style?: ViewStyle;
};

/**
 * InteractiveCard Molecule
 * 
 * A flexible card component with optional interactivity (favorite toggle, actions, selection).
 * Supports simple UI state and user interactions.
 * Consolidates functionality from AmountWithHeaderCard and SelectableAccountCard.
 * 
 * @example
 * ```tsx
 * // Amount display with favorite (replaces AmountWithHeaderCard)
 * <InteractiveCard
 *   header={<Label>Logo&Name</Label>}
 *   title="MYR 1,234.56"
 *   subtitle="John Doe"
 *   details="Maybank • 1234"
 *   favorite
 *   onFavoriteToggle={(isFav) => console.log(isFav)}
 * />
 * 
 * // Selectable account (replaces SelectableAccountCard)
 * <InteractiveCard
 *   title="Maybank"
 *   subtitle="Account •••• 1234"
 *   image={require('./maybank.png')}
 *   imageType="logo"
 *   actionButton={<Button title="Select" onPress={handleSelect} />}
 * />
 * 
 * // With clickable card
 * <InteractiveCard
 *   title="Transfer to John"
 *   subtitle="Account 1234"
 *   onCardPress={handleCardPress}
 * />
 * 
 * // Full featured
 * <InteractiveCard
 *   header={<Label>Transfer Details</Label>}
 *   title="MYR 5,000.00"
 *   subtitle="John Doe"
 *   details="Maybank • 1234 5678"
 *   image={avatarImage}
 *   imageType="avatar"
 *   favorite
 *   onFavoriteToggle={handleFavorite}
 *   actionButton={<Button title="Send" onPress={handleSend} />}
 * />
 * ```
 */
export const InteractiveCard: React.FC<InteractiveCardProps> = ({
    header,
    title,
    subtitle,
    details,
    image,
    imageType = 'avatar',
    imageSize = 48,
    favorite: initialFavorite = false,
    onFavoriteToggle,
    actionButton,
    onCardPress,
    variant = 'light',
    radius = 'md',
    style,
}) => {
    const [isFavorite, setIsFavorite] = useState<boolean>(initialFavorite);

    const handleFavoritePress = (event: GestureResponderEvent) => {
        event.stopPropagation(); // Prevent card click if card is also clickable
        const newFavoriteState = !isFavorite;
        setIsFavorite(newFavoriteState);
        onFavoriteToggle?.(newFavoriteState);
    };

    const cardContent = (
        <>
            {/* Optional Header */}
            {header && <Card.Header align="center">{header}</Card.Header>}

            {/* Card Body */}
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
                            {details && (
                                <Label size="small" weight="regular" color="muted" style={styles.details}>
                                    {details}
                                </Label>
                            )}
                        </View>

                        {/* Action Button */}
                        {actionButton && <View style={styles.actionButtonWrapper}>{actionButton}</View>}
                    </View>
                ) : (
                    /* Layout without image */
                    <>
                        <View style={subtitle && onFavoriteToggle ? styles.rowWithFavorite : undefined}>
                            <View style={styles.textContainer}>
                                <Label size="xlarge" weight="bold" style={styles.titleLarge}>
                                    {title}
                                </Label>
                                {subtitle && (
                                    <View style={styles.subtitleRow}>
                                        <Label size="medium" weight="regular" style={styles.subtitleText}>
                                            {subtitle}
                                        </Label>
                                    </View>
                                )}
                            </View>

                            {/* Favorite Toggle */}
                            {onFavoriteToggle && (
                                <TouchableOpacity
                                    style={styles.favoriteIcon}
                                    onPress={handleFavoritePress}
                                    activeOpacity={0.7}
                                >
                                    <Icon
                                        icon={isFavorite ? 'favorite' : 'favorite-outline'}
                                        color={isFavorite ? 'red' : theme.colors.text}
                                        size={24}
                                    />
                                </TouchableOpacity>
                            )}
                        </View>

                        {details && (
                            <Label size="medium" weight="regular" color="muted" style={styles.detailsText}>
                                {details}
                            </Label>
                        )}

                        {/* Action Button */}
                        {actionButton && <View style={styles.actionButtonWrapperSimple}>{actionButton}</View>}
                    </>
                )}
            </Card.Body>
        </>
    );

    // If onCardPress is provided, wrap in TouchableOpacity
    return onCardPress ? (
        <TouchableOpacity onPress={onCardPress} activeOpacity={0.8} style={style}>
            <Card variant={variant} radius={radius}>
                {cardContent}
            </Card>
        </TouchableOpacity>
    ) : (
        <Card variant={variant} radius={radius} style={style}>
            {cardContent}
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
        backgroundColor: '#E0E0E0',
    },
    textContainer: {
        flex: 1,
    },
    title: {
        marginBottom: 4,
    },
    titleLarge: {
        marginBottom: 4,
    },
    subtitle: {
        marginTop: 2,
    },
    subtitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    subtitleText: {
        flex: 1,
    },
    details: {
        marginTop: 4,
    },
    detailsText: {
        marginTop: 4,
    },
    rowWithFavorite: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    favoriteIcon: {
        marginLeft: 'auto',
        padding: 4,
    },
    actionButtonWrapper: {
        marginLeft: theme.spacing.sm,
    },
    actionButtonWrapperSimple: {
        marginTop: theme.spacing.md,
    },
});
