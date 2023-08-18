import { StatusBar } from "expo-status-bar";
import { VStack } from "native-base";
import React from "react";
import { SafeAreaView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import ChangePasswordForm from "../components/ChangePasswordForm";
import { RootState } from "../redux/store";

const ChangePasswordScreen: React.FC<any> = () => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style={user.theme === "dark" ? "light" : "dark"} />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <VStack space={10} px={5} paddingTop={10}>
          <ChangePasswordForm />
        </VStack>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;
