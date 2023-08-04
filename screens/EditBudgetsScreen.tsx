import { NavigationProp, ParamListBase } from "@react-navigation/native";
import {
  Text,
  ScrollView,
  Pressable,
  VStack,
  HStack,
  Skeleton,
} from "native-base";
import React, { useState, useEffect } from "react";
import { Keyboard, TouchableWithoutFeedback, SafeAreaView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AntDesign } from "@expo/vector-icons";
import MonthlyBudgetItem from "../components/MonthlyBudgetItem";
import { Category } from "../interfaces/Category";
import { CategoryService } from "../api/services/CategoryService";
import { getCategoryIcon } from "../utils/getCategoryIcon";
import { UserService } from "../api/services/UserService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Budget } from "../interfaces/Budget";
import EZButton from "../components/shared/EZButton";
import COLORS from "../colors";
import { StatusBar } from "expo-status-bar";
import {
  categoriesSelector,
  editBudgetsActions,
  monthlyBudgetsSelector,
  setBudgetsActions,
} from "../redux/expensesReducers";

interface EditBudgetScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

const EditBudgetScreen: React.FC<EditBudgetScreenProps> = ({ navigation }) => {
  const user = useSelector((state: RootState) => state.user);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [budgets, setBudgets] = useState<any>([]);
  const dispatch = useDispatch();
  const monthlyBudgets = useSelector(monthlyBudgetsSelector);
  const categories = useSelector(categoriesSelector);

  // useEffect(() => {
  //   getInfo();
  // }, [navigation]);

  // const getInfo = async () => {
  //   setDataLoading(true);
  //   const [categories, budgets] = await Promise.all([
  //     getCategories(),
  //     getBudgets(),
  //   ]);

  //   const budgetValues: Budget[] = [];

  //   const categoriesValues = categories!.map((category: Category) => {
  //     const budget = budgets.find(
  //       (item: Budget) => item.category === category.name
  //     );

  //     budgetValues.push(
  //       budget
  //         ? { ...budget, categoryId: category.id }
  //         : { budget: 0, category: category.name, categoryId: category.id }
  //     );

  //     return {
  //       id: category.id,
  //       name: category.name,
  //       color: category.color,
  //       icon: getCategoryIcon(category.name, 24, COLORS.MUTED[50]),
  //       budget: budget ? budget.budget : 0,
  //     };
  //   });

  //   setCategories(categoriesValues);
  //   setBudgets(budgetValues);

  //   setDataLoading(false);
  // };

  // const getCategories = async () => {
  //   const data = await CategoryService.getAllCategories();
  //   return data;
  // };

  // const getBudgets = async () => {
  //   const data = await UserService.getUserBudgets(user.id);

  //   return data;
  // };

  const closeModal = () => {
    navigation.goBack();
  };

  const handleValues = (value: string, category: Category) => {
    const element = budgets.find(
      (item: Budget) => item.category === category.name
    );

    let newValues;
    const formatAmount = value.replace(",", ".");
    const numericFormat = Number(formatAmount);

    if (element) {
      newValues = budgets.map((item: any) =>
        item === element ? { ...item, budget: numericFormat } : item
      );
    } else {
      newValues = [
        ...budgets,
        {
          budget: numericFormat,
          category: category.name,
          color: category.color,
          id: category.id,
        },
      ];
    }

    setBudgets(newValues);
  };

  const saveBudgets = async () => {
    setButtonLoading(true);
    console.log(1111, budgets);
    await UserService.saveUserBudgets(user.id, budgets);
    // dispatch(setBudgetsActions(budgets));
    dispatch(editBudgetsActions(budgets));
    setButtonLoading(false);
    navigation.goBack();
  };

  const budgetValues: Budget[] = [];

  const budgetCategories = categories!.map((category: Category) => {
    const budget = monthlyBudgets.find(
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
      icon: getCategoryIcon(category.name, 24, COLORS.MUTED[50]),
      budget: budget ? budget.budget : 0,
    };
  });

  return (
    <SafeAreaView>
      <StatusBar style="dark" />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <VStack mt={10} space={10} px={7}>
          <Pressable
            style={{
              position: "absolute",
              right: 30,
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
          {/* {dataLoading
            ? Array.from(Array(10).keys()).map((_, key) => {
                return (
                  <HStack space="2" alignItems="center" key={key}>
                    <Skeleton size="20" rounded="2xl" />
                    <Skeleton h="12" flex="1.5" rounded="full" />
                    <Skeleton h="10" flex="1" rounded="2xl" />
                  </HStack>
                );
              })
            : CATEGORIES.map((category: Category, index) => (
                <MonthlyBudgetItem
                  category={category}
                  key={index}
                  onChange={(e: string) => handleValues(e, category)}
                />
              ))} */}
          {budgetCategories.map((category: Category, index: number) => (
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
            w="100%"
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
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default EditBudgetScreen;
