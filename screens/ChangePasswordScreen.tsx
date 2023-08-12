import { StatusBar } from "expo-status-bar";
import { Text, VStack } from "native-base";
import React from "react";
import { SafeAreaView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ChangePasswordForm from "../components/ChangePasswordForm";
import ResetPasswordForm from "../components/ResetPasswordForm";

const ChangePasswordScreen: React.FC<any> = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <VStack space={10} px={5} paddingTop={10}>
          <ChangePasswordForm />
        </VStack>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;
