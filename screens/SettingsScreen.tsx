import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { removeCurrency, removeUser, setCurrency } from "../redux/userReducer";
import React, { Fragment, useLayoutEffect, useRef, useState } from "react";
import { View, Text, ScrollView, HStack, VStack, Circle, Button } from "native-base";
import { TouchableOpacity, Switch, StyleSheet } from "react-native";
import EZHeaderTitle from "../components/shared/EzHeaderTitle";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import { CurrencyService } from "../api/services/CurrencyService";
import { RootState } from "../redux/store";
import COLORS from "../colors";
import { FREECURRENCY_API_KEY } from "@env";
import axios from "axios";

const SettingsScreen: React.FC<any> = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [currencies, setCurrencies] = useState<any[]>([]);
  const user: any = useSelector((state: RootState) => state.user);

  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);

  let pickerRef = useRef<any>(null);

  const logout = () => {
    dispatch(removeUser());
    dispatch(removeCurrency());
    //@ts-ignore
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

  const getConversionRate = async () => {
    const baseCurrency = selectedCurrency!.split(" ");
    const currentCurrency = user.currency;
    const currencyToChange = baseCurrency[1];
    const { data } = await axios.get("https://api.freecurrencyapi.com/v1/latest", {
      params: {
        apikey: FREECURRENCY_API_KEY,
        currencies: currencyToChange,
        base_currency: currentCurrency,
      },
    });

    const conversionRate = data.data[currencyToChange];

    await CurrencyService.updateUserCurrency(user.id, baseCurrency[0], baseCurrency[1]);

    dispatch(setCurrency({ name: baseCurrency[1], symbol: baseCurrency[0] }));
  };

  const SECTIONS = [
    {
      header: "Preferences",
      icon: "settings",
      items: [
        {
          icon: <MaterialCommunityIcons name="currency-eur" size={18} color="white" />,
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
              onClose={getConversionRate}
            />
          ),
        },
      ],
    },

    {
      header: "Content",
      icon: "align-center",
      items: [
        { icon: "save", color: "#32c759", label: "Saved", type: "boolean" },
        { icon: "download", color: "#fd2d54", label: "Downloads", type: "boolean" },
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
            {items.map(({ label, icon, type, value, color, rightElement, onPress }, index) => {
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
                      <Circle style={{ backgroundColor: color }} size="32px">
                        {icon}
                      </Circle>
                      <Text fontSize={17} color="muted.900">
                        {label}
                      </Text>
                    </HStack>
                    {rightElement}
                    {/* {type === "boolean" && <Switch value={value} />}
                    {type === "link" && <Feather name="chevron-right" size={24} color="black" />} */}
                    {/* <RNPickerSelect
                      placeholder={{
                        value: 0,
                        label: "USD",
                      }}
                      value={0}
                      onValueChange={(value) => console.log(value)}
                      items={[
                        { label: "Football", value: "football" },
                        { label: "Baseball", value: "baseball" },
                        { label: "Hockey", value: "hockey" },
                      ]}
                    /> */}
                  </HStack>
                </TouchableOpacity>
              );
            })}
          </VStack>
        </View>
      ))}

      <Button onPress={logout}>Log out</Button>
    </ScrollView>
  );
};
export default SettingsScreen;
