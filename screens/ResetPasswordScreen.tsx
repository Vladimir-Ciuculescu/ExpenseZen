import { StatusBar } from "expo-status-bar";
import { VStack } from "native-base";
import React from "react";
import {} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import ResetPasswordForm from "../components/ResetPasswordForm";

const ResetPasswordScreen: React.FC<any> = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <VStack space={10} px={5} paddingTop={10}>
          <ResetPasswordForm />
        </VStack>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;
