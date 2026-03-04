import { StyleSheet } from 'react-native';
import { colors, spacing, radius, shadows } from './common';

export const dashboardStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.muted,
    fontWeight: '400',
  },
  scrollView: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  content: {
    padding: spacing.md,
  },
  card: {
    padding: spacing.lg,
    borderRadius: radius.md,
    marginBottom: spacing.md,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.light,
    minHeight: 140,
    justifyContent: 'center',
  },
  cardIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  cardName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  cardDescription: {
    fontSize: 14,
    color: colors.muted,
    lineHeight: 20,
  },
  comingSoon: {
    marginTop: spacing.sm,
    fontSize: 12,
    color: colors.muted,
    fontStyle: 'italic',
  },
  cardDisabled: {
    opacity: 0.6,
  },
});
