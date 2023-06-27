import React, { useLayoutEffect } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native";
import { Divider, HStack, Pressable, Text, View, VStack } from "native-base";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface RegisterScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        borderBottomWidth: 0,
      },
      headerLeft: () => (
        <Pressable onPress={navigation.goBack}>
          <MaterialIcons name="arrow-back-ios" size={24} color="black" />
        </Pressable>
      ),
      title: null,
      headerShadowVisible: false,
    });
  }, []);

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ justifyContent: "center" }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View bg="white" flex={1} justifyContent="center">
          <VStack space={10} px={10}>
            <RegisterForm />
          </VStack>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

export default RegisterScreen;
