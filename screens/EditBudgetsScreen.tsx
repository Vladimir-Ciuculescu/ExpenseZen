import { NavigationProp, ParamListBase } from "@react-navigation/native";
import {
  Text,
  ScrollView,
  Pressable,
  VStack,
  KeyboardAvoidingView,
  View,
  Input,
  HStack,
  Skeleton,
} from "native-base";
import React, { useState, useEffect } from "react";
import {
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
  Button,
  TextInput,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AntDesign } from "@expo/vector-icons";
import MonthlyBudgetItem from "../components/MonthlyBudgetItem";
import { Category } from "../interfaces/Category";
import { CategoryService } from "../api/services/CategoryService";
import { getCategoryIcon } from "../utils/getCategoryIcon";
import { UserService } from "../api/services/UserService";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Budget } from "../interfaces/Budget";
import EZButton from "../components/shared/EZButton";
import COLORS from "../colors";

interface EditBudgetScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

const EditBudgetScreen: React.FC<EditBudgetScreenProps> = ({ navigation }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const user = useSelector((state: RootState) => state.user);
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [budgets, setBudgets] = useState<any>([]);

  useEffect(() => {
    getInfo();
  }, [navigation]);

  const getInfo = async () => {
    setDataLoading(true);
    const [categories, budgets] = await Promise.all([
      getCategories(),
      getBudgets(),
    ]);

    const budgetValues: Budget[] = [];

    const categoriesValues = categories!.map((category: Category) => {
      const budget = budgets.find(
        (item: Budget) => item.category === category.name
      );

      budgetValues.push(
        budget
          ? { ...budget, categoryId: category.id }
          : { budget: 0, category: category.name, categoryId: category.id }
      );

      return {
        id: category.id,
        name: category.name,
        color: category.color,
        icon: getCategoryIcon(category.name, 24),
        budget: budget ? budget.budget : 0,
      };
    });

    setCategories(categoriesValues);
    setBudgets(budgetValues);

    setDataLoading(false);
  };

  const getCategories = async () => {
    const data = await CategoryService.getAllCategories();
    console.log(data);
    return data;
  };

  const getBudgets = async () => {
    const data = await UserService.getUserBudgets(user.id);

    return data;
  };

  const closeModal = () => {
    navigation.goBack();
  };

  const handleValues = (value: string, category: Category) => {
    const element = budgets.find(
      (item: Budget) => item.category === category.name
    );

    let newValues;

    if (element) {
      newValues = budgets.map((item: any) =>
        item === element ? { ...item, budget: value } : item
      );
    } else {
      newValues = [...budgets, { budget: value, category: category.name }];
    }

    setBudgets(newValues);
  };

  const saveBudgets = async () => {
    setButtonLoading(true);
    await UserService.saveUserBudgets(user.id, budgets);
    setButtonLoading(false);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView flex={1} px={7} showsVerticalScrollIndicator={false}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <VStack mt={10} space={10}>
              <Pressable
                style={{
                  position: "absolute",
                  right: 10,
                  top: 0,
                  zIndex: 9999,
                }}
                onPress={closeModal}
              >
                <AntDesign name="close" color="black" size={24} />
              </Pressable>
              <Text textAlign="center" fontFamily="SourceBold" fontSize={26}>
                Edit your monthly budgets
              </Text>
              {dataLoading
                ? Array.from(Array(10).keys()).map((_, key) => {
                    return (
                      <HStack space="2" alignItems="center" key={key}>
                        <Skeleton size="20" rounded="2xl" />
                        <Skeleton h="12" flex="1.5" rounded="full" />
                        <Skeleton h="10" flex="1" rounded="2xl" />
                      </HStack>
                    );
                  })
                : categories.map((category: Category, index) => (
                    <MonthlyBudgetItem
                      category={category}
                      key={index}
                      onChange={(e: string) => handleValues(e, category)}
                    />
                  ))}

              <EZButton
                onPress={saveBudgets}
                variant="solid"
                isLoading={buttonLoading}
                //onPress={addExpense}
                w="100%"
                //isLoading={loading}
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
          </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditBudgetScreen;
