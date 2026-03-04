import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import TransferNavigator from './navigation/TransferNavigator';
import { AppProvider } from './contexts/AppContext';
import { styles } from 'ui-kit';
import countryConfig from '../../../country-config.json';

const App: React.FC = () => {
  const market = countryConfig.country as 'MY' | 'ID';

  return (
    <SafeAreaView style={styles.container}>
      <AppProvider market={market}>
        <TransferNavigator />
      </AppProvider>
    </SafeAreaView>
  );
};

export default App;
