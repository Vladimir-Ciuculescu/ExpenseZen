import { Box, HStack, Text } from "native-base";
import React, { useState } from "react";

import EZInput from "./shared/EZInput";
import { Category } from "../interfaces/Category";
import { authInput } from "../commonStyles";

interface MonthlyBudgetItemProps {
  category: Category;
  onChange: (e: string) => void;
}

const MonthlyBudgetItem: React.FC<MonthlyBudgetItemProps> = ({ category, onChange }) => {
  const { color, icon, name, budget } = category;

  const [amount, setAmount] = useState<string>(budget!.toString().replace(".", ","));

  const handleChange = (e: string) => {
    setAmount(e);
    onChange(e);
  };

  return (
    <HStack alignItems="center" justifyContent="space-between">
      <HStack alignItems="center" space={4}>
        <Box
          borderRadius={22}
          width="60px"
          height="60px"
          style={{ backgroundColor: color }}
          justifyContent="center"
          alignItems="center">
          {icon}
        </Box>
        <Text>{name}</Text>
      </HStack>
      <EZInput
        style={{ ...authInput, fontSize: 18 }}
        formHeight="45px"
        flex={1}
        keyboardType="decimal-pad"
        type="text"
        width="140px"
        value={amount}
        onChangeText={(e: string) => handleChange(e)}
        borderRadius={12}
        borderColor="muted.200"
        alignItems="flex-end"
      />
    </HStack>
  );
};

export default MonthlyBudgetItem;
