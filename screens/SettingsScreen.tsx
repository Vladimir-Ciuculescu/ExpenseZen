import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { removeCurrency, removeUser } from "../redux/userReducer";
import React, { Fragment, useLayoutEffect, useRef, useState } from "react";
import { View, Text, ScrollView, HStack, VStack, Circle, Button } from "native-base";
import { TouchableOpacity, Switch, StyleSheet } from "react-native";
import EZHeaderTitle from "../components/shared/EzHeaderTitle";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import { CurrencyService } from "../api/services/CurrencyService";
import { RootState } from "../redux/store";
import COLORS from "../colors";

const SettingsScreen: React.FC<any> = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [currencies, setCurrencies] = useState<any[]>([]);
  const user: any = useSelector((state: RootState) => state.user);

  const [selectedCurrency, setSelectedCurrency] = useState({
    label: `${user.symbol} ${user.name}`,
    value: `${user.symbol} ${user.name}`,
  });
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
    getAllCurrencies();
  }, [navigation]);

  const getAllCurrencies = async () => {
    const currencies = await CurrencyService.getAllCurrencies();
    console.log(currencies);
    setCurrencies(
      currencies!.map((currency) => ({
        label: `${currency.symbol} ${currency.name}`,
        value: `${currency.symbol} ${currency.name}`,
      }))
    );
  };

  // setTimeout(() => {
  //   pickerRef.current.togglePicker(true);
  // }, 1000);

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
            <Fragment>
              {/* <RNPickerSelect
                style={{
                  inputIOS: {
                    height: "100%",
                  },
                  placeholder: {
                    fontSize: 20,
                    color: COLORS.MUTED[900],
                  },
                }}
                ref={pickerRef}
                placeholder=""
                value={0}
                onValueChange={(value) => console.log(value)}
                items={currencies}
              /> */}
              {/* <RNPickerSelect
                ref={pickerRef}
                items={[
                  { label: "Option 1", value: "option1" },
                  { label: "Option 2", value: "option2" },
                  // Add your other options here
                ]}
                Icon={() => <Text style={styles.placeholder}>Select an option</Text>}
                onValueChange={(value) => {
                  // Handle selected value here
                }}
                placeholder={{
                  label: "",
                  value: null,
                  color: "red",
                }}
                style={{
                  inputIOS: styles.selectedValue,
                  inputAndroid: styles.selectedValue,
                }}
                hideDoneBar={true} // This will hide the selected value in the container
              /> */}
              <RNPickerSelect
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
                }}
                onClose={() => console.log("awd")}
                // placeholder={{
                //   //label: `${user.symbol} ${user.currency}`,
                //   value: null,
                //   color: "#9EA0A4",
                // }}
                placeholder={{}}
                value={selectedCurrency}
                items={currencies}
                //value={0}
                onValueChange={(value) => setSelectedCurrency(value)}
                //style={pickerSelectStyles}
                //value={this.state.favSport0}
                ref={pickerRef}
              />
              {/* <Text fontSize={18} fontFamily="SourceBold" color="purple.700">
                {user.symbol} {user.currency}
              </Text> */}
            </Fragment>
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
    // <View bg="muted.50" flex={1}>
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

const styles = StyleSheet.create({
  placeholder: {
    color: "gray",
  },
  selectedValue: {
    color: "blue", // Customize the color of the selected value text
    fontSize: 16, // Customize the font size of the selected value text
    // Add any other styles as needed
  },
});
