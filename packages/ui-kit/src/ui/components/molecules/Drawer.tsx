// libs/ui/src/components/molecules/Drawer.tsx
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { Button } from '../atoms/Button';
import { Icon } from '../atoms/Icon';
import { Label } from '../atoms/Label';
import { theme } from '../../../theme/theme';

type DrawerProps = {
  title: string;
  style?: ViewStyle;
  onClose?: () => void;
  children?: React.ReactNode;
};

export const Drawer: React.FC<DrawerProps> = ({
  title,
  style,
  onClose,
  children,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <Label weight="bold" size="large">
          {title}
        </Label>

        {onClose && (
          <Button
            title=""
            onPress={onClose}
            iconLeft="close"
            backgroundColor="transparent"
            textColor={theme.colors.text}
            style={{ padding: 4 }}
          />
        )}
      </View>

      <View style={[styles.content, { flex: 1 }]}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: theme.colors.background,
    borderRadius: 8,
    shadowColor: theme.colors.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  content: {},
});
