import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, Box, VStack, Circle, HStack } from "native-base";
import React, { useLayoutEffect, useState } from "react";
import { useWindowDimensions } from "react-native";
import PieChart from "react-native-pie-chart";
import { useSelector } from "react-redux";
import { ExpenseService } from "../api/services/ExpenseService";
import { Expense } from "../interfaces/Expense";
import { RootState } from "../redux/store";

interface GraphScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

const GraphScreen: React.FC<GraphScreenProps> = ({ navigation }) => {
  const user = useSelector((state: RootState) => state.user);
  const [total, setTotal] = useState<number>(0);
  const [graphCategories, setGraphCategories] = useState<any[]>([]);

  const series = [123, 321, 123, 789, 537];
  const sliceColor = ["#fbd203", "#ffb300", "#ff9100", "#ff6c00", "blue"];

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
    const expenses = await getMonthlyExpenses(user.id);

    const graphCategories = expenses.reduce((acc: any, current: Expense) => {
      const existingCategory = acc.find(
        (item: Expense) => item.name === current.name
      );
      if (existingCategory) {
        existingCategory.amount += current.amount;
      } else {
        acc.push({
          name: current.name,
          amount: current.amount,
          color: current.color,
        });
      }
      return acc;
    }, []);

    setGraphCategories(graphCategories);

    setTotal(
      expenses.reduce(
        (accumulator: any, currentValue: Expense) =>
          accumulator + currentValue.amount,
        0
      )
    );
  };

  const Series = graphCategories.map((item: Expense) => item.amount);
  const slicesColors = graphCategories.map((item: Expense) => item.color);

  console.log(Series);
  console.log(slicesColors);

  return (
    <View pt={10} flex={1} alignItems="center">
      <Box
        flexDirection="row"
        justifyContent="space-between"
        w="85%"
        p={4}
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
          <PieChart
            widthAndHeight={170}
            series={Series}
            sliceColor={slicesColors}
            coverRadius={0.75}
            coverFill={"#FFF"}
          />
          <View position="absolute" alignItems="center" justifyContent="center">
            <VStack alignItems="center">
              <Text fontSize={16} fontFamily="SourceBold" color="muted.500">
                Total
              </Text>
              <Text fontSize={22} fontFamily="SourceBold">
                {user.symbol} {total}
              </Text>
            </VStack>
          </View>
        </Box>
        <VStack space={2}>
          {graphCategories.map((graphCategory: any) => (
            <HStack space={2} alignItems="center">
              <Circle
                size="10px"
                style={{ backgroundColor: graphCategory.color }}
              />
              <Text>{graphCategory.name}</Text>
            </HStack>
          ))}
        </VStack>
      </Box>
    </View>
  );
};
export default GraphScreen;
