import { StyleSheet, FlatList, SafeAreaView, Animated } from "react-native";
import { PieChart, Progress, Savings } from "./assets/SVG";
import { View, NativeBaseProvider } from "native-base";
import OnboardingStep from "./components/OnboardingStep";
import { Step } from "./interfaces/Step";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import SourceSansPro from "./assets/fonts/SourceSansProRegular.ttf";
import SourceBold from "./assets/fonts/SourceSansProBold.ttf";
import Onboarding from "./components/Onboarding";

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
      <StatusBar style="auto" />
      <View style={styles.container}>
        <SafeAreaView>
          <Onboarding />
        </SafeAreaView>
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
