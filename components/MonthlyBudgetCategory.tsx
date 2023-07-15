import { Box, HStack, Text, VStack } from "native-base";
import React from "react";
import { getCategoryIcon } from "../utils/getCategoryIcon";
import EZProgress from "./shared/EZProgress";
import { Category } from "../interfaces/Category";
import { Budget } from "../interfaces/Budget";

interface MonthlyBudgetCategoryProps {
  budget: Budget;
}

const MonthlyBudgetCategory: React.FC<MonthlyBudgetCategoryProps> = ({
  budget,
}) => {
  const { budget: amount, category, color } = budget;

  return (
    <Box
      width="265px"
      height="145px"
      style={{
        shadowColor: "#171717",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }}
      bg="muted.50"
      borderRadius={20}
    >
      <VStack flex={1} p={4} justifyContent="space-between">
        <HStack space={3} alignItems="center">
          <Box
            borderRadius={22}
            width="60px"
            height="60px"
            style={{ backgroundColor: color }}
            justifyContent="center"
            alignItems="center"
          >
            {getCategoryIcon(category, 24)}
          </Box>
          <Text fontFamily="SourceBold" fontSize={18}>
            {category}
          </Text>
        </HStack>

        <VStack>
          <Text>{amount}$</Text>
          <EZProgress height="25px" steps={10} step={3} color={color} />
        </VStack>
      </VStack>
    </Box>
  );
};

export default MonthlyBudgetCategory;
