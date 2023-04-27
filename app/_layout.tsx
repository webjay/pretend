import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { Slot } from 'expo-router';

function Layout() {
  return (
    <PaperProvider>
      <StatusBar />
      <Slot />
    </PaperProvider>
  );
}

export default Layout;
