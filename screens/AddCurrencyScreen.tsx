import { Text, View } from "native-base";
import { SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import EZButton from "../components/shared/EZButton";
import COLORS from "../colors";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { CurrencyService } from "../api/services/CurrencyService";

interface AddCurrencyScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

const AddCurrencyScreen: React.FC<AddCurrencyScreenProps> = ({
  navigation,
}) => {
  const [currencies, setCurrencies] = useState<any[]>([]);
  const [currency, setCurrnecy] = useState<any>();

  useEffect(() => {
    const getAllCurrencies = async () => {
      const data = await CurrencyService.getAllCurrencies();
      setCurrencies(
        data!.map((item) => {
          return item.name;
        })
      );
    };

    getAllCurrencies();
  }, [navigation]);

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
          {currencies.map((value, key) => (
            <Picker.Item key={key} label={value} value={value} />
          ))}
        </Picker>
        <EZButton
          position="absolute"
          bottom={10}
          width="80%"
          bg="purple.700"
          borderRadius={8}
          height="55px"
          _text={{ fontFamily: "SourceSansPro", fontSize: 17 }}
          //onPress={submit}
          // isLoading={loading}
          _pressed={{ backgroundColor: COLORS.PURPLE[700], opacity: 0.7 }}
        >
          SAVE
        </EZButton>
      </View>
    </SafeAreaView>
  );
};

export default AddCurrencyScreen;
