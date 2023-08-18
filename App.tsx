import { useFonts } from "expo-font";
import { LogBox } from "react-native";
import SourceSansPro from "./assets/fonts/SourceSansProRegular.ttf";
import SourceBold from "./assets/fonts/SourceSansProBold.ttf";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import AppContainer from "./components/AppContainer";

LogBox.ignoreLogs([
  "Using Math.random is not cryptographically secure! Use bcrypt.setRandomFallback to set a PRNG.",
  "VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.",
  "In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.",
  "@supabase/gotrue-js: Stack guards not supported in this environment. Generally not an issue but may point to a very conservative transpilation environment (use ES2017 or above) that implements async/await with generators, or this is a JavaScript engine that does not support async/await stack traces. Safari is known to not support stack guards.",
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
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppContainer />
      </PersistGate>
    </Provider>
  );
}
