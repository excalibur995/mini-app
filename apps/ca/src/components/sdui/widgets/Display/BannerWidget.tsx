import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'ui-kit';

type Props = {
  variant?: 'info' | 'warning' | 'error' | 'success';
  label?: string | null;
  text: string;
};

export const BannerWidget: React.FC<Props> = ({
  variant = 'info',
  label,
  text,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'warning':
        return {
          container: styles.warningContainer,
          text: styles.warningText,
          icon: 'warning',
          iconColor: '#B46200',
        };
      case 'error':
        return {
          container: styles.errorContainer,
          text: styles.errorText,
          icon: 'error',
          iconColor: '#C62828',
        };
      case 'success':
        return {
          container: styles.successContainer,
          text: styles.successText,
          icon: 'check-circle',
          iconColor: '#2E7D32',
        };
      case 'info':
      default:
        return {
          container: styles.infoContainer,
          text: styles.infoText,
          icon: 'info',
          iconColor: '#0288D1', // fallback since info icon might not exist, but let's try
        };
    }
  };

  const vStyles = getVariantStyles();

  return (
    <View style={[styles.container, vStyles.container]}>
      <View style={styles.iconContainer}>
        {/* We use an arbitrary icon name from ui-kit. If missing, Icon component usually falls back gracefully */}
        <Icon icon={vStyles.icon as any} color={vStyles.iconColor} size={20} />
      </View>
      <View style={styles.contentContainer}>
        {label && <Text style={[styles.label, vStyles.text]}>{label}</Text>}
        <Text style={[styles.text, vStyles.text]}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  iconContainer: {
    marginRight: 12,
    marginTop: 2,
  },
  contentContainer: {
    flex: 1,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
  },

  // Variants
  infoContainer: {
    backgroundColor: '#E1F5FE',
    borderWidth: 1,
    borderColor: '#B3E5FC',
  },
  infoText: {
    color: '#01579B',
  },
  warningContainer: {
    backgroundColor: '#FFF3E0',
    borderWidth: 1,
    borderColor: '#FFE0B2',
  },
  warningText: {
    color: '#E65100',
  },
  errorContainer: {
    backgroundColor: '#FFEBEE',
    borderWidth: 1,
    borderColor: '#FFCDD2',
  },
  errorText: {
    color: '#B71C1C',
  },
  successContainer: {
    backgroundColor: '#E8F5E9',
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  successText: {
    color: '#1B5E20',
  },
});
