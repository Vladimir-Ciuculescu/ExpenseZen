import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, VStack } from "native-base";
import React, { useState } from "react";
import { Alert, TouchableOpacity } from "react-native";
import { AppStackParamList } from "../interfaces/Navigation";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../colors";
import EZInput from "./shared/EZInput";
import { useFormik } from "formik";
import { authInput } from "../commonStyles";
import EZButton from "./shared/EZButton";
import { changePasswordSchema } from "../schemas/changePasswordSchemta";
import { UserService } from "../api/services/UserService";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const ChangePasswordForm: React.FC<any> = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const [loading, setLoading] = useState<boolean>(false);
  const user: any = useSelector((state: RootState) => state.user);

  const formik = useFormik({
    initialValues: {
      password: "",
      repeatPassword: "",
    },
    validationSchema: changePasswordSchema,
    onSubmit: async (values) => {
      const { password } = values;

      try {
        const response = await UserService.changePassword(user.email, password);

        if (response?.message) {
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

  const handleValue = (label: string, value: string) => {
    formik.setFieldValue(label, value);
  };

  const { values, errors, touched, submitForm } = formik;

  const submit = async () => {
    setLoading(true);
    await submitForm();
    setLoading(false);
  };

  return (
    <VStack space={10}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back-sharp" size={30} color="black" />
      </TouchableOpacity>
      <VStack>
        <Text fontFamily="SourceBold" fontSize={35}>
          Change your password
        </Text>
        <Text fontFamily="SourceSansPro" fontSize={17} color={COLORS.MUTED[400]}>
          Fill the info to change your password
        </Text>
      </VStack>
      <VStack space={6}>
        <EZInput
          type="password"
          style={authInput}
          label="New password"
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
        Change password
      </EZButton>
    </VStack>
  );
};

export default ChangePasswordForm;
