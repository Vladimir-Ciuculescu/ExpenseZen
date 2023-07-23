import React, { Fragment, useEffect, useRef, useState } from "react";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
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
import COLORS from "./colors";
import { Animated, useWindowDimensions } from "react-native";
import AddExpenseScreen from "./screens/AddExpenseScreen";
import { TAB_BAR_HEIGHT } from "./constants/NavigationConstants";
import AddCurrencyScreen from "./screens/AddCurrencyScreen";
import EditBudgetScreen from "./screens/EditBudgetsScreen";
import CategoryExpensesScreen from "./screens/CategoryExpensesScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation: React.FC<any> = () => {
  let { width } = useWindowDimensions();
  const [initialScreen, setInitialScreen] = useState<string | null>(null);
  const { onboarded } = useSelector((state: RootState) => state.onboard);
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const checkOnboarding = async () => {
      if (!onboarded) {
        setInitialScreen("Onboarding");
      } else {
        if (user.email && user.currency) {
          setInitialScreen("Tabs");
        } else if (user.email && !user.currency) {
          setInitialScreen("Currency");
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
    const tabOffsetValue = useRef(new Animated.Value(0)).current;
    const isFocused = useIsFocused();
    const tabWidth = width / 4;

    const animateTabOffset = (index: number) => {
      Animated.spring(tabOffsetValue, {
        toValue: tabWidth * index,
        speed: 20,
        useNativeDriver: true,
      }).start();
    };

    const resetOffset = () => {
      Animated.spring(tabOffsetValue, {
        toValue: 0,
        speed: 0,
        useNativeDriver: true,
      });
    };

    if (isFocused) {
      resetOffset();
    }

    return (
      <Fragment>
        <Tab.Navigator
          screenOptions={{
            unmountOnBlur: true,
            tabBarActiveTintColor: COLORS.PURPLE[700],
            tabBarInactiveTintColor: COLORS.MUTED[500],

            tabBarLabelStyle: {
              fontFamily: "SourceBold",
            },
            tabBarStyle: {
              height: TAB_BAR_HEIGHT,
            },
          }}
        >
          <Tab.Screen
            component={HomeScreen}
            name="Home"
            options={{
              title: "Home",
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  name={focused ? "home" : "home-outline"}
                  size={24}
                  color={focused ? COLORS.PURPLE[700] : COLORS.MUTED[500]}
                />
              ),
            }}
            listeners={() => ({
              tabPress: () => animateTabOffset(0),
            })}
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
                  color={focused ? COLORS.PURPLE[700] : COLORS.MUTED[500]}
                />
              ),
            }}
            listeners={() => ({
              tabPress: () => animateTabOffset(1),
            })}
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
                  color={focused ? COLORS.PURPLE[700] : COLORS.MUTED[500]}
                />
              ),
            }}
            listeners={() => ({
              tabPress: () => animateTabOffset(2),
            })}
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
                  color={focused ? COLORS.PURPLE[700] : COLORS.MUTED[500]}
                />
              ),
            }}
            listeners={() => ({
              tabPress: () => animateTabOffset(3),
            })}
          />
        </Tab.Navigator>
        <Animated.View
          style={{
            width: tabWidth,
            height: 2,
            backgroundColor: COLORS.PURPLE[700],
            position: "absolute",
            borderRadius: 50,
            bottom: 78,
            transform: [{ translateX: tabOffsetValue }],
          }}
        />
      </Fragment>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialScreen!}>
        <Stack.Group>
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
          <Stack.Screen
            component={AddCurrencyScreen}
            name="Currency"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            component={CategoryExpensesScreen}
            name="CategoryExpenses"
            options={({ route }) => ({
              //title: route.params.title,
              headerTintColor: "#fff",
              headerStyle: {
                //backgroundColor: route.params.color,
              },
              //headerShadowVisible: false, // applied here
              headerBackTitleVisible: false,
            })}
          />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: "containedModal" }}>
          <Stack.Screen
            component={AddExpenseScreen}
            name="AddExpense"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            component={EditBudgetScreen}
            name="EditBudgets"
            options={{ headerShown: false }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
