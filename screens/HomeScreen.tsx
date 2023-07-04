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
} from "native-base";
import {
  NavigationProp,
  ParamListBase,
  useIsFocused,
} from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { TAB_BAR_HEIGHT } from "../constants";
import { ExpenseService } from "../api/services/ExpenseService";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface HomeScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [todayTotal, setTodayTotal] = useState<number>(0);
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
            {isLoading ? (
              <Skeleton
                h="3"
                width={10}
                rounded="full"
                startColor="indigo.300"
              />
            ) : (
              <Text fontFamily="SourceBold" color="muted.100" fontSize={20}>
                ${todayTotal}
              </Text>
            )}
          </HStack>
        </View>
      ),
    });
  }, [navigation, todayTotal, isLoading]);

  useEffect(() => {
    if (isFocused) {
      //getTodayTotal();
      fetchInfo();
    }
  }, [isFocused]);

  const getTodayTotal = async () => {
    // setIsLoading(true);
    // const total = await ExpenseService.getTodayTotalExpenses(Number(user.id));
    // setTodayTotal(total);
    // setIsLoading(false);
    const todayTotal = await ExpenseService.getTodayTotalExpenses(
      Number(user.id)
    );
    return todayTotal;
  };

  const getMonthTotal = async () => {
    const monthTotal = await ExpenseService.getMonthTotalExpensed(
      Number(user.id)
    );
    return monthTotal;
  };

  const fetchInfo = async () => {
    const results = await Promise.all([getTodayTotal(), getMonthTotal()]);

    console.log(results);
  };

  const openAddExpenseModal = () => {
    navigation.navigate("AddExpense");
  };

  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });

  return (
    <View flex={1} pt={10} px={7}>
      <VStack space={3}>
        <Text fontFamily="SourceBold" fontSize={20}>
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
          <Text fontFamily="SourceBold" color="muted.900" fontSize={35}>
            $ 4,578.00
          </Text>
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
                <Icon color="white" size={26} as={<AntDesign name="plus" />} />
              }
            />
          )}
        </Box>
      </VStack>
    </View>
  );
};
export default HomeScreen;
