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
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View bg="white" flex={1} justifyContent="center">
          <VStack space={10} px={10}>
            <RegisterForm />
          </VStack>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
