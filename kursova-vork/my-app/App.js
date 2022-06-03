import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AuthProvider } from './mobile/screens/AuthProvider';

import Navigator from './components/Navigator';


export default function App() {
  
  return (
  
  <AuthProvider>
      <Navigator />
  </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
});


