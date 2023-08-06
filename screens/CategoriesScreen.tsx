import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { View } from "native-base";
import React, { useLayoutEffect } from "react";
import { FlatList } from "react-native";
import CategoryItem from "../components/CategoryItem";
import { useWindowDimensions } from "react-native";
import EZHeaderTitle from "../components/shared/EzHeaderTitle";
import { useSelector } from "react-redux";
import { categoriesSelector } from "../redux/expensesReducers";

interface CategoriesScrennProps {
  navigation: NavigationProp<ParamListBase>;
}

const CategoriesScreen: React.FC<CategoriesScrennProps> = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const categories = useSelector(categoriesSelector);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <EZHeaderTitle>Categories</EZHeaderTitle>,
    });
  }, [navigation]);

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
          renderItem={({ item }) => <CategoryItem disabled={true} category={item} />}
        />
      </View>
    </View>
  );
};
export default CategoriesScreen;
