import React, { FC } from 'react';
import { SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native';

type Props = {
  label: string;
  icon: string;
};

const Placeholder: FC<Props> = () => {
  // const {colors} = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" color="#ffc83d" />
    </SafeAreaView>
  );
};

export default Placeholder;
