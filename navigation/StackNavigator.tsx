import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppStackParamList, StackConfig } from "../interfaces/Navigation";
import { RootState } from "../redux/store";
import AddCurrencyScreen from "../screens/AddCurrencyScreen";
import AddExpenseScreen from "../screens/AddExpenseScreen";
import CategoryExpensesScreen from "../screens/CategoryExpensesScreen";
import EditBudgetScreen from "../screens/EditBudgetsScreen";
import LoginScreen from "../screens/LoginScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import RegisterScreen from "../screens/RegisterScreen";
import TabNavigator from "./TabNavigator";

const Stack = createNativeStackNavigator<AppStackParamList>();

const StackNavigator: React.FC<any> = () => {
  const [initialScreen, setInitialScreen] = useState<keyof AppStackParamList | undefined>(
    undefined
  );
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

  const routes: StackConfig[] = [
    { name: "Onboarding", component: OnboardingScreen, options: { headerShown: false } },
    { name: "Login", component: LoginScreen, options: { headerShown: false } },
    { name: "Register", component: RegisterScreen, options: { headerShown: false } },
    { name: "Tabs", component: TabNavigator, options: { headerShown: false } },
    { name: "Currency", component: AddCurrencyScreen, options: { headerShown: false } },
    {
      name: "CategoryExpenses",
      component: CategoryExpensesScreen,
      options: { headerTintColor: "#fff", headerBackTitleVisible: false },
    },
    {
      name: "AddExpense",
      component: AddExpenseScreen,
      options: { presentation: "containedModal", headerShown: false },
    },
    {
      name: "EditBudgets",
      component: EditBudgetScreen,
      options: { presentation: "containedModal", headerShown: false },
    },
  ];

  return (
    <Stack.Navigator initialRouteName={initialScreen!}>
      {routes.map((route: StackConfig, key) => (
        <Stack.Screen key={key} {...route} />
      ))}
    </Stack.Navigator>
  );
};

export default StackNavigator;
