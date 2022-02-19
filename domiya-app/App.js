import * as React from 'react';
import { persistor, store } from './store';
import { Provider } from 'react-redux'
import Navigation from './src/navigation/PublicNavigation'
import { PersistGate } from 'redux-persist/integration/react';

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