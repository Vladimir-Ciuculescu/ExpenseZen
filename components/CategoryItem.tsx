import React from "react";
import { Box, HStack, Pressable, Text } from "native-base";
import { Category } from "../interfaces/Category";
import { getCategoryIcon } from "../utils/getCategoryIcon";
import { AntDesign } from "@expo/vector-icons";
import COLORS from "../colors";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface CategoryItemProps {
  category: Category;
  selectCategory?: (e: string) => void;
  selectedCategory?: string;
  disabled: boolean;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  selectCategory,
  selectedCategory,
  disabled,
}) => {
  const user: any = useSelector((state: RootState) => state.user);

  const { name, color } = category;

  const isSelected = selectedCategory === name;

  return (
    <Pressable
      disabled={disabled}
      onPress={() => selectCategory!(name)}
      _pressed={{ opacity: 0.4 }}
      marginX={3}
      flex={1}
      width="175px"
      onStartShouldSetResponder={() => true}
      borderColor={isSelected ? COLORS.EMERALD[400] : "muted.100"}
      borderWidth={user.theme === "dark" ? 0 : 1.5}
      height={65}
      bg="muted.50"
      style={{
        shadowColor: "#171717",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }}
      borderRadius={20}
      px={2}>
      <HStack flex={1} space={3} alignItems="center" justifyContent="flex-start">
        <Box
          width="45px"
          height="45px"
          backgroundColor={color}
          borderRadius={18}
          justifyContent="center"
          alignItems="center">
          {getCategoryIcon(name, 24, COLORS.MUTED[50])}
        </Box>
        <Text fontFamily="SourceBold" style={{ flex: 1 }} fontSize={17}>
          {name}
        </Text>
      </HStack>
      {isSelected && (
        <Box position="absolute" right="-5px" bottom="-5px" bg="muted.100" borderRadius={20}>
          <AntDesign name="checkcircle" size={24} color={COLORS.EMERALD[400]} />
        </Box>
      )}
    </Pressable>
  );
};

export default CategoryItem;
