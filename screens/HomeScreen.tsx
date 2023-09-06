import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
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
import { TouchableOpacity, useWindowDimensions } from "react-native";
import { NavigationProp, ParamListBase, useIsFocused } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { TAB_BAR_HEIGHT } from "../constants/NavigationConstants";
import { ExpenseService } from "../api/services/ExpenseService";
import { useDispatch, useSelector } from "react-redux";
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
import { StatusBar } from "expo-status-bar";
import {
  monthlyBudgetsSelector,
  monthTotalSelector,
  setBudgetsAction,
  setCategoriesAction,
  setExpensesAction,
  todayTotalSelector,
  topSpedingCategoriesSelector,
} from "../redux/expensesReducers";
import { LinearGradient } from "expo-linear-gradient";
import { MONTHS } from "../constants/Months";
import moment from "moment";
import { setMonthAction } from "../redux/userReducer";
import { MONTH_ITEM_WIDTH } from "../constants/Sizes";

interface HomeScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { width } = useWindowDimensions();

  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const { expenses } = useSelector((state: RootState) => state.expenses);
  const todayTotal = useSelector(todayTotalSelector);
  const monthTotal = useSelector(monthTotalSelector);
  const topSpendingCategories = useSelector(topSpedingCategoriesSelector);
  const monthlyBudgets = useSelector(monthlyBudgetsSelector);
  const monthsScrollRef = useRef<any>(null);

  const user: any = useSelector((state: RootState) => state.user);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <View style={{ height: 128 }}>
          <LinearGradient
            colors={
              user.theme === "light"
                ? [COLORS.PURPLE[900], COLORS.PURPLE[600]]
                : ["#111827", "#111827"]
            }
            style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}>
            <VStack space={3}>
              {loading ? (
                <HStack alignItems="center" justifyContent="center">
                  <Skeleton h="5" w={20} rounded="full" startColor="indigo.300" />
                </HStack>
              ) : (
                <HStack space="1" alignItems="center" justifyContent="center">
                  <Text fontFamily="SourceBold" color="muted.100" fontSize={20}>
                    Today:
                  </Text>
                  <Text fontFamily="SourceBold" color="muted.100" fontSize={20}>
                    {user.symbol} {todayTotal.toFixed(2)}
                  </Text>
                </HStack>
              )}
              <Box marginBottom={0.2}>
                <ScrollView
                  ref={monthsScrollRef}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  {MONTHS.map((month, index) => {
                    return (
                      <Box
                        key={index}
                        w={`${MONTH_ITEM_WIDTH}px`}
                        justifyContent="center"
                        alignItems="center"
                        borderBottomColor={user.theme === "dark" ? "purple.700" : "muted.50"}
                        borderBottomWidth={user.month === month ? 3.5 : 0}
                        paddingBottom={2}>
                        <TouchableOpacity onPress={() => selectMonth(month, index)}>
                          <Text
                            fontSize={17}
                            fontFamily="SourceBold"
                            _light={{ color: user.month === month ? "muted.50" : "muted.400" }}
                            _dark={{ color: user.month === month ? "muted.900" : "muted.400" }}
                            paddingX={4}>
                            {month}
                          </Text>
                        </TouchableOpacity>
                      </Box>
                    );
                  })}
                </ScrollView>
              </Box>
            </VStack>
          </LinearGradient>
        </View>
      ),
    });
    const unsubscribe = navigation.addListener("focus", () => {
      setTimeout(() => {
        getMonthIndex();
      }, 500);
    });
    getMonthIndex();
    return unsubscribe;
  }, [navigation, todayTotal, loading, user.month]);

  useEffect(() => {
    if (!expenses.length) {
      getGeneralInfo();
    }
  }, [user]);

  const getMonthIndex = () => {
    const monthIndex = MONTHS.findIndex((month: string) => month === user.month);
    if (monthsScrollRef.current) {
      monthsScrollRef.current.scrollTo({
        x: monthIndex * MONTH_ITEM_WIDTH - width / 2 + MONTH_ITEM_WIDTH / 2,
        y: 0,
        animated: true,
      });
    }
  };

  const getAllCategories = async () => {
    const cateogries = await CategoryService.getAllCategories();
    return cateogries!.map((category: Category) => {
      return {
        id: category.id,
        name: category.name,
        color: category.color,
      };
    });
  };

  const getMonthlyBudgets = async (userId: number) => {
    const budgets = await UserService.getUserBudgets(userId);

    return budgets;
  };

  const parsedMonth = moment(user.month, "MMMM");
  const monthNumber = parsedMonth.month();
  const startOfMonth = moment().month(monthNumber).startOf("month").format("YYYY-MM-DD");
  const endOfMonth = moment().month(monthNumber).endOf("month").format("YYYY-MM-DD");

  const getMonthlyExpenses = async (userId: number, startOfMonth: string, endOfMonth: string) => {
    const expenses = await ExpenseService.getMonthExpenses(userId, startOfMonth, endOfMonth);
    return expenses;
  };

  const getGeneralInfo = async () => {
    setLoading(true);

    const [categories, budgets, expenses] = await Promise.all([
      getAllCategories(),
      getMonthlyBudgets(user.id),
      getMonthlyExpenses(user.id, startOfMonth, endOfMonth),
    ]);

    dispatch(setCategoriesAction(categories));
    dispatch(setBudgetsAction(budgets.filter((item: Budget) => item.budget !== 0)));
    dispatch(setExpensesAction(expenses));

    setLoading(false);
  };

  const getCategoryMonthlyTotal = (category: string) => {
    const categoryExpenses = expenses.filter((item) => item.name === category);
    return categoryExpenses.reduce(
      (accumulator: any, currentValue: Expense) => accumulator + currentValue.amount,
      0
    );
  };

  const openAddExpenseModal = () => {
    navigation.navigate("AddExpense");
  };

  const openEditBudgetsModal = () => {
    navigation.navigate("EditBudgets");
  };

  const selectMonth = async (month: string, index: number) => {
    dispatch(setMonthAction(month));
    monthsScrollRef.current.scrollTo({
      x: index * MONTH_ITEM_WIDTH - width / 2 + MONTH_ITEM_WIDTH / 2,
      y: 0,
      animated: true,
    });

    const parsedMonth = moment(month, "MMMM");
    if (parsedMonth.isValid()) {
      const monthNumber = parsedMonth.month();
      const startOfMonth = moment().month(monthNumber).startOf("month").format("YYYY-MM-DD");
      const endOfMonth = moment().month(monthNumber).endOf("month").format("YYYY-MM-DD");
      setLoading(true);
      const expenses = await getMonthlyExpenses(user.id, startOfMonth, endOfMonth);
      dispatch(setExpensesAction(expenses));
      dispatch(setMonthAction(parsedMonth.format("MMMM")));
      setLoading(false);
    }
  };

  return (
    <View flex={1}>
      <StatusBar style="light" />
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
                py={3}>
                <Text fontFamily="SourceSansPro" color="muted.400" fontSize={20}>
                  {user.month}
                </Text>
                {loading ? (
                  <Skeleton mt={5} mb={3} h="5" width={20} rounded="full" startColor="indigo.300" />
                ) : (
                  <Text fontFamily="SourceBold" fontSize={35}>
                    {user.symbol} {monthTotal.toFixed(2)}
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
                    icon={<Icon color="white" size={26} as={<AntDesign name="plus" />} />}
                  />
                )}
              </Box>
            </VStack>
            <VStack space={4}>
              <Text fontFamily="SourceBold" fontSize={25}>
                Top Spending
              </Text>
              {topSpendingCategories.length !== 0 ? (
                <FlatList
                  mx={-7}
                  contentContainerStyle={{ paddingHorizontal: 28 }}
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View p="10px" />}
                  horizontal={true}
                  data={topSpendingCategories}
                  keyExtractor={(item: any) => item.id}
                  renderItem={({ item }) => (
                    <TopSpendingCategory
                      expenses={expenses.filter((expense) => expense.name === item.name)}
                      item={item}
                    />
                  )}
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
                      _pressed={{ opacity: 0.4 }}
                      onPress={openEditBudgetsModal}
                      leftIcon={
                        <MaterialCommunityIcons
                          name="lead-pencil"
                          size={22}
                          color={COLORS.PURPLE[700]}
                        />
                      }>
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
                      leftIcon={<Feather name="plus" size={22} color={COLORS.PURPLE[700]} />}>
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
    </View>
  );
};
export default HomeScreen;
