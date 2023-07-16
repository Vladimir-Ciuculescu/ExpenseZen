import { Box, HStack, Text, VStack } from "native-base";
import React from "react";
import { getCategoryIcon } from "../utils/getCategoryIcon";
import EZProgress from "./shared/EZProgress";
import { Budget } from "../interfaces/Budget";
import { AntDesign } from "@expo/vector-icons";
import COLORS from "../colors";

interface MonthlyBudgetCategoryProps {
  budget: Budget;
  monthlyTotal: number;
}

const MonthlyBudgetCategory: React.FC<MonthlyBudgetCategoryProps> = ({
  budget,
  monthlyTotal,
}) => {
  const { budget: amount, category, color } = budget;

  const isAlmostExceeded = () => {
    const threshold = (amount * 75) / 100;

    return monthlyTotal > threshold;
  };

  return (
    <Box
      width="265px"
      height="165px"
      style={{
        shadowColor: "#171717",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }}
      bg="muted.50"
      borderRadius={20}
    >
      <VStack
        flex={1}
        pt={4}
        pl={4}
        pr={4}
        space={3}
        //justifyContent="space-between"
      >
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
          <Text>
            {monthlyTotal}$ / {amount}$
          </Text>
          <EZProgress
            height="20px"
            max={amount}
            value={monthlyTotal}
            color={color}
          />
        </VStack>
      </VStack>
      {isAlmostExceeded() && (
        <HStack pb={2} pl={4} alignItems="center" space={2}>
          <AntDesign
            name="exclamationcircle"
            size={15}
            color={COLORS.DANGER[500]}
          />
          <Text>Almost exceeded</Text>
        </HStack>
      )}
    </Box>
  );
};

export default MonthlyBudgetCategory;
