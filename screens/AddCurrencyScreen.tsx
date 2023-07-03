import { Text, View } from "native-base";
import { SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import EZButton from "../components/shared/EZButton";
import COLORS from "../colors";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { CurrencyService } from "../api/services/CurrencyService";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface AddCurrencyScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

const AddCurrencyScreen: React.FC<AddCurrencyScreenProps> = ({
  navigation,
}) => {
  const [currencies, setCurrencies] = useState<any[]>([]);
  const [currency, setCurrnecy] = useState<any>();
  const [loading, setLoading] = useState<boolean>();
  const { id } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const getAllCurrencies = async () => {
      const data = await CurrencyService.getAllCurrencies();
      setCurrencies(data!);
      setCurrnecy(
        data![0].name === data![0].symbol
          ? data![0].name
          : `${data![0].symbol} ${data![0].name}`
      );
    };

    getAllCurrencies();
  }, [navigation]);

  const saveCurrency = async () => {
    setLoading(true);
    const currentCurrency = currencies.find((item) =>
      currency.includes(item.name)
    );

    await CurrencyService.addUserCurrency(id, currentCurrency.id);
    setLoading(false);

    goToTabs();
  };

  const goToTabs = () => {
    navigation.navigate("Tabs");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View flex={1} justifyContent="center" alignItems="center">
        <Text fontFamily="SourceBold" fontSize={25}>
          Select your currency
        </Text>
        <Picker
          style={{ width: "100%" }}
          mode="dialog"
          selectedValue={currency}
          onValueChange={(itemValue, itemIndex) => setCurrnecy(itemValue)}
        >
          {currencies.map((currency, key) => {
            let value;
            if (currency.symbol === currency.name) {
              value = currency.name;
            } else {
              value = `${currency.symbol} ${currency.name}`;
            }

            return <Picker.Item key={key} label={value} value={value} />;
          })}
        </Picker>
        <EZButton
          position="absolute"
          bottom={10}
          width="80%"
          bg="purple.700"
          borderRadius={8}
          height="55px"
          _text={{ fontFamily: "SourceSansPro", fontSize: 17 }}
          onPress={saveCurrency}
          isLoading={loading}
          _pressed={{ backgroundColor: COLORS.PURPLE[700], opacity: 0.7 }}
        >
          SAVE
        </EZButton>
      </View>
    </SafeAreaView>
  );
};

export default AddCurrencyScreen;
