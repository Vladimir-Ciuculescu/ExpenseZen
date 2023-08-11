import { NativeBaseProvider } from "native-base";
import { useFonts } from "expo-font";
import { LogBox } from "react-native";
import SourceSansPro from "./assets/fonts/SourceSansProRegular.ttf";
import SourceBold from "./assets/fonts/SourceSansProBold.ttf";
import Navigation from "./navigation/Navigation";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";

LogBox.ignoreLogs([
  "Using Math.random is not cryptographically secure! Use bcrypt.setRandomFallback to set a PRNG.",
  "VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.",
]);

export default function App() {
  const [fontsLoaded] = useFonts({
    SourceSansPro,
    SourceBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    </NativeBaseProvider>
  );
}
