import React, { useState } from "react";
import { Alert } from "react-native";
import { VStack, Text, Button } from "native-base";
import EZInput from "./shared/EZInput";
import { useFormik } from "formik";
import { registerSchema } from "../schemas/registerSchema";
import COLORS from "../colors";
import { UserService } from "../api/services/UserService";
import { User } from "../interfaces/User";
import { Provider } from "../interfaces/Provider";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../interfaces/RootStackParamList";
import EZButton from "./shared/EZButton";

const RegisterForm: React.FC<any> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      const user: User = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,

        password: values.password,
        provider: Provider.DIRECT,
      };

      try {
        const response = await UserService.registerUser(user);

        Alert.alert(response!.title, response!.message);

        if (response!.title === "Try again") {
          formik.resetForm();
        } else {
          navigation.navigate("Login");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const { values, errors, submitForm, touched } = formik;

  const handleValue = (label: string, value: string) => {
    formik.setFieldValue(label, value);
  };

  const submit = async () => {
    setLoading(true);

    await submitForm();
    setLoading(false);
  };

  return (
    <VStack space={10}>
      <VStack space={2}>
        <Text fontFamily="SourceBold" fontSize={30} textAlign="center">
          Register account
        </Text>
        <Text textAlign="center" fontFamily="SourceSansPro" fontSize={17}>
          Fill your information
        </Text>
      </VStack>
      <VStack space={6}>
        <EZInput
          type="text"
          value={values.firstName}
          placeholder="First name"
          fontSize={15}
          color="purple.700"
          pl={5}
          fontFamily="SourceSansPro"
          borderRadius={8}
          focusOutlineColor={
            touched.firstName && errors.firstName ? "red.500" : "purple.700"
          }
          height="55px"
          borderColor="purple.700"
          _focus={{ backgroundColor: "transparent" }}
          onChangeText={(e: string) => handleValue("firstName", e)}
          error={touched.firstName && errors.firstName}
        />
        <EZInput
          type="text"
          value={values.lastName}
          placeholder="Last name"
          fontSize={15}
          color="purple.700"
          pl={5}
          fontFamily="SourceSansPro"
          borderRadius={8}
          focusOutlineColor={
            touched.lastName && errors.lastName ? "red.500" : "purple.700"
          }
          height="55px"
          borderColor="purple.700"
          _focus={{ backgroundColor: "transparent" }}
          onChangeText={(e: string) => handleValue("lastName", e)}
          error={touched.lastName && errors.lastName}
        />
        <EZInput
          type="text"
          value={values.email}
          placeholder="Email"
          fontSize={15}
          color="purple.700"
          pl={5}
          fontFamily="SourceSansPro"
          borderRadius={8}
          focusOutlineColor={
            touched.email && errors.email ? "red.500" : "purple.700"
          }
          height="55px"
          borderColor="purple.700"
          _focus={{ backgroundColor: "transparent" }}
          onChangeText={(e: string) => handleValue("email", e)}
          error={touched.email && errors.email}
        />
        <EZInput
          type="password"
          textContentType="oneTimeCode"
          value={values.password}
          placeholder="Password"
          fontSize={15}
          color="purple.700"
          pl={5}
          fontFamily="SourceSansPro"
          borderRadius={8}
          focusOutlineColor={
            touched.password && errors.password ? "red.500" : "purple.700"
          }
          height="55px"
          borderColor="purple.700"
          _focus={{ backgroundColor: "transparent" }}
          onChangeText={(e: string) => handleValue("password", e)}
          error={touched.password && errors.password}
        />
        <EZInput
          type="password"
          textContentType="oneTimeCode"
          value={values.repeatPassword}
          placeholder="Repeat password"
          fontSize={15}
          color="purple.700"
          pl={5}
          fontFamily="SourceSansPro"
          borderRadius={8}
          focusOutlineColor={
            touched.repeatPassword && errors.repeatPassword
              ? "red.500"
              : "purple.700"
          }
          height="55px"
          borderColor="purple.700"
          _focus={{ backgroundColor: "transparent" }}
          onChangeText={(e: string) => handleValue("repeatPassword", e)}
          error={touched.repeatPassword && errors.repeatPassword}
        />
      </VStack>

      <EZButton
        bg="purple.700"
        borderRadius={8}
        height="55px"
        _text={{ fontFamily: "SourceSansPro", fontSize: 17 }}
        onPress={submit}
        isLoading={loading}
        _pressed={{ backgroundColor: COLORS.PURPLE[700], opacity: 0.7 }}
      >
        Register
      </EZButton>
    </VStack>
  );
};

export default RegisterForm;
