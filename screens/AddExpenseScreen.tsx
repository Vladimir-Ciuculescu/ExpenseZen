import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  FormControl,
  HStack,
  Pressable,
  ScrollView,
  Text,
  VStack,
  View,
  WarningOutlineIcon,
} from "native-base";
import {
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import EZInput from "../components/shared/EZInput";
import { CategoryService } from "../api/services/CategoryService";
import { Category } from "../interfaces/Category";
import { getCategoryIcon } from "../utils/getCategoryIcon";
import CategoryItem from "../components/CategoryItem";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useFormik } from "formik";
import { expenseSchema } from "../schemas/expenseSchema";
import EZButton from "../components/shared/EZButton";
import COLORS from "../colors";
import { ExpenseService } from "../api/services/ExpenseService";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface AddExpenseScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

const AddExpenseScreen: React.FC<AddExpenseScreenProps> = ({ navigation }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const { width } = useWindowDimensions();

  const user = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState<boolean>(false);
  const formik = useFormik({
    initialValues: {
      amount: "",
      category: "",
      description: "",
    },
    validationSchema: expenseSchema,
    onSubmit: async (values) => {
      const { amount, category, description } = values;

      try {
        const currentCategory = categories.find(
          (item) => item.name === category
        );

        const formatAmount = amount.replace(",", ".");
        const numericFormat = Number(formatAmount);

        const Expense = {
          userId: Number(user.id),
          categoryId: Number(currentCategory!.id),
          amount: numericFormat,
          description,
        };

        await ExpenseService.AddExpense(Expense);

        navigation.goBack();
      } catch (error) {
        console.log(error);
      }
    },
  });

  useLayoutEffect(() => {
    const getCategories = async () => {
      const data = await CategoryService.getAllCategories();

      setCategories(
        data!.map((category: Category) => {
          return {
            id: category.id,
            name: category.name,
            color: category.color,
            icon: getCategoryIcon(category.name, 24),
          };
        })
      );
    };

    getCategories();
  }, [navigation]);

  const handleValue = (label: string, value: string) => {
    if (
      label === "amount" &&
      values.amount.includes(",") &&
      value.slice(-1) === ","
    ) {
      formik.setFieldValue(label, value.slice(0, -1));
    } else {
      formik.setFieldValue(label, value);
    }
  };

  const selectCategory = (value: string) => {
    formik.setFieldValue("category", value);
  };

  const { values, errors, submitForm, touched } = formik;

  const addExpense = async () => {
    setLoading(true);
    await submitForm();
    setLoading(false);
  };

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="always"
      contentContainerStyle={{ flex: 1, marginBottom: -100 }}
      showsVerticalScrollIndicator={false}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView flex={1}>
            <Pressable
              style={{ position: "absolute", right: 40, top: 25, zIndex: 9999 }}
              onPress={() => navigation.goBack()}
            >
              <AntDesign name="close" size={24} color="black" />
            </Pressable>
            <View
              flex={1}
              pt={16}
              alignItems="center"
              justifyContent="space-between"
            >
              <VStack alignItems="center" width="100%" px={12} space={10}>
                <VStack space={4} alignItems="center" width="100%">
                  <Text fontFamily="SourceBold" fontSize={35}>
                    Add new expense
                  </Text>
                  <FormControl w={"100%"}>
                    <Text fontFamily="SourceSansPro" fontSize={20}>
                      Enter amount {user.symbol}
                    </Text>

                    <EZInput
                      keyboardType="decimal-pad"
                      type="text"
                      value={values.amount}
                      onChangeText={(e: string) => handleValue("amount", e)}
                      fontSize={22}
                      color="purple.700"
                      pl={5}
                      fontFamily="SourceSansPro"
                      textAlign="center"
                      borderRadius={8}
                      focusOutlineColor={
                        touched.amount && errors.amount
                          ? "red.500"
                          : "purple.700"
                      }
                      height="55px"
                      borderColor="muted.300"
                      placeholderTextColor="muted.300"
                      _focus={{
                        backgroundColor: "transparent",
                        color: "purple.700",
                        placeholderTextColor: "purple.700",
                      }}
                      error={touched.amount && errors.amount}
                    />
                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}
                    >
                      Try different from previous passwords.
                    </FormControl.ErrorMessage>
                  </FormControl>
                  <Text
                    alignSelf="flex-start"
                    fontFamily="SourceSansPro"
                    fontSize={20}
                  >
                    Category
                  </Text>
                  <FlatList
                    style={{
                      width: width - 50,
                      paddingTop: 5,
                      paddingBottom: 5,
                    }}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View margin={4} />}
                    data={categories}
                    renderItem={({ item }) => (
                      <CategoryItem
                        selectedCategory={values.category}
                        category={item}
                        selectCategory={selectCategory}
                      />
                    )}
                  />

                  {touched.category && errors.category && (
                    <HStack
                      alignSelf="flex-start"
                      alignItems="center"
                      space={1}
                    >
                      <FontAwesome
                        name="close"
                        size={20}
                        color={COLORS.DANGER[500]}
                      />
                      <Text color="danger.500" fontFamily="SourceBold">
                        {errors.category}
                      </Text>
                    </HStack>
                  )}

                  <FormControl w={"100%"}>
                    <Text fontFamily="SourceSansPro" fontSize={20}>
                      Description
                    </Text>

                    <EZInput
                      returnKeyType="done"
                      type="text"
                      value={values.description}
                      onChangeText={(e: string) =>
                        handleValue("description", e)
                      }
                      fontSize={22}
                      color="purple.700"
                      pl={5}
                      pt={3}
                      fontFamily="SourceSansPro"
                      borderRadius={8}
                      focusOutlineColor={
                        touched.description && errors.description
                          ? "red.500"
                          : "purple.700"
                      }
                      height="55px"
                      borderColor="muted.300"
                      placeholderTextColor="muted.300"
                      _focus={{
                        backgroundColor: "transparent",
                        color: "purple.700",
                        placeholderTextColor: "purple.700",
                      }}
                      error={touched.description && errors.description}
                    />

                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}
                    >
                      Try different from previous passwords.
                    </FormControl.ErrorMessage>
                  </FormControl>
                </VStack>
                <EZButton
                  onPress={addExpense}
                  w="100%"
                  isLoading={loading}
                  bg="purple.700"
                  borderRadius={8}
                  height="55px"
                  _text={{ fontFamily: "SourceSansPro", fontSize: 17 }}
                  _pressed={{
                    backgroundColor: COLORS.PURPLE[700],
                    opacity: 0.7,
                  }}
                >
                  SAVE
                </EZButton>
              </VStack>
            </View>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

export default AddExpenseScreen;
