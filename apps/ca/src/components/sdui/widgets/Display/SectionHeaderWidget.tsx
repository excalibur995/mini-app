import { StyleSheet, Text, View } from 'react-native';
import { Label } from 'ui-kit';

export const SectionHeaderWidget = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <View style={styles.container}>
      <Label size="large" weight="bold">
        {title}
      </Label>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#6B7280',
  },
});
