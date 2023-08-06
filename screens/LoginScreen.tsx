import React from "react";
import { SafeAreaView } from "react-native";
import { Text, VStack, HStack, Pressable } from "native-base";
import LoginForm from "../components/LoginForm";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface LoginScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const goToRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <VStack space={10} px={5} paddingTop={24}>
          <LoginForm navigation={navigation} />

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
                style={{ backgroundColor: "transparent" }}>
                Sign up
              </Text>
            </Pressable>
          </HStack>
        </VStack>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
