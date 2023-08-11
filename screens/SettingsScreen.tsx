import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { removeCurrency, removeUser, setCurrency } from "../redux/userReducer";
import React, { useLayoutEffect, useRef, useState } from "react";
import { View, Text, ScrollView, HStack, VStack, Circle } from "native-base";
import { TouchableOpacity, Alert, Switch } from "react-native";
import EZHeaderTitle from "../components/shared/EzHeaderTitle";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import { CurrencyService } from "../api/services/CurrencyService";
import { RootState } from "../redux/store";
import COLORS from "../colors";
import { ExpenseService } from "../api/services/ExpenseService";
import {
  removeExpensesAction,
  setBudgetsAction,
  setExpensesAction,
} from "../redux/expensesReducers";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../interfaces/Navigation";
import { UserService } from "../api/services/UserService";

const SettingsScreen: React.FC<any> = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const [currencies, setCurrencies] = useState<any[]>([]);
  const [notificationsAllowed, toggleNotificationsAllowed] = useState<boolean>(false);
  const [darkTheme, toggleDarkTheme] = useState<boolean>(false);
  const user: any = useSelector((state: RootState) => state.user);

  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);

  let pickerRef = useRef<any>(null);

  const logout: any = () => {
    dispatch(removeUser());
    dispatch(removeCurrency());
    dispatch(removeExpensesAction());
    navigation.navigate("Login");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <EZHeaderTitle>Settings</EZHeaderTitle>,
    });
  }, [navigation]);

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
        },
        {
          icon: <Ionicons name={darkTheme ? "moon" : "sunny"} size={18} color={COLORS.MUTED[50]} />,
          color: "violet.800",
          label: "Light theme",
          onPress: () => toggleDarkTheme(!darkTheme),
          rightElement: (
            <Switch value={darkTheme} onValueChange={() => toggleDarkTheme(!darkTheme)} />
          ),
        },
        {
          icon: <MaterialCommunityIcons name="eraser" size={18} color={COLORS.MUTED[50]} />,
          color: "rose.600",
          label: "Erase data",
          onPress: () => toggleDarkTheme(!darkTheme),
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
          rightElement: <FontAwesome name="angle-right" size={26} color="black" />,
        },
        {
          icon: <Ionicons name="newspaper-sharp" size={18} color={COLORS.MUTED[50]} />,
          color: "green.500",
          label: "About",
          rightElement: <FontAwesome name="angle-right" size={26} color="black" />,
        },
        {
          icon: <AntDesign name="logout" size={18} color={COLORS.MUTED[50]} />,
          color: "yellow.500",
          label: "Logout",
          onPress: () => logout(),
          rightElement: <FontAwesome name="angle-right" size={26} color="black" />,
        },
      ],
    },
  ];

  return (
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
            {items.map(({ label, icon, color, rightElement, onPress }, index) => {
              return (
                <TouchableOpacity key={index} onPress={onPress}>
                  <HStack
                    alignItems="center"
                    justifyContent="space-between"
                    height={50}
                    bg="muted.200"
                    borderRadius={8}
                    paddingX={"12px"}>
                    {/* <View style={[styles.rowIcon, { backgroundColor: color }]}>{icon}</View> */}
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
  );
};
export default SettingsScreen;
