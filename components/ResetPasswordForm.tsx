import { Text, useTheme, VStack } from "native-base";
import React, { useState } from "react";
import { TouchableOpacity, Alert } from "react-native";
import COLORS from "../colors";
import EZInput from "./shared/EZInput";
import { authInput } from "../commonStyles";
import EZButton from "./shared/EZButton";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../interfaces/Navigation";
import { useFormik } from "formik";
import { resetPasswordSchema } from "../schemas/resetPasswordScheama";
import { UserService } from "../api/services/UserService";

const ResetPasswordForm: React.FC<any> = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    colors: { muted },
  } = useTheme();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values) => {
      const { email, password } = values;

      try {
        const response = await UserService.resetPassword(email, password);

        if (response?.message === "This user does not exist !") {
          Alert.alert("Error", response.message, [
            { text: "OK", onPress: () => console.log("OK Pressed"), style: "destructive" },
          ]);
        } else if (response?.message === "Password resetted succesfully !") {
          Alert.alert("Success", response.message, [
            {
              text: "OK",
              onPress: () => {
                formik.resetForm();
                navigation.goBack();
              },
            },
          ]);
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
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back-sharp" size={30} color={muted[900]} />
      </TouchableOpacity>
      <VStack>
        <Text fontFamily="SourceBold" fontSize={35}>
          Reset your password
        </Text>
        <Text fontFamily="SourceSansPro" fontSize={17} color={COLORS.MUTED[400]}>
          Fill the info to change your password
        </Text>
      </VStack>
      <VStack space={6}>
        <EZInput
          type="text"
          style={authInput}
          label="Email address"
          value={values.email}
          onChangeText={(e: string) => handleValue("email", e)}
          error={touched.email && errors.email}
          returnKeyType="next"
          borderRadius={12}
          borderColor="muted.200"
        />
        <EZInput
          type="password"
          style={authInput}
          label="New Password"
          textContentType="oneTimeCode"
          value={values.password}
          onChangeText={(e: string) => handleValue("password", e)}
          error={touched.password && errors.password}
          returnKeyType="next"
          borderRadius={12}
          borderColor="muted.200"
        />
        <EZInput
          type="password"
          style={authInput}
          label="Repeat new password"
          textContentType="oneTimeCode"
          value={values.repeatPassword}
          onChangeText={(e: string) => handleValue("repeatPassword", e)}
          error={touched.repeatPassword && errors.repeatPassword}
          returnKeyType="next"
          placeholder=""
          borderRadius={12}
          borderColor="muted.200"
        />
      </VStack>
      <EZButton
        onPress={submit}
        isLoading={loading}
        variant="solid"
        bg="purple.700"
        borderRadius={8}
        height="44px"
        _text={{ fontFamily: "SourceSansPro", fontSize: 17 }}
        _pressed={{ backgroundColor: COLORS.PURPLE[700], opacity: 0.7 }}>
        Reset password
      </EZButton>
    </VStack>
  );
};

export default ResetPasswordForm;
