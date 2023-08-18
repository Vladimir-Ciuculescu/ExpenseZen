import { extendTheme, NativeBaseProvider } from "native-base";
import React from "react";
import { useSelector } from "react-redux";
import Navigation from "../navigation/Navigation";
import { RootState } from "../redux/store";

const AppContainer: React.FC<any> = () => {
  const user = useSelector((state: RootState) => state.user);

  console.log(user.theme);

  const isDarkTheme = user.theme === "dark";

  const theme = extendTheme({
    // components: {
    //   Text: {
    //     baseStyle: (prop: any) => {
    //       return {
    //         _light: { color: "red.300" },
    //         _dark: { color: "muted.300" },
    //       };
    //     },
    //   },
    // },
    colors: {
      purple: {
        400: "red",
      },
      muted: {
        50: isDarkTheme ? "#374151" : "#fafafa",
        //50: "red",
        //100: "red",
        //  200: "red",
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
