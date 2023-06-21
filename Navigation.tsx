import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import { getItem } from "./storage";

const Stack = createNativeStackNavigator();

const Navigation: React.FC<any> = () => {
  const [initialScreen, setInitialScreen] = useState<string | null>(null);

  useEffect(() => {
    const checkOnboarding = async () => {
      const onboarded = await getItem("onboarded");
      if (!onboarded) {
        setInitialScreen("Onboarding");
      } else {
        setInitialScreen("Home");
      }
    };
    checkOnboarding();
  }, []);

  if (!initialScreen) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialScreen!}>
        <Stack.Screen
          component={OnboardingScreen}
          name="Onboarding"
          options={{ headerShown: false }}
        />
        <Stack.Screen component={HomeScreen} name="Home" />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
