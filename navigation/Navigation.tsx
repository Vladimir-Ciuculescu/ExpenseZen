import React from "react";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";

import StackNavigator from "./StackNavigator";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Navigation: React.FC<any> = () => {
  const { theme } = useSelector((state: RootState) => state.user);

  let navigationTheme = theme === "light" ? DefaultTheme : DarkTheme;

  navigationTheme = {
    ...navigationTheme,
    colors: {
      ...navigationTheme.colors,
      background: theme === "dark" ? "#1f2937" : navigationTheme.colors.background,
      card: theme === "dark" ? "#374151" : navigationTheme.colors.card,
      primary: "#222",

      //text: "red",
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default Navigation;
