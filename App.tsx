import { NativeBaseProvider } from "native-base";
import { useFonts } from "expo-font";
import { LogBox } from "react-native";
import SourceSansPro from "./assets/fonts/SourceSansProRegular.ttf";
import SourceBold from "./assets/fonts/SourceSansProBold.ttf";
import Navigation from "./navigation/Navigation";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { HASH_WARNING, VIRTUALIZED_WARNING } from "@env";

LogBox.ignoreLogs([HASH_WARNING, VIRTUALIZED_WARNING]);

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
