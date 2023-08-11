import { Box, HStack, Text, VStack } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import { GraphCategory } from "../interfaces/GraphCategory";
import { getCategoryIcon } from "../utils/getCategoryIcon";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import COLORS from "../colors";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../interfaces/Navigation";
import { Expense } from "../interfaces/Expense";

interface GraphCategoryItemProps {
  graphCategory: GraphCategory;
  expenses: any[];
}

const GraphCategoryItem: React.FC<GraphCategoryItemProps> = ({ graphCategory, expenses }) => {
  const { color, name } = graphCategory;

  const user = useSelector((state: RootState) => state.user);
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  const goToCategoryExpenses = () => {
    navigation.navigate("CategoryExpenses", {
      expenses,
      name,
    });
  };

  const amount = expenses.reduce(
    (accumulator: any, currentValue: Expense) => accumulator + currentValue.amount,
    0
  );

  return (
    <TouchableOpacity onPress={goToCategoryExpenses}>
      <HStack alignItems="center" width="100%" justifyContent="space-between">
        <HStack alignItems="center" space={4}>
          <Box
            borderRadius={24}
            width="60px"
            height="60px"
            style={{ backgroundColor: color }}
            justifyContent="center"
            alignItems="center">
            {getCategoryIcon(name, 22, COLORS.MUTED[50])}
          </Box>
          <VStack>
            <Text fontFamily="SourceBold" fontSize={15}>
              {name}
            </Text>
            <Text fontFamily="SourceSansPro" color="muted.500">
              {expenses.length} expenses
            </Text>
          </VStack>
        </HStack>
        <Text fontFamily="SourceBold" fontSize={17}>
          {user.symbol} {amount.toFixed(2)}
        </Text>
      </HStack>
    </TouchableOpacity>
  );
};

export default GraphCategoryItem;
