/**
 * AppContent Component
 *
 * Main content component with tab navigation for QR Scanner and QR Generator
 * @format
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  useSafeAreaInsets,
  type EdgeInsets,
} from 'react-native-safe-area-context';
import { createStaticNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import QRScannerScreen from './QRScannerScreen';
import QRGeneratorScreen from './QRGeneratorScreen';

const Tab = createMaterialTopTabNavigator({
  screenOptions: {
    tabBarLabelStyle: {
      fontSize: 16,
      fontWeight: '600',
      fontFamily: 'Poppins',
      lineHeight: 19.2,
      textAlign: 'center',
      textTransform: 'none',
    },
    tabBarStyle: {
      backgroundColor: '#fff',
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 1,
      borderBottomColor: '#E5E5E5',
    },
    tabBarIndicatorStyle: {
      backgroundColor: '#000',
      height: 2,
    },
    tabBarActiveTintColor: '#000',
    tabBarInactiveTintColor: '#6E7375',
  },
  screens: {
    Scanner: {
      screen: QRScannerScreen,
      options: {
        tabBarLabel: 'Scan QR',
      },
    },
    Generator: {
      screen: QRGeneratorScreen,
      options: {
        tabBarLabel: 'Generate QR',
      },
    },
  },
});

const Navigation = createStaticNavigation(Tab);

const AppContent: React.FC = () => {
  const safeAreaInsets: EdgeInsets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: safeAreaInsets.top }]}>
      <Navigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default AppContent;
