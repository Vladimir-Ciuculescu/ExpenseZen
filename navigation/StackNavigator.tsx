import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import AddCurrencyScreen from "../screens/AddCurrencyScreen";
import AddExpenseScreen from "../screens/AddExpenseScreen";
import CategoryExpensesScreen from "../screens/CategoryExpensesScreen";
import EditBudgetScreen from "../screens/EditBudgetsScreen";
import LoginScreen from "../screens/LoginScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import RegisterScreen from "../screens/RegisterScreen";
import TabNavigator from "./TabNavigator";

type AppStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  Tabs: undefined;
  Currency: undefined;
  CategoryExpenses: undefined;
  AddExpense: undefined;
  EditBudgets: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const StackNavigator: React.FC<any> = () => {
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

  return (
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
          component={TabNavigator}
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
            headerTintColor: "#fff",
            headerStyle: {},

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
  );
};

export default StackNavigator;
