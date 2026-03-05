import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CaNavigatorParamList } from 'src/navigation/MainNavigator';
import { Card, Label, theme } from 'ui-kit';

type Props = NativeStackScreenProps<CaNavigatorParamList, 'Home'>;
const EntryPoint: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Pressable onPress={() => navigation.navigate('CasaEntryPoint')}>
          <Label size="large" weight="bold">
            Apply
          </Label>
          <Text style={styles.subtitles}>Apply for a new account</Text>
        </Pressable>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subtitles: {
    fontSize: theme.spacing?.md || 16,
    color: theme.colors?.gray?.dark || '#666',
    marginTop: theme.spacing?.xs || 8,
  },
  card: {
    backgroundColor: theme.colors?.background || '#fff',
    marginHorizontal: theme.spacing?.md || 16,
    marginVertical: theme.spacing?.md || 16,
    padding: theme.spacing?.md || 16,
  },
});

export default EntryPoint;
