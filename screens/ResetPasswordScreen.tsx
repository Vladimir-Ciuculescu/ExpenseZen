import { StatusBar } from "expo-status-bar";
import { VStack } from "native-base";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import ResetPasswordForm from "../components/ResetPasswordForm";
import { RootState } from "../redux/store";

const ResetPasswordScreen: React.FC<any> = () => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style={user.theme === "dark" ? "light" : "dark"} />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <VStack space={10} px={5} paddingTop={10}>
          <ResetPasswordForm />
        </VStack>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;
