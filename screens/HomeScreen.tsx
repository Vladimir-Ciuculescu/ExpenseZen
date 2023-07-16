import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  Box,
  VStack,
  Fab,
  Icon,
  Skeleton,
  HStack,
  FlatList,
  ScrollView,
} from "native-base";
import {
  NavigationProp,
  ParamListBase,
  useIsFocused,
} from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { TAB_BAR_HEIGHT } from "../constants/NavigationConstants";
import { ExpenseService } from "../api/services/ExpenseService";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import TopSpendingCategory from "../components/TopSpendingCategory";
import { Category } from "../interfaces/Category";
import { CategoryService } from "../api/services/CategoryService";
import EZButton from "../components/shared/EZButton";
import { NoData, SetBudget } from "../assets/SVG";
import MonthlyBudgetCategory from "../components/MonthlyBudgetCategory";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import COLORS from "../colors";
import { UserService } from "../api/services/UserService";
import { Budget } from "../interfaces/Budget";
import { Expense } from "../interfaces/Expense";

interface HomeScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState<boolean>(false);
  const [todayTotal, setTodayTotal] = useState<number>(0);
  const [monthTotal, setMonthTotal] = useState<number>(0);
  const [topCategories, setTopCategories] = useState<Category[]>([]);
  const [monthlyBudgets, setMonthlyBudgets] = useState<Budget[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

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
                {user.symbol} {todayTotal}
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

    return categories;
  };

  const getMonthlyBudgets = async (userId: number) => {
    const budgets = await UserService.getUserBudgets(userId);

    return budgets;
  };

  const getMonthlyExpenses = async (userId: number) => {
    const expenses = await ExpenseService.getMonthExpenses(userId);
    return expenses;
  };

  const getGeneralInfo = async () => {
    setLoading(true);

    const [todayTotal, categories, budgets, expenses] = await Promise.all([
      getTodayTotal(),
      getTopSpendingCategories(user.id),
      getMonthlyBudgets(user.id),
      getMonthlyExpenses(user.id),
    ]);

    setTodayTotal(todayTotal);
    setMonthTotal(
      expenses.reduce(
        (accumulator: any, currentValue: Expense) =>
          accumulator + currentValue.amount,
        0
      )
    );
    setTopCategories(categories);
    setMonthlyBudgets(budgets.filter((item: Budget) => item.budget !== 0));
    setExpenses(expenses);
    setLoading(false);
  };

  const getCategoryMonthlyTotal = (category: string) => {
    const categoryExpenses = expenses.filter((item) => item.name === category);
    return categoryExpenses.reduce(
      (accumulator: any, currentValue: Expense) =>
        accumulator + currentValue.amount,
      0
    );
  };

  const openAddExpenseModal = () => {
    navigation.navigate("AddExpense");
  };

  const openEditBudgetsModal = () => {
    navigation.navigate("EditBudgets");
  };

  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });

  return (
    <ScrollView flex={1} showsVerticalScrollIndicator={false}>
      <View flex={1} pt={10} px={7}>
        <VStack space={8}>
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
                  {user.symbol} {monthTotal}
                </Text>
              )}
              {isFocused && (
                <Fab
                  onPress={openAddExpenseModal}
                  width="56px"
                  height="56px"
                  right={"20px"}
                  _pressed={{ bg: "purple.600" }}
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
            {topCategories.length !== 0 ? (
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
            ) : (
              <HStack justifyContent="center">
                <VStack alignItems="center" space={2}>
                  <NoData width={85} height={85} />
                  <Text fontSize={20} fontFamily="SourceSansPro">
                    No spendings yet
                  </Text>
                </VStack>
              </HStack>
            )}
          </VStack>
          <VStack>
            <VStack space={4}>
              <HStack justifyContent="space-between">
                <Text fontFamily="SourceBold" fontSize={25}>
                  Monthly Budget
                </Text>
                {monthlyBudgets.length > 0 ? (
                  <EZButton
                    _text={{
                      fontFamily: "SourceBold",
                      color: COLORS.PURPLE[700],
                      fontSize: 17,
                    }}
                    variant="unstyled"
                    onPress={openEditBudgetsModal}
                    leftIcon={
                      <MaterialCommunityIcons
                        name="lead-pencil"
                        size={22}
                        color={COLORS.PURPLE[700]}
                      />
                    }
                  >
                    Edit
                  </EZButton>
                ) : (
                  <EZButton
                    _text={{
                      fontFamily: "SourceBold",
                      color: COLORS.PURPLE[700],
                      fontSize: 17,
                    }}
                    variant="unstyled"
                    onPress={openEditBudgetsModal}
                    leftIcon={
                      <Feather
                        name="plus"
                        size={22}
                        color={COLORS.PURPLE[700]}
                      />
                    }
                  >
                    Add
                  </EZButton>
                )}
              </HStack>

              {monthlyBudgets.length > 0 ? (
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  mx={-7}
                  style={{ paddingTop: 5, paddingBottom: 10 }}
                  contentContainerStyle={{ paddingHorizontal: 28 }}
                  ItemSeparatorComponent={() => <View p="10px" />}
                  horizontal={true}
                  data={monthlyBudgets}
                  keyExtractor={(item: any) => item.id}
                  renderItem={({ item }) => (
                    <MonthlyBudgetCategory
                      budget={item}
                      monthlyTotal={getCategoryMonthlyTotal(item.category!)}
                    />
                  )}
                />
              ) : (
                <VStack alignItems="center" space={2}>
                  <SetBudget width={180} height={120} />
                  <Text fontSize={20} fontFamily="SourceSansPro">
                    No budgets set yet
                  </Text>
                </VStack>
              )}
            </VStack>
          </VStack>
        </VStack>
      </View>
    </ScrollView>
  );
};
export default HomeScreen;
