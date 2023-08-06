import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { Text, VStack } from "native-base";
import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AntDesign } from "@expo/vector-icons";
import MonthlyBudgetItem from "../components/MonthlyBudgetItem";
import { Category } from "../interfaces/Category";
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

  const closeModal = () => {
    navigation.goBack();
  };

  const handleValues = (value: string, category: Category) => {
    const element = budgets.find((item: Budget) => item.category === category.name);

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
    await UserService.saveUserBudgets(user.id, budgets);
    console.log(user.id, budgets);
    dispatch(editBudgetsActions(budgets));
    setButtonLoading(false);
    navigation.goBack();
  };

  const budgetValues: Budget[] = [];

  const budgetCategories = categories!.map((category: Category) => {
    const budget = monthlyBudgets.find((item: Budget) => item.category === category.name);

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
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 30,
              top: 0,
              zIndex: 9999,
            }}
            onPress={closeModal}>
            <AntDesign name="close" color="black" size={24} />
          </TouchableOpacity>
          <Text textAlign="center" fontFamily="SourceBold" fontSize={26}>
            Edit your monthly budgets
          </Text>
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
            height="44px"
            _text={{ fontFamily: "SourceSansPro", fontSize: 17 }}
            _pressed={{
              backgroundColor: COLORS.PURPLE[700],
              opacity: 0.7,
            }}>
            SAVE
          </EZButton>
        </VStack>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default EditBudgetScreen;
