import React from "react";
import { SafeAreaView, KeyboardAvoidingView } from "react-native";
import { Text, VStack, HStack, Divider, Pressable } from "native-base";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import LoginForm from "../components/LoginForm";
import LoginProviders from "../components/LoginProviders";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

interface LoginScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const goToRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <VStack space={10} px={10}>
            <LoginForm />
            {/* <HStack alignItems="center" space={3}>
              <Divider flex={1} />
              <Text fontFamily="SourceSansPro">Or continue with</Text>
              <Divider flex={1} />
            </HStack>

            <LoginProviders /> */}
            <HStack justifyContent="center" space={2}>
              <Text fontFamily="SourceSansPro" fontSize={17}>
                Don't have an account ?
              </Text>
              <Pressable onPress={goToRegister}>
                <Text
                  fontFamily="SourceBold"
                  fontSize={17}
                  color="purple.700"
                  style={{ backgroundColor: "transparent" }}
                >
                  Register
                </Text>
              </Pressable>
            </HStack>
          </VStack>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
