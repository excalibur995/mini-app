import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  safeArea: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
});

export const colors = {
  background: '#ffffff',
  primary: '#ffc83d',
  secondary: '#f9fafb',
  text: '#1a1a1a',
  textSecondary: '#6b7280',
  border: '#e5e7eb',
  card: '#f9fafb',
  muted: '#6b7280',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const radius = {
  sm: 6,
  md: 12,
  lg: 16,
  pill: 50,
};

export const shadows = {
  light: {
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
};
