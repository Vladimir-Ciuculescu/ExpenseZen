import React from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { VStack } from "native-base";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import RegisterForm from "../components/RegisterForm";
import { StatusBar } from "expo-status-bar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface RegisterScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="dark" />

      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={navigation.goBack}
          style={{ top: 20, left: 20, position: "absolute", zIndex: 999 }}
        >
          <MaterialIcons name="arrow-back-ios" size={24} color="black" />
        </TouchableOpacity>
        <VStack space={10} px={10} paddingTop={24}>
          <RegisterForm />
        </VStack>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
