import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-ui-lib";
import { supabase } from "./database/supabase";
import { useEffect } from "react";

export default function App() {
  const getVladi = async () => {
    const { data } = await supabase.from("users").select(`*`);

    console.log(data);
  };
  useEffect(() => {
    getVladi();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
