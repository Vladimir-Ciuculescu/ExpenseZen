import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { removeCurrency, removeUser } from "../redux/userReducer";
import React, { useLayoutEffect } from "react";
import { View, Text, ScrollView, HStack, VStack, Circle, Button } from "native-base";
import { TouchableOpacity, Switch } from "react-native";
import EZHeaderTitle from "../components/shared/EzHeaderTitle";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import RNPickerSelect from "react-native-picker-select";

const SECTIONS = [
  {
    header: "Preferences",
    icon: "settings",
    items: [
      {
        icon: <MaterialCommunityIcons name="currency-eur" size={18} color="white" />,
        color: "#fe9400",
        label: "Currency ",
        type: "link",
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

const SettingsScreen: React.FC<any> = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

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
            {items.map(({ label, icon, type, value, color }, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    // handle onPress
                  }}>
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
                    {type === "boolean" && <Switch value={value} />}
                    {type === "link" && <Feather name="chevron-right" size={24} color="black" />}
                  </HStack>
                </TouchableOpacity>
              );
            })}
          </VStack>
        </View>
      ))}
      <RNPickerSelect
        placeholder={{
          value: 0,
          label: "adwda",
        }}
        value={0}
        onValueChange={(value) => console.log(value)}
        items={[
          { label: "Football", value: "football" },
          { label: "Baseball", value: "baseball" },
          { label: "Hockey", value: "hockey" },
        ]}
      />
      <Button onPress={logout}>Log out</Button>
    </ScrollView>
  );
};
export default SettingsScreen;
