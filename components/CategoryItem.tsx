import React from "react";
import { Box, HStack, Text } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { Category } from "../interfaces/Category";
import { getCategoryIcon } from "../utils/getCategoryIcon";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category }) => {
  const { name, color } = category;

  console.log(name);

  return (
    <HStack
      marginX={3}
      flex={1}
      width="175px"
      onStartShouldSetResponder={() => true}
      height={65}
      bg="muted.100"
      space={3}
      style={{
        shadowColor: "#171717",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }}
      borderRadius={20}
      alignItems="center"
      justifyContent="flex-start"
      px={2}
    >
      <Box
        width="45px"
        height="45px"
        //bg="red.400"
        backgroundColor={color}
        borderRadius={18}
        justifyContent="center"
        alignItems="center"
      >
        {getCategoryIcon(name)}
      </Box>
      <Text fontFamily="SourceBold" style={{ flex: 1 }} fontSize={17}>
        {name}
      </Text>
    </HStack>
  );
};

export default CategoryItem;
