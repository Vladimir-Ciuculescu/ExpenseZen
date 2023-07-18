import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  Box,
  VStack,
  Circle,
  HStack,
  Skeleton,
  ScrollView,
  FlatList,
} from "native-base";
import React, { useLayoutEffect, useState } from "react";
import PieChart from "react-native-pie-chart";
import { useSelector } from "react-redux";
import { ExpenseService } from "../api/services/ExpenseService";
import { Expense } from "../interfaces/Expense";
import { RootState } from "../redux/store";
import { GraphCategory } from "../interfaces/GraphCategory";
import GraphCategoryItem from "../components/GraphCategory";

interface GraphScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

const GraphScreen: React.FC<GraphScreenProps> = ({ navigation }) => {
  const user = useSelector((state: RootState) => state.user);
  const [total, setTotal] = useState<number>(0);
  const [graphCategories, setGraphCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [series, setSeries] = useState<any[]>([1, 2, 3]);
  const [colors, setColors] = useState<string[]>(["red", "blue", "green"]);

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
        <Text color="muted.50" fontFamily="SourceBold" fontSize={20}>
          Graph Reports
        </Text>
      ),
    });

    getGeneralInfo();
  }, [navigation]);

  const getMonthlyExpenses = async (userId: number) => {
    const expenses = await ExpenseService.getMonthExpenses(userId);
    return expenses;
  };

  const getGeneralInfo = async () => {
    setLoading(true);
    const expenses = await getMonthlyExpenses(user.id);

    const categorySummary = expenses.reduce(
      (acc: any, current: GraphCategory) => {
        const { name, amount, color } = current;
        if (acc.hasOwnProperty(name)) {
          acc[name].amount += amount;
          acc[name].expenses += 1;
          acc[name].color = color;
        } else {
          acc[name] = { amount, expenses: 1, color };
        }
        return acc;
      },
      {}
    );

    const graphCategories = Object.keys(categorySummary).map((category) => ({
      name: category,
      amount: categorySummary[category].amount,
      expenses: categorySummary[category].expenses,
      color: categorySummary[category].color,
    }));

    setGraphCategories(graphCategories);

    setTotal(
      expenses.reduce(
        (accumulator: any, currentValue: Expense) =>
          accumulator + currentValue.amount,
        0
      )
    );

    setSeries(graphCategories.map((item: Expense) => item.amount));
    setColors(graphCategories.map((item: GraphCategory) => item.color));

    setLoading(false);
  };

  return (
    <View
      pt={10}
      flex={1}
      alignItems="center"
      flexDirection="column"
      style={{ gap: 20 }}
    >
      <Box
        flexDirection="row"
        justifyContent="space-between"
        w="90%"
        py={4}
        px={2}
        style={{
          shadowColor: "#171717",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        }}
        bg="muted.50"
        borderRadius={20}
      >
        <Box style={{ alignItems: "center", justifyContent: "center" }}>
          {loading ? (
            <Skeleton style={{ width: 170, height: 170 }} rounded="full" />
          ) : (
            <PieChart
              widthAndHeight={170}
              series={series}
              sliceColor={colors}
              coverRadius={0.75}
              coverFill={"#FFF"}
            />
          )}
          <View position="absolute" alignItems="center" justifyContent="center">
            {!loading && (
              <VStack alignItems="center">
                <Text fontSize={16} fontFamily="SourceBold" color="muted.500">
                  Total
                </Text>
                <Text fontSize={22} fontFamily="SourceBold">
                  {user.symbol} {total}
                </Text>
              </VStack>
            )}
          </View>
        </Box>
        <VStack space={2}>
          <ScrollView flex={1} showsVerticalScrollIndicator={false}>
            <VStack space={2}>
              {loading ? (
                <VStack space={2}>
                  {Array.from(Array(6).keys()).map((_, key) => (
                    <Skeleton
                      mb="3"
                      width="110px"
                      height="10px"
                      rounded="20"
                      key={key}
                    />
                  ))}
                </VStack>
              ) : (
                <>
                  {graphCategories.map((graphCategory: GraphCategory) => {
                    const categoryPercent =
                      (graphCategory.amount * 100) / total;
                    return (
                      <HStack space={2} alignItems="center">
                        <Circle
                          size="10px"
                          style={{ backgroundColor: graphCategory.color }}
                        />
                        <Text fontFamily="SourceBold">
                          {graphCategory.name} ({categoryPercent.toFixed(2)}%)
                        </Text>
                      </HStack>
                    );
                  })}
                </>
              )}
            </VStack>
          </ScrollView>
        </VStack>
      </Box>

      <FlatList
        w="100%"
        flex={1}
        px={5}
        data={graphCategories}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: any) => item.id}
        ItemSeparatorComponent={() => <View p="10px" />}
        renderItem={({ item }) => <GraphCategoryItem graphCategory={item} />}
      />
    </View>
  );
};
export default GraphScreen;
