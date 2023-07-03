import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import { VStack, Text, Pressable, Icon, Button } from "native-base";
import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userReducer";
import { RootState } from "../redux/store";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

import { UserService } from "../api/services/UserService";
import { Provider } from "../interfaces/Provider";
import { useFormik } from "formik";
import { loginSchema } from "../schemas/loginSchema";
import EZInput from "./shared/EZInput";
import COLORS from "../colors";
import EZButton from "./shared/EZButton";
import { CurrencyService } from "../api/services/CurrencyService";

interface LoginFormProps {
  navigation: NavigationProp<ParamListBase>;
}

const LoginForm: React.FC<LoginFormProps> = ({ navigation }) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const { email, password } = values;
      const response = await UserService.loginUser(
        email,
        password,
        Provider.DIRECT
      );
      const message: any = response.message;
      if (message === "User exists") {
        const { id, first_name, last_name, email } = response.data;

        dispatch(
          setUser({ firstName: first_name, lastName: last_name, email, id })
        );

        const data = await CurrencyService.getUserCurrency(id);
        console.log("user currency:", data);

        if (data) {
          navigation.navigate("Tabs", { screen: "Home" });
        } else {
          navigation.navigate("Currency");
        }
      } else {
        Alert.alert("Error", message);
      }
    },
  });

  useEffect(() => {
    navigation.addListener("focus", () => {
      formik.resetForm();
    });
  }, [navigation]);

  const [passwordVisilble, setPasswordVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  const togglePasswordVisible = () => {
    setPasswordVisible((prevValue) => !prevValue);
  };

  const login = async () => {
    setLoading(true);
    await submitForm();
    setLoading(false);
  };

  const handleValue = (label: string, value: string) => {
    formik.setFieldValue(label, value);
  };

  const { values, errors, touched, submitForm } = formik;

  return (
    <VStack space={10}>
      <VStack space={2}>
        <Text fontFamily="SourceBold" fontSize={30} textAlign="center">
          Welcome to ExpenseZen
        </Text>
        <Text textAlign="center" fontFamily="SourceSansPro" fontSize={17}>
          Please sign in to track your expenses and stay on top of your finances
        </Text>
      </VStack>
      <VStack space={6}>
        {/* <Input
          color="purple.700"
          placeholder="Enter your email"
          fontSize={15}
          pl={5}
          fontFamily="SourceSansPro"
          borderRadius={8}
          focusOutlineColor="purple.700"
          height="55px"
          borderColor="purple.700"
          _focus={{ backgroundColor: "transparent" }}
        />
        <Input
          type={passwordVisilble ? "text" : "password"}
          placeholder="Password"
          color="purple.700"
          fontSize={15}
          pl={5}
          fontFamily="SourceSansPro"
          borderRadius={8}
          focusOutlineColor="purple.700"
          height="55px"
          borderColor="purple.700"
          _focus={{ backgroundColor: "transparent" }}
          InputRightElement={
            <Pressable mr={4} onPress={togglePasswordVisible}>
              <Icon
                size={5}
                color="purple.700"
                as={<Feather name={passwordVisilble ? "eye" : "eye-off"} />}
              />
            </Pressable>
          }
        /> */}
        <EZInput
          type="text"
          value={values.email}
          placeholder="Enter your email"
          onChangeText={(e) => handleValue("email", e)}
          color="purple.700"
          fontSize={15}
          pl={5}
          fontFamily="SourceSansPro"
          borderRadius={8}
          height="55px"
          borderColor="purple.700"
          focusOutlineColor={
            touched.email && errors.email ? "red.500" : "purple.700"
          }
          _focus={{ backgroundColor: "transparent" }}
          error={touched.email && errors.email}
        />
        <EZInput
          type={passwordVisilble ? "text" : "password"}
          value={values.password}
          placeholder="Password"
          onChangeText={(e) => handleValue("password", e)}
          color="purple.700"
          fontSize={15}
          pl={5}
          fontFamily="SourceSansPro"
          borderRadius={8}
          height="55px"
          borderColor="purple.700"
          focusOutlineColor={
            touched.password && errors.password ? "red.500" : "purple.700"
          }
          _focus={{ backgroundColor: "transparent" }}
          error={touched.password && errors.password}
          InputRightElement={
            <Pressable mr={4} onPress={togglePasswordVisible}>
              <Icon
                size={5}
                color="purple.700"
                as={<Feather name={passwordVisilble ? "eye" : "eye-off"} />}
              />
            </Pressable>
          }
        />
      </VStack>

      <EZButton
        isLoading={loading}
        onPress={login}
        bg="purple.700"
        borderRadius={8}
        height="55px"
        _text={{ fontFamily: "SourceSansPro", fontSize: 17 }}
        _pressed={{ backgroundColor: COLORS.PURPLE[700], opacity: 0.7 }}
      >
        Sign in
      </EZButton>
    </VStack>
  );
};

export default LoginForm;
