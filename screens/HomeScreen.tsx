import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  Box,
  Progress,
  VStack,
  Fab,
  Icon,
  Skeleton,
  HStack,
  FlatList,
} from "native-base";
import {
  NavigationProp,
  ParamListBase,
  useIsFocused,
} from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { TAB_BAR_HEIGHT } from "../constants";
import { ExpenseService } from "../api/services/ExpenseService";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import TopSpendingCategory from "../components/TopSpendingCategory";
import { Category } from "../interfaces/Category";
import { CategoryService } from "../api/services/CategoryService";

interface HomeScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState<boolean>(false);
  const [todayTotal, setTodayTotal] = useState<number>(0);
  const [monthTotal, setMonthTotal] = useState<number>(0);
  const [topCategories, setTopCategories] = useState<Category[]>([]);
  const user = useSelector((state: RootState) => state.user);

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
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <HStack space="1" alignItems="center">
            <Text fontFamily="SourceBold" color="muted.100" fontSize={20}>
              Today:
            </Text>
            {loading ? (
              <Skeleton
                h="3"
                width={10}
                rounded="full"
                startColor="indigo.300"
              />
            ) : (
              <Text fontFamily="SourceBold" color="muted.100" fontSize={20}>
                {user.symbol}
                {todayTotal}
              </Text>
            )}
          </HStack>
        </View>
      ),
    });
  }, [navigation, todayTotal, loading]);

  useEffect(() => {
    if (isFocused) {
      getGeneralInfo();
    }
  }, [isFocused]);

  const getTodayTotal = async () => {
    const todayTotal = await ExpenseService.getTodayTotalExpenses(
      Number(user.id)
    );
    return todayTotal;
  };

  const getMonthTotal = async () => {
    const monthTotal = await ExpenseService.getMonthTotalExpenses(
      Number(user.id)
    );
    return monthTotal;
  };

  const getTopSpendingCategories = async (userId: number) => {
    const categories = await CategoryService.getTopSpendingCategories(userId);

    console.log(categories);

    return categories;
  };

  const getGeneralInfo = async () => {
    setLoading(true);

    const [todayTotal, monthTotal, categories] = await Promise.all([
      getTodayTotal(),
      getMonthTotal(),
      getTopSpendingCategories(user.id),
    ]);

    setTodayTotal(todayTotal);
    setMonthTotal(monthTotal);
    setTopCategories(categories);

    setLoading(false);
  };

  const openAddExpenseModal = () => {
    navigation.navigate("AddExpense");
  };

  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });

  return (
    <View flex={1} pt={10} px={7}>
      <VStack space={10}>
        <VStack space={3}>
          <Text fontFamily="SourceBold" fontSize={25}>
            Monthly costs
          </Text>

          <Box
            alignSelf="center"
            bg="muted.50"
            width="100%"
            shadow={2}
            borderRadius={10}
            px={5}
            py={3}
          >
            <Text fontFamily="SourceSansPro" color="muted.400" fontSize={20}>
              {currentMonth}
            </Text>
            {loading ? (
              <Skeleton
                mt={5}
                mb={3}
                h="5"
                width={20}
                rounded="full"
                startColor="indigo.300"
              />
            ) : (
              <Text fontFamily="SourceBold" color="muted.900" fontSize={35}>
                {user.symbol}
                {monthTotal}
              </Text>
            )}
            {/* <Progress value={10} /> */}
            {isFocused && (
              <Fab
                onPress={openAddExpenseModal}
                width="56px"
                height="56px"
                right={"20px"}
                bg="purple.700"
                bottom={`${TAB_BAR_HEIGHT + 20}px`}
                icon={
                  <Icon
                    color="white"
                    size={26}
                    as={<AntDesign name="plus" />}
                  />
                }
              />
            )}
          </Box>
        </VStack>
        <VStack space={4}>
          <Text fontFamily="SourceBold" fontSize={25}>
            Top Spending
          </Text>
          <FlatList
            mx={-7}
            contentContainerStyle={{ paddingHorizontal: 28 }}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View p="10px" />}
            horizontal={true}
            data={topCategories}
            keyExtractor={(item: any) => item.id}
            renderItem={({ item }) => <TopSpendingCategory item={item} />}
          />
        </VStack>
      </VStack>
    </View>
  );
};
export default HomeScreen;
