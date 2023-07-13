import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { Text, ScrollView, Pressable, VStack } from "native-base";
import React, { useState, useEffect } from "react";
import { Keyboard, TouchableWithoutFeedback, SafeAreaView } from "react-native";
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

interface EditBudgetScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

const EditBudgetScreen: React.FC<EditBudgetScreenProps> = ({ navigation }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    getInfo();
  }, [navigation]);

  const getInfo = async () => {
    const [categories, budgets] = await Promise.all([
      getCategories(),
      getBudgets(),
    ]);

    setCategories(
      categories!.map((category: Category) => {
        const budget = budgets.find(
          (item: Budget) => item.category === category.name
        );

        return {
          id: category.id,
          name: category.name,
          color: category.color,
          icon: getCategoryIcon(category.name, 24),
          budget: budget ? budget.budget : 0,
        };
      })
    );
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

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1, marginBottom: -100 }}
      showsVerticalScrollIndicator={false}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView flex={1} px={7}>
            <Pressable
              style={{ position: "absolute", right: 10, top: 25, zIndex: 9999 }}
              onPress={closeModal}
            >
              <AntDesign name="close" color="black" size={24} />
            </Pressable>
            <VStack mt={20} space={10}>
              <Text textAlign="center" fontFamily="SourceBold" fontSize={26}>
                Edit monthly budgets
              </Text>
              {categories.map((category: Category, index) => (
                <MonthlyBudgetItem category={category} key={index} />
              ))}
            </VStack>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

export default EditBudgetScreen;
