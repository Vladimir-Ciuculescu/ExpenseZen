import { Box, Text, useTheme, VStack } from "native-base";
import React from "react";
import { Category } from "../interfaces/Category";
import { getCategoryIcon } from "../utils/getCategoryIcon";
import { useNavigation } from "@react-navigation/native";
import { Expense } from "../interfaces/Expense";
import { TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../interfaces/Navigation";

interface TopSpendingCategoryProps {
  item: Category;
  expenses: Expense[];
}

const TopSpendingCategory: React.FC<TopSpendingCategoryProps> = ({ item, expenses }) => {
  const { name, color } = item;
  const {
    colors: { muted },
  } = useTheme();

  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  const goToCategoryExpenses = () => {
    navigation.navigate("CategoryExpenses", {
      expenses,
      name,
    });
  };

  return (
    <TouchableOpacity onPress={goToCategoryExpenses}>
      <VStack alignItems="center" space={3}>
        <Box
          style={{ backgroundColor: color }}
          width="85px"
          height="85px"
          bg="red.400"
          justifyContent="center"
          alignItems="center"
          borderRadius={22}>
          {getCategoryIcon(name, 32, muted[50])}
        </Box>
        <Text fontFamily="SourceBold">{name}</Text>
      </VStack>
    </TouchableOpacity>
  );
};

export default TopSpendingCategory;
