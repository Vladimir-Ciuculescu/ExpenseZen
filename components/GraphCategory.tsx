import { Box, HStack, Text, VStack } from "native-base";
import React from "react";
import { GraphCategory } from "../interfaces/GraphCategory";
import { getCategoryIcon } from "../utils/getCategoryIcon";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface GraphCategoryItemProps {
  graphCategory: GraphCategory;
}

const GraphCategoryItem: React.FC<GraphCategoryItemProps> = ({
  graphCategory,
}) => {
  const { amount, color, name, expenses } = graphCategory;

  const user = useSelector((state: RootState) => state.user);

  return (
    <HStack alignItems="center" width="100%" justifyContent="space-between">
      <HStack alignItems="center" space={4}>
        <Box
          borderRadius={24}
          width="60px"
          height="60px"
          style={{ backgroundColor: color }}
          justifyContent="center"
          alignItems="center"
        >
          {getCategoryIcon(name, 22)}
        </Box>
        <VStack>
          <Text fontFamily="SourceBold" fontSize={15}>
            {name}
          </Text>
          <Text fontFamily="SourceSansPro" color="muted.500">
            {expenses} expenses
          </Text>
        </VStack>
      </HStack>
      <Text fontFamily="SourceBold" fontSize={17}>
        {user.symbol}
        {amount}
      </Text>
    </HStack>
  );
};

export default GraphCategoryItem;
