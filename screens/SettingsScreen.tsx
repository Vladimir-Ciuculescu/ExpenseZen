import { View, Text, Button } from "native-base";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useDispatch } from "react-redux";
import { removeUser } from "../redux/userReducer";

const SettingsScreen: React.FC<any> = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const logout = () => {
    dispatch(removeUser());
    navigation.navigate("Login");
  };

  return (
    <View>
      <Button onPress={logout}>Logout</Button>
    </View>
  );
};
export default SettingsScreen;
