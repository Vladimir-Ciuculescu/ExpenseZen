import { NavigationProp, ParamListBase } from "@react-navigation/native";
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
import React, { useLayoutEffect, useState, Fragment } from "react";
import PieChart from "react-native-pie-chart";
import { useSelector } from "react-redux";
import { Expense } from "../interfaces/Expense";
import { RootState } from "../redux/store";
import { GraphCategory } from "../interfaces/GraphCategory";
import GraphCategoryItem from "../components/GraphCategoryItem";
import { StatusBar } from "expo-status-bar";
import { monthTotalSelector } from "../redux/expensesReducers";
import EZHeaderTitle from "../components/shared/EzHeaderTitle";
import { NoChartData } from "../assets/SVG";

interface GraphScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

const GraphScreen: React.FC<GraphScreenProps> = ({ navigation }) => {
  const user = useSelector((state: RootState) => state.user);
  const [graphCategories, setGraphCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [series, setSeries] = useState<any[]>([1]);
  const [colors, setColors] = useState<string[]>(["red"]);
  const { expenses } = useSelector((state: RootState) => state.expenses);
  const monthTotal = useSelector(monthTotalSelector);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <EZHeaderTitle>Graph Reports</EZHeaderTitle>,
    });

    getGeneralInfo();
  }, [navigation]);

  const getGeneralInfo = async () => {
    setLoading(true);

    const categorySummary = expenses!.reduce((acc: any, current: any) => {
      const { name, amount, color } = current;
      if (acc.hasOwnProperty(name)) {
        acc[name].amount += amount;
        acc[name].expenses += 1;
        acc[name].color = color;
      } else {
        acc[name] = { amount, expenses: 1, color };
      }
      return acc;
    }, {});

    if (expenses && expenses.length > 0) {
      const graphCategories = Object.keys(categorySummary).map((category) => ({
        name: category,
        amount: categorySummary[category].amount,
        expenses: categorySummary[category].expenses,
        color: categorySummary[category].color,
      }));

      setGraphCategories(graphCategories);

      setSeries(graphCategories.map((item: Expense) => item.amount));
      setColors(graphCategories.map((item: GraphCategory) => item.color));
    }

    setLoading(false);
  };

  return (
    <View pt={10} flex={1} alignItems="center" flexDirection="column" style={{ gap: 20 }}>
      <StatusBar style="light" />
      <Box
        flexDirection="row"
        justifyContent={expenses && expenses.length > 0 ? "space-between" : "center"}
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
        borderRadius={20}>
        {expenses && expenses.length > 0 ? (
          <Fragment>
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
                      {user.symbol} {monthTotal.toFixed(2)}
                    </Text>
                  </VStack>
                )}
              </View>
            </Box>
            <VStack space={2}>
              <ScrollView flex={1} showsVerticalScrollIndicator={false}>
                <VStack space={2}>
                  {graphCategories.map((graphCategory: GraphCategory, key: number) => {
                    const categoryPercent = (graphCategory.amount * 100) / monthTotal;
                    return (
                      <HStack space={2} alignItems="center" key={key}>
                        <Circle size="10px" style={{ backgroundColor: graphCategory.color }} />
                        <Text fontFamily="SourceBold">
                          {graphCategory.name} ({categoryPercent.toFixed(2)}%)
                        </Text>
                      </HStack>
                    );
                  })}
                </VStack>
              </ScrollView>
            </VStack>
          </Fragment>
        ) : (
          <VStack space="10px">
            <NoChartData height={140} width={200} />
            <Text textAlign="center" fontSize={17} fontFamily="SourceBold">
              No data to display
            </Text>
          </VStack>
        )}
      </Box>

      <FlatList
        w="100%"
        flex={1}
        px={5}
        data={graphCategories}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: any) => item.name}
        ItemSeparatorComponent={() => <View p="10px" />}
        renderItem={({ item }) => (
          <GraphCategoryItem
            expenses={expenses!.filter((expense) => expense.name === item.name)}
            graphCategory={item}
          />
        )}
      />
    </View>
  );
};
export default GraphScreen;
