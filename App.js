import 'react-native-gesture-handler';
import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { Provider } from 'react-redux';
import AppContainer from './src/AppContainer';
import { store } from './src/store'

export default function App() {
          return (
                    <Provider store={store}>
                              <NativeBaseProvider>
                                        <AppContainer />
                              </NativeBaseProvider>
                    </Provider>
          );
}