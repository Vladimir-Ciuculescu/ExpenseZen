import React from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { HStack, Text, VStack } from "native-base";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import RegisterForm from "../components/RegisterForm";
import { StatusBar } from "expo-status-bar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface RegisterScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <StatusBar style="dark" />

      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <VStack space={10} px={5} paddingTop={10}>
          <RegisterForm />
          <HStack justifyContent="center" space={2}>
            <Text fontFamily="SourceSansPro" fontSize={17}>
              Already have an account ?
            </Text>
            <TouchableOpacity onPress={navigation.goBack}>
              <Text
                fontFamily="SourceBold"
                fontSize={17}
                color="purple.700"
                style={{ backgroundColor: "transparent" }}>
                Sign in
              </Text>
            </TouchableOpacity>
          </HStack>
        </VStack>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
