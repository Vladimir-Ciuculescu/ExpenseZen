import React, { useState } from "react";
import { VStack, Text, Button } from "native-base";
import EZInput from "./shared/EZInput";
import { useFormik } from "formik";
import { registerSchema } from "../schemas/registerSchema";
import COLORS from "../colors";

const RegisterForm: React.FC<any> = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: () => {
      setLoading(true);
    },
  });

  const { values, errors, submitForm, touched } = formik;

  const handleValue = (label: string, value: string) => {
    formik.setFieldValue(label, value);
  };

  const submit = () => {
    setLoading(true);

    setTimeout(() => {
      submitForm();
      setLoading(false);
    }, 2000);
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
          value={values.password}
          placeholder="Password"
          fontSize={15}
          color="purple.700"
          pl={5}
          fontFamily="SourceSansPro"
          borderRadius={8}
          focusOutlineColor={errors.password ? "red.500" : "purple.700"}
          height="55px"
          borderColor="purple.700"
          _focus={{ backgroundColor: "transparent" }}
          onChangeText={(e: string) => handleValue("password", e)}
          error={touched.password && errors.password}
        />
        <EZInput
          type="password"
          value={values.repeatPassword}
          placeholder="Repeat password"
          fontSize={15}
          color="purple.700"
          pl={5}
          fontFamily="SourceSansPro"
          borderRadius={8}
          focusOutlineColor={errors.repeatPassword ? "red.500" : "purple.700"}
          height="55px"
          borderColor="purple.700"
          _focus={{ backgroundColor: "transparent" }}
          onChangeText={(e: string) => handleValue("repeatPassword", e)}
          error={touched.repeatPassword && errors.repeatPassword}
        />
      </VStack>
      <Button
        bg="purple.700"
        borderRadius={8}
        height="55px"
        _text={{ fontFamily: "SourceSansPro", fontSize: 17 }}
        onPress={submit}
        isLoading={loading}
        _pressed={{ backgroundColor: COLORS.PURPLE[700] }}
      >
        Register
      </Button>
    </VStack>
  );
};

export default RegisterForm;
