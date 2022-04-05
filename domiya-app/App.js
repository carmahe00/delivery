import * as React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { LogBox } from "react-native";

import { persistor, store } from "./store";
import {
  DefaultTheme,
  Provider as PaperProvider,
  useTheme,
} from "react-native-paper";
import Index from "./src";
import StatusBarCustom from "./src/components/StatusBarCustom";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3498db",
    accent: "#f1c40f",
    darkness: "#2f0250",
    // Fonts
    fontLight: "#fff",
    fontYellow: "#ffbb00",
    fontSea: "#00d7ff",
    fontPurple: "#8002db",
    // Background
    bgLight: "#fff",
    bgDark: "#5b039b",
    danger: "#F00",
  },
};

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

export default function Main() {
  const { colors } = useTheme();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={theme}>
          <StatusBarCustom
            backgroundColor={colors.bgDark}
            barStyle="light-content"
          />
          <Index />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}
