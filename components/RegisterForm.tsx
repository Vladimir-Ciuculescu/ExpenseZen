import React, { useState, useRef } from "react";
import { Alert } from "react-native";
import { VStack, Text } from "native-base";
import EZInput from "./shared/EZInput";
import { useFormik } from "formik";
import { registerSchema } from "../schemas/registerSchema";
import COLORS from "../colors";
import { UserService } from "../api/services/UserService";
import { User } from "../interfaces/User";
import { Provider } from "../interfaces/Provider";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import EZButton from "./shared/EZButton";
import { AppStackParamList } from "../interfaces/Navigation";
import { authInput } from "../commonStyles";

const RegisterForm: React.FC<any> = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const repeatPasswordRef = useRef(null);

  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();

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

  const focusNextInput = (nextInputRef: any) => {
    nextInputRef.current.focus();
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
          style={authInput}
          label="First name"
          returnKeyType="next"
          type="text"
          value={values.firstName}
          placeholder="First name"
          borderRadius={12}
          borderColor="muted.200"
          onChangeText={(e: string) => handleValue("firstName", e)}
          error={touched.firstName && errors.firstName}
          onSubmitEditing={() => {
            focusNextInput(lastNameRef);
          }}
        />
        <EZInput
          style={authInput}
          returnKeyType="next"
          ref={lastNameRef}
          type="text"
          value={values.lastName}
          placeholder="Last name"
          label="Last name"
          borderRadius={12}
          borderColor="muted.200"
          onChangeText={(e: string) => handleValue("lastName", e)}
          error={touched.lastName && errors.lastName}
          onSubmitEditing={() => {
            focusNextInput(emailRef);
          }}
        />
        <EZInput
          style={authInput}
          returnKeyType="next"
          ref={emailRef}
          type="text"
          value={values.email}
          placeholder="Email"
          label="Email address"
          borderRadius={12}
          borderColor="muted.200"
          onChangeText={(e: string) => handleValue("email", e)}
          error={touched.email && errors.email}
          onSubmitEditing={() => {
            focusNextInput(passwordRef);
          }}
        />
        <EZInput
          style={authInput}
          returnKeyType="next"
          ref={passwordRef}
          type="password"
          textContentType="oneTimeCode"
          value={values.password}
          placeholder="Password"
          label="Password"
          borderRadius={12}
          borderColor="muted.200"
          onChangeText={(e: string) => handleValue("password", e)}
          error={touched.password && errors.password}
          onSubmitEditing={() => {
            focusNextInput(repeatPasswordRef);
          }}
        />
        <EZInput
          style={authInput}
          returnKeyType="done"
          ref={repeatPasswordRef}
          type="password"
          textContentType="oneTimeCode"
          value={values.repeatPassword}
          placeholder="Repeat password"
          label="Repeat password"
          borderRadius={12}
          borderColor="muted.200"
          onChangeText={(e: string) => handleValue("repeatPassword", e)}
          error={touched.repeatPassword && errors.repeatPassword}
        />
      </VStack>

      <EZButton
        variant="solid"
        bg="purple.700"
        borderRadius={8}
        height="44px"
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
