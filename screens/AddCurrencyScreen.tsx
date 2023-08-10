import { Text, View, VStack } from "native-base";
import { SafeAreaView, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import EZButton from "../components/shared/EZButton";
import COLORS from "../colors";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { CurrencyService } from "../api/services/CurrencyService";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { setCurrency } from "../redux/userReducer";
import RNPickerSelect from "react-native-picker-select";

interface AddCurrencyScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

const AddCurrencyScreen: React.FC<AddCurrencyScreenProps> = ({ navigation }) => {
  const [currencies, setCurrencies] = useState<any[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<any>();
  const [loading, setLoading] = useState<boolean>();
  const { id } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    getCurrencies();
  }, [navigation]);

  const getCurrencies = async () => {
    const data = await CurrencyService.getAllCurrencies();

    let currenciesArray = [];

    for (const item in data) {
      currenciesArray.push({
        label: `${data[item].symbol_native} ${data[item].code}`,
        value: `${data[item].symbol_native} ${data[item].code}`,
      });
    }

    setCurrencies(currenciesArray);
  };

  const saveCurrency = async () => {
    setLoading(true);

    const currencyText = selectedCurrency.split(" ");

    const currencySymbol = currencyText[0];
    const currencyCode = currencyText[1];

    await CurrencyService.updateUserCurrency(id, currencySymbol, currencyCode);

    const payload = {
      name: currencyCode,
      symbol: currencySymbol,
    };

    dispatch(setCurrency(payload));

    setLoading(false);

    goToTabs();
  };

  const goToTabs = () => {
    navigation.navigate("Tabs");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View flex={1} justifyContent="center" alignItems="center">
        <VStack width="100%" space={"30px"} alignItems="center">
          <Text fontFamily="SourceBold" fontSize={25}>
            Select your currency
          </Text>
          <RNPickerSelect
            placeholder={{}}
            style={pickerSelectStyles}
            onValueChange={(value) => setSelectedCurrency(value)}
            items={currencies}
          />
        </VStack>

        <EZButton
          variant="solid"
          position="absolute"
          bottom={10}
          width="80%"
          bg="purple.700"
          borderRadius={8}
          height="44px"
          _text={{ fontFamily: "SourceSansPro", fontSize: 17 }}
          onPress={saveCurrency}
          isLoading={loading}
          _pressed={{ backgroundColor: COLORS.PURPLE[700], opacity: 0.7 }}>
          SAVE
        </EZButton>
      </View>
    </SafeAreaView>
  );
};

export default AddCurrencyScreen;

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    color: COLORS.PURPLE[700],
    width: "80%",
    alignSelf: "center",
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: COLORS.MUTED[200],
    backgroundColor: COLORS.MUTED[200],
    borderRadius: 12,
  },
  inputAndroid: {
    color: COLORS.PURPLE[700],
    width: "80%",
    alignSelf: "center",
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: COLORS.MUTED[200],
    backgroundColor: COLORS.MUTED[200],
    borderRadius: 12,
  },
});
