import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { removeCurrency, removeUser, setCurrency, setThemeAction } from "../redux/userReducer";
import React, { useLayoutEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  HStack,
  VStack,
  Circle,
  useColorMode,
  useTheme,
} from "native-base";
import { TouchableOpacity, Alert, Switch } from "react-native";
import EZHeaderTitle from "../components/shared/EzHeaderTitle";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import { CurrencyService } from "../api/services/CurrencyService";
import { RootState } from "../redux/store";
import COLORS from "../colors";
import { ExpenseService } from "../api/services/ExpenseService";
import { setBudgetsAction, setExpensesAction } from "../redux/expensesReducers";
import { Ionicons, FontAwesome, AntDesign } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../interfaces/Navigation";
import { UserService } from "../api/services/UserService";
import { StatusBar } from "expo-status-bar";

const SettingsScreen: React.FC<any> = () => {
  const dispatch = useDispatch();
  const user: any = useSelector((state: RootState) => state.user);
  const {
    colors: { muted },
  } = useTheme();

  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const [currencies, setCurrencies] = useState<any[]>([]);
  const [notificationsAllowed, toggleNotificationsAllowed] = useState<boolean>(false);
  const [theme, toggleTheme] = useState<boolean>(user.theme === "light" ? false : true);

  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
  const { toggleColorMode } = useColorMode();

  let pickerRef = useRef<any>(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <EZHeaderTitle>Settings</EZHeaderTitle>,
    });
  }, [navigation]);

  const displayLogoutAlert = () => {
    Alert.alert("Log out", "Are you sure you want to log out ?", [
      {
        text: "No",

        style: "cancel",
      },
      { text: "Yes", onPress: () => logout(), style: "destructive" },
    ]);
  };

  const logout: any = () => {
    dispatch(removeUser());
    dispatch(removeCurrency());
    navigation.navigate("Login");
  };

  const getCurrencies = async () => {
    if (!currencies.length) {
      const data = await CurrencyService.getAllCurrencies();

      let currenciesArray = [];

      for (const item in data) {
        currenciesArray.push({
          label: `${data[item].symbol_native} ${data[item].code}`,
          value: `${data[item].symbol_native} ${data[item].code}`,
        });
      }

      setCurrencies(currenciesArray);
    }
  };

  const switchTheme = () => {
    toggleColorMode();
    dispatch(setThemeAction(user.theme === "light" ? "dark" : "light"));
    toggleTheme(!theme);
  };

  const changeCurrency = async () => {
    const baseCurrency = selectedCurrency!.split(" ");
    const currentCurrency = user.currency;
    const currencyToChange = baseCurrency[1];

    const data = await CurrencyService.getCurrencyConversionRate(currentCurrency, currencyToChange);

    const conversionRate = data[currencyToChange];

    await CurrencyService.updateUserCurrency(user.id, baseCurrency[0], baseCurrency[1]);
    await ExpenseService.convertExpensesCurrency(user.id, conversionRate);
    await UserService.convertUserBudgetsCurrency(user.id, conversionRate);

    const expenses = await ExpenseService.getMonthExpenses(user.id);
    const budgets = await UserService.getUserBudgets(user.id);

    dispatch(setCurrency({ name: baseCurrency[1], symbol: baseCurrency[0] }));
    dispatch(setExpensesAction(expenses));
    dispatch(setBudgetsAction(budgets));

    Alert.alert("Currency updated", "All your expenses were updated with the new currency", [
      { text: "OK" },
    ]);
  };

  const displayEraseDataAlert = () => {
    Alert.alert(
      "Erase data",
      "This will delete all your expenses and budgets, are you sure you want to continue ?",
      [
        {
          text: "No",

          style: "cancel",
        },
        { text: "Yes", onPress: async () => await eraseData(), style: "destructive" },
      ]
    );
  };

  const removeExpenses = async () => {
    await ExpenseService.removeUserExpenses(user.id);
  };

  const removeBudgets = async () => {
    await UserService.removeUserBudgets(user.id);
  };

  const eraseData = async () => {
    await Promise.all([removeExpenses(), removeBudgets()]);

    dispatch(setExpensesAction([]));
    dispatch(setBudgetsAction([]));

    Alert.alert("Completed", "Your data has been erased !", [{ text: "Ok" }]);
  };

  const SECTIONS = [
    {
      header: "Preferences",
      icon: "settings",
      items: [
        {
          icon: <MaterialCommunityIcons name="currency-eur" size={18} color={COLORS.MUTED[50]} />,
          color: "#fe9400",
          label: "Currency ",
          onPress: () => pickerRef.current.togglePicker(true),
          rightElement: (
            <RNPickerSelect
              ref={pickerRef}
              style={{
                inputAndroid: {
                  backgroundColor: "transparent",
                },
                inputIOSContainer: {
                  height: "100%",
                  alignItems: "center",
                },
                inputIOS: {
                  height: "100%",
                  color: COLORS.PURPLE[700],
                  textAlign: "center",
                  alignSelf: "center",
                  fontSize: 17,
                  fontFamily: "SourceBold",
                },
                placeholder: {
                  color: COLORS.PURPLE[700],
                  textAlign: "center",
                  alignSelf: "center",
                  fontSize: 17,
                  fontFamily: "SourceBold",
                },
              }}
              onOpen={getCurrencies}
              placeholder={{ label: `${user.symbol} ${user.currency}`, value: null }}
              onValueChange={(value) => setSelectedCurrency(value)}
              items={currencies}
              value={selectedCurrency || `${user.symbol} ${user.currency}`}
              onClose={changeCurrency}
            />
          ),
          disabled: true,
        },
        {
          icon: (
            <Ionicons
              name={notificationsAllowed ? "notifications" : "notifications-off"}
              size={18}
              color={COLORS.MUTED[50]}
            />
          ),
          color: "primary.500",
          label: "Notifications",
          onPress: () => toggleNotificationsAllowed(!notificationsAllowed),
          rightElement: (
            <Switch
              value={notificationsAllowed}
              onValueChange={() => toggleNotificationsAllowed(!notificationsAllowed)}
            />
          ),
          disabled: true,
        },
        {
          icon: <Ionicons name={theme ? "moon" : "sunny"} size={18} color={COLORS.MUTED[50]} />,
          color: "violet.800",
          label: user.theme === "light" ? "Light theme" : "Dark theme",

          rightElement: <Switch value={theme} onValueChange={() => switchTheme()} />,
          disabled: true,
        },
        {
          icon: <MaterialCommunityIcons name="eraser" size={18} color={COLORS.MUTED[50]} />,
          color: "rose.600",
          label: "Erase data",
          onPress: () => displayEraseDataAlert(),
          disabled: false,
        },
      ],
    },

    {
      header: "Help",
      icon: "align-center",
      items: [
        {
          icon: <FontAwesome name="lock" size={18} color={COLORS.MUTED[50]} />,
          color: "orange.800",
          label: "Change password",
          rightElement: <FontAwesome name="angle-right" size={26} color={muted[900]} />,
          onPress: () => navigation.navigate("ChangePassword"),
          disabled: false,
        },
        {
          icon: <Ionicons name="newspaper-sharp" size={18} color={COLORS.MUTED[50]} />,
          color: "green.500",
          label: "About",
          rightElement: <FontAwesome name="angle-right" size={26} color={muted[900]} />,
          onPress: () => navigation.navigate("About"),
          disabled: false,
        },
        {
          icon: <AntDesign name="logout" size={18} color={COLORS.MUTED[50]} />,
          color: "yellow.500",
          label: "Logout",
          onPress: () => displayLogoutAlert(),
          rightElement: <FontAwesome name="angle-right" size={26} color={muted[900]} />,
          disabled: false,
        },
      ],
    },
  ];

  return (
    <View flex={1}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={{ paddingVertical: 24 }}>
        {SECTIONS.map(({ header, items }, key) => (
          <View paddingX={"24px"} key={key}>
            <Text
              paddingY={"12px"}
              fontSize={14}
              color="muted.500"
              textTransform="uppercase"
              letterSpacing={1.1}
              fontFamily="SourceBold">
              {header}
            </Text>
            <VStack space={"12px"}>
              {items.map(({ label, icon, color, rightElement, onPress, disabled }, index) => {
                return (
                  <TouchableOpacity key={index} onPress={onPress} disabled={disabled}>
                    <HStack
                      alignItems="center"
                      justifyContent="space-between"
                      height={50}
                      bg={user.theme === "dark" ? "muted.50" : "muted.200"}
                      borderRadius={8}
                      paddingX={"12px"}>
                      <HStack space="12px" alignItems="center">
                        <Circle bg={color} size="32px">
                          {icon}
                        </Circle>
                        <Text fontSize={17} color="muted.900">
                          {label}
                        </Text>
                      </HStack>
                      {rightElement}
                    </HStack>
                  </TouchableOpacity>
                );
              })}
            </VStack>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
export default SettingsScreen;
