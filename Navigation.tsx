import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import { getItem } from "./storage";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

const Stack = createNativeStackNavigator();

const Navigation: React.FC<any> = () => {
  const [initialScreen, setInitialScreen] = useState<string | null>(null);

  useEffect(() => {
    const checkOnboarding = async () => {
      const onboarded = await getItem("onboarded");
      if (!onboarded) {
        setInitialScreen("Onboarding");
      } else {
        setInitialScreen("Login");
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
        <Stack.Screen
          component={LoginScreen}
          name="Login"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={RegisterScreen}
          name="Register"
          //options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
