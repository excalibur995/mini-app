import React from 'react';
import { StyleSheet, View } from 'react-native';
import MainNavigator from './navigation/MainNavigator';

const App = () => {
  return (
    <View style={styles.container}>
      <MainNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default App;
