import * as React from 'react';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { LogBox } from 'react-native';

import { persistor, store } from './store';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Index from './src';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
    dark:'#000',
    // Fonts
    fontLight: '#fff',
    // Background
    bgLight: '#fff',
    bgDark: '#16222b',
    danger: '#F00'
  },
};

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

export default function Main() {
  return (
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor} >
        <PaperProvider theme={theme}>
          <Index />      
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}