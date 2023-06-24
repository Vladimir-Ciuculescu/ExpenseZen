import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "./screens/OnboardingScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import GraphScreen from "./screens/GraphScreen";
import { Ionicons } from "@expo/vector-icons";
import CategoriesScreen from "./screens/CategoriesScreen";
import SettingsScreen from "./screens/SettingsScreen";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation: React.FC<any> = () => {
  const [initialScreen, setInitialScreen] = useState<string | null>(null);
  const { onboarded } = useSelector((state: RootState) => state.onboard);
  const user = useSelector((state: RootState) => state.user);

  console.log(user);

  useEffect(() => {
    const checkOnboarding = async () => {
      if (!onboarded) {
        setInitialScreen("Onboarding");
      } else {
        if (user.email) {
          setInitialScreen("Tabs");
        } else {
          setInitialScreen("Login");
        }
      }
    };
    checkOnboarding();
  }, []);

  if (!initialScreen) {
    return null;
  }

  const Tabs = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen
          component={HomeScreen}
          name="Home"
          options={{
            title: "Home",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={24}
                color="black"
              />
            ),
          }}
        />
        <Tab.Screen
          component={GraphScreen}
          name="Graph"
          options={{
            title: "Graph",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "md-pie-chart" : "md-pie-chart-outline"}
                size={24}
                color="black"
              />
            ),
          }}
        />
        <Tab.Screen
          component={CategoriesScreen}
          name="Categories"
          options={{
            title: "Categories",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "ios-grid" : "ios-grid-outline"}
                size={24}
                color="black"
              />
            ),
          }}
        />
        <Tab.Screen
          component={SettingsScreen}
          name="Settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "settings" : "settings-outline"}
                size={24}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };

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
        <Stack.Screen component={RegisterScreen} name="Register" />
        <Stack.Screen
          component={Tabs}
          name="Tabs"
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
