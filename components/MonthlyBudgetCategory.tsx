import { Box, HStack, Text, VStack } from "native-base";
import React from "react";
import { getCategoryIcon } from "../utils/getCategoryIcon";
import EZProgress from "./shared/EZProgress";

const MonthlyBudgetCategory: React.FC<any> = ({ category }) => {
  const { name, color } = category;

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
            {getCategoryIcon(name, 24)}
          </Box>
          <Text fontFamily="SourceBold" fontSize={18}>
            {name}
          </Text>
        </HStack>

        <VStack>
          <Text>20$</Text>
          <EZProgress height="25px" steps={10} step={3} color={color} />
        </VStack>
      </VStack>
    </Box>
  );
};

export default MonthlyBudgetCategory;
