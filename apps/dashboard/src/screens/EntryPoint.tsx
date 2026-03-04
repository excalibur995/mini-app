import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DashboardNavigatorParamList } from '../navigation/MainNavigator';
import { commonStyles } from '../styles/common';
import { dashboardStyles } from '../styles/dashboard';

type Props = NativeStackScreenProps<DashboardNavigatorParamList, 'Home'>;

const AppContent: React.FC<Props> = ({ navigation }) => {
  const handleNavigateToTransfer = () => {
    navigation.navigate('Transfer');
  };

  const miniApps = [
    {
      id: 'transfer',
      name: 'Transfer',
      description: 'Send money instantly to anyone, anywhere',
      icon: '💸',
      onPress: handleNavigateToTransfer,
    },
    {
      id: 'scanpay',
      name: 'Scan & Pay',
      description: 'Quick QR code payments',
      icon: '�',
      onPress: undefined,
    },
    {
      id: 'bills',
      name: 'Pay Bills',
      description: 'Pay utilities and other bills',
      icon: '📄',
      onPress: undefined,
    },
  ];

  return (
    <SafeAreaView style={commonStyles.screenContainer}>
      <View style={dashboardStyles.header}>
        <Text style={dashboardStyles.headerTitle}>Maybank Dashboard</Text>
        <Text style={dashboardStyles.headerSubtitle}>Select a mini app</Text>
      </View>

      <ScrollView
        style={dashboardStyles.scrollView}
        contentContainerStyle={dashboardStyles.content}
      >
        {miniApps.map(app => (
          <TouchableOpacity
            key={app.id}
            style={[
              dashboardStyles.card,
              !app.onPress && dashboardStyles.cardDisabled,
            ]}
            onPress={app.onPress}
            disabled={!app.onPress}
            activeOpacity={0.7}
          >
            <Text style={dashboardStyles.cardIcon}>{app.icon}</Text>
            <Text style={dashboardStyles.cardName}>{app.name}</Text>
            <Text style={dashboardStyles.cardDescription}>
              {app.description}
            </Text>
            {!app.onPress && (
              <Text style={dashboardStyles.comingSoon}>Coming Soon</Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppContent;
