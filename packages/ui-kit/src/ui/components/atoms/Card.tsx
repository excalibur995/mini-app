import React, { ReactNode } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { theme } from '../../../theme/theme';

type CardProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: 'light' | 'medium';
  padding?: keyof typeof theme.spacing;
  radius?: keyof typeof theme.radius;
  backgroundColor?: string;
};

type SectionProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  align?: 'left' | 'center' | 'right'; // header alignment
  radius?: keyof typeof theme.radius; // custom radius for section
};

export const Card: React.FC<CardProps> & {
  Header: React.FC<SectionProps>;
  Body: React.FC<SectionProps>;
  Footer: React.FC<SectionProps>;
} = ({
  children,
  style,
  variant = 'light',
  padding = 'lg',
  radius = 'md',
  backgroundColor = theme.colors.card,
}) => {
  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor,
          borderRadius: theme.radius[radius],
          ...theme.shadows[variant],
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

Card.Header = ({
  children,
  style,
  backgroundColor = theme.colors.primary,
  align = 'center',
  radius = 'md',
}) => (
  <View
    style={[
      styles.section,
      {
        backgroundColor,
        alignItems:
          align === 'left'
            ? 'flex-start'
            : align === 'right'
            ? 'flex-end'
            : 'center',
        borderTopLeftRadius: theme.radius[radius],
        borderTopRightRadius: theme.radius[radius],
      },
      style,
    ]}
  >
    {children}
  </View>
);

Card.Body = ({
  children,
  style,
  backgroundColor = theme.colors.background,
}) => (
  <View style={[styles.section, { backgroundColor }, style]}>{children}</View>
);

Card.Footer = ({
  children,
  style,
  backgroundColor = theme.colors.background,
  radius = 'md',
}) => (
  <View
    style={[
      styles.section,
      {
        backgroundColor,
        borderBottomLeftRadius: theme.radius[radius],
        borderBottomRightRadius: theme.radius[radius],
      },
      style,
    ]}
  >
    {children}
  </View>
);

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  section: {
    padding: theme.spacing.lg,
  },
});

export default Card;
