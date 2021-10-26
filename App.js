import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import AppContainer from './src/AppContainer';
import { store } from './src/store'

export default function App() {
          return (
                    <Provider store={store}>
                              <AppContainer />
                    </Provider>
          );
}