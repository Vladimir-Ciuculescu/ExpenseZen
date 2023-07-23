import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { View, Text, ScrollView } from "native-base";
import React, { useLayoutEffect, useState } from "react";
import { Category } from "../interfaces/Category";
import { CategoryService } from "../api/services/CategoryService";
import { getCategoryIcon } from "../utils/getCategoryIcon";
import { FlatList } from "react-native";
import CategoryItem from "../components/CategoryItem";
import { useWindowDimensions } from "react-native";

interface CategoriesScrennProps {
  navigation: NavigationProp<ParamListBase>;
}

const CategoriesScreen: React.FC<CategoriesScrennProps> = ({ navigation }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const { width } = useWindowDimensions();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackground: () => (
        <LinearGradient
          colors={["#8E2DE2", "#4A00E0"]}
          style={{ flex: 1 }}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
      ),
      headerTitle: () => (
        <Text fontFamily="SourceBold" color="muted.100" fontSize={20}>
          Categories
        </Text>
      ),
    });

    getCategories();
  }, [navigation]);

  const getCategories = async () => {
    const categories = await CategoryService.getAllCategories();
    setCategories(
      categories!.map((category: Category) => {
        return {
          id: category.id,
          name: category.name,
          color: category.color,
          icon: getCategoryIcon(category.name, 24),
        };
      })
    );
  };

  return (
    <View>
      <StatusBar style="light" />

      <View alignItems="center" mt={10}>
        <FlatList
          style={{
            width: width - 50,
            paddingTop: 5,
            paddingBottom: 5,
          }}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View margin={4} />}
          data={categories}
          renderItem={({ item }) => (
            <CategoryItem
              //selectedCategory={values.category}
              category={item}
              //selectCategory={selectCategory}
            />
          )}
        />
      </View>
    </View>
  );
};
export default CategoriesScreen;
