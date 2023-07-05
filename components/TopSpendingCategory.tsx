import { Box, Text, VStack } from "native-base";
import React from "react";
import { Category } from "../interfaces/Category";
import { getCategoryIcon } from "../utils/getCategoryIcon";

interface TopSpendingCategoryProps {
  item: Category;
}

const TopSpendingCategory: React.FC<TopSpendingCategoryProps> = ({ item }) => {
  const { name, color, id } = item;

  return (
    <VStack alignItems="center" space={3}>
      <Box
        style={{ backgroundColor: color }}
        width="85px"
        height="85px"
        bg="red.400"
        justifyContent="center"
        alignItems="center"
        borderRadius={22}
      >
        {getCategoryIcon(name, 32)}
      </Box>
      <Text fontFamily="SourceBold">{name}</Text>
    </VStack>
  );
};

export default TopSpendingCategory;
