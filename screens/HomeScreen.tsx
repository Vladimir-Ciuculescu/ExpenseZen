import { View, Text } from "native-base";
import React from "react";
import { Button } from "native-base";
import { useDispatch } from "react-redux";
import { removeUser } from "../redux/userReducer";

const HomeScreen: React.FC<any> = () => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(removeUser());
  };

  return (
    <View>
      <Text>Home screen</Text>
      <Button onPress={logout}>Remove user</Button>
    </View>
  );
};
export default HomeScreen;
