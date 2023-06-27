import {
  Box,
  Button,
  FormControl,
  HStack,
  Input,
  Pressable,
  Text,
  VStack,
  View,
  WarningOutlineIcon,
} from "native-base";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import EZInput from "../components/shared/EZInput";
import { CategoryService } from "../api/services/CategoryService";
import { FontAwesome } from "@expo/vector-icons";
import { Category } from "../interfaces/Category";
import { getCategoryIcon } from "../utils/getCategoryIcon";
import CategoryItem from "../components/CategoryItem";

interface AddExpenseScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

const AddExpenseScreen: React.FC<AddExpenseScreenProps> = ({ navigation }) => {
  const [amount, setAmount] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const { width } = useWindowDimensions();

  useLayoutEffect(() => {
    const getCategories = async () => {
      const data = await CategoryService.getAllCategories();

      setCategories(
        data!.map((category: Category) => {
          return {
            name: category.name,
            color: category.color,
            icon: getCategoryIcon(category.name),
          };
        })
      );
    };

    getCategories();
  }, [navigation]);

  useEffect(() => {
    console.log(categories);
  }, [categories]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={{ flex: 1 }}>
        <Pressable
          style={{ position: "absolute", right: 40, top: 64, zIndex: 9999 }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="close" size={24} color="black" />
        </Pressable>
        <View
          flex={1}
          pt={20}
          alignItems="center"
          justifyContent="space-between"
        >
          <VStack space={4} alignItems="center" width="100%" px={12}>
            <Text fontFamily="SourceBold" fontSize={35}>
              Add new expense
            </Text>
            <FormControl w={"100%"}>
              <FormControl.Label>
                <Text fontFamily="SourceSansPro" fontSize={20}>
                  Enter amount
                </Text>
              </FormControl.Label>

              <EZInput
                type="text"
                value={amount}
                onChangeText={setAmount}
                placeholder="$"
                fontSize={22}
                color="purple.700"
                pl={5}
                fontFamily="SourceSansPro"
                textAlign="center"
                borderRadius={8}
                focusOutlineColor="purple.700"
                height="55px"
                borderColor="muted.300"
                placeholderTextColor="muted.300"
                _focus={{
                  backgroundColor: "transparent",
                  color: "purple.700",
                  placeholderTextColor: "purple.700",
                }}
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                Try different from previous passwords.
              </FormControl.ErrorMessage>
            </FormControl>
            <Text
              alignSelf="flex-start"
              fontFamily="SourceSansPro"
              fontSize={20}
            >
              Category
            </Text>
          </VStack>

          <FlatList
            style={{ width: width - 50 }}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View margin={3} />}
            data={categories}
            renderItem={({ item }) => <CategoryItem category={item} />}
          />

          <Button>Add</Button>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default AddExpenseScreen;
