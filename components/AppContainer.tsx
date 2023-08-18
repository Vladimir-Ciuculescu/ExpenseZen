import { extendTheme, NativeBaseProvider } from "native-base";
import React from "react";
import { useSelector } from "react-redux";
import Navigation from "../navigation/Navigation";
import { RootState } from "../redux/store";

const AppContainer: React.FC<any> = () => {
  const user = useSelector((state: RootState) => state.user);

  const isDarkTheme = user.theme === "dark";

  const theme = extendTheme({
    colors: {
      muted: {
        50: isDarkTheme ? "#374151" : "#fafafa",
        900: isDarkTheme ? "#fafafa" : "#171717",
      },
    },
    config: {
      initialColorMode: user.theme,
    },
  });

  return (
    <NativeBaseProvider theme={theme}>
      <Navigation />
    </NativeBaseProvider>
  );
};

export default AppContainer;
