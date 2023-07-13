import { Box, HStack, Text } from "native-base";
import React, { useState } from "react";

import EZInput from "./shared/EZInput";
import { Category } from "../interfaces/Category";

interface MonthlyBudgetItemProps {
  category: Category;
}

const MonthlyBudgetItem: React.FC<MonthlyBudgetItemProps> = ({ category }) => {
  const { color, icon, name, budget } = category;

  const [amount, setAmount] = useState<string>(budget!.toString());

  return (
    <HStack alignItems="center" justifyContent="space-between">
      <HStack alignItems="center" space={4}>
        <Box
          borderRadius={22}
          width="60px"
          height="60px"
          style={{ backgroundColor: color }}
          justifyContent="center"
          alignItems="center"
        >
          {icon}
        </Box>
        <Text>{name}</Text>
      </HStack>
      <EZInput
        flex={1}
        keyboardType="decimal-pad"
        type="text"
        width="140px"
        value={amount}
        onChangeText={setAmount}
        //value={values.amount}
        //onChangeText={(e: string) => handleValue("amount", e)}
        fontSize={22}
        color="purple.700"
        pl={5}
        fontFamily="SourceSansPro"
        borderRadius={8}
        // focusOutlineColor={
        //   touched.amount && errors.amount ? "red.500" : "purple.700"
        // }
        height="45px"
        borderColor="muted.300"
        placeholderTextColor="muted.300"
        _focus={{
          backgroundColor: "transparent",
          color: "purple.700",
          placeholderTextColor: "purple.700",
        }}
        alignItems="flex-end"
        //error={touched.amount && errors.amount}
      />
      {/* <Input width={"180px"} /> */}
    </HStack>
  );
};

export default MonthlyBudgetItem;
