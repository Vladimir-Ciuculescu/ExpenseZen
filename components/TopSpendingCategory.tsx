import { Box, Pressable, Text, VStack } from "native-base";
import React from "react";
import { Category } from "../interfaces/Category";
import { getCategoryIcon } from "../utils/getCategoryIcon";
import { useNavigation } from "@react-navigation/native";

interface TopSpendingCategoryProps {
  item: Category;
}

const TopSpendingCategory: React.FC<TopSpendingCategoryProps> = ({ item }) => {
  const { name, color, id } = item;

  const navigation = useNavigation();

  const goToCategoryExpenses = () => {
    // @ts-ignore
    navigation.navigate("CategoryExpenses", { category: name, categoryId: id });
  };

  return (
    <Pressable onPress={goToCategoryExpenses}>
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
    </Pressable>
  );
};

export default TopSpendingCategory;
