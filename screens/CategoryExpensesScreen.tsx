import React, { useLayoutEffect } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { Text, ScrollView, HStack, View, useTheme } from "native-base";
import { NavigationProp, ParamListBase, RouteProp } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";

import { Expense } from "../interfaces/Expense";
import moment from "moment";
import { StatusBar } from "expo-status-bar";
import { getCategoryIcon } from "../utils/getCategoryIcon";
import COLORS from "../colors";
import { AppStackParamList } from "../interfaces/Navigation";

type Props = {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<AppStackParamList, "CategoryExpenses">;
};

const CategoryExpensesScreen: React.FC<Props> = ({ navigation, route }) => {
  const { params } = route;
  const { expenses, name } = params;
  const {
    colors: { muted },
  } = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        borderBottomWidth: 0,
      },
      headerShadowVisible: false,
      headerTitle: () => (
        <Text fontFamily="SourceBold" fontSize={24}>
          {name}
        </Text>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome5 name="arrow-left" size={24} color={muted[900]} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        {expenses.map((expense: Expense, index: number) => {
          const parsedDate = moment(expense.payDate, "YYYY-MM-DD");
          const formattedDate = parsedDate.format("D MMMM");

          return (
            <View key={index}>
              <HStack alignItems="center">
                <View width={"48px"} height={"48px"} alignItems="center" justifyContent="center">
                  {getCategoryIcon(expense.name, 24, muted[900])}
                </View>

                <View
                  position="relative"
                  width="60px"
                  alignItems="center"
                  justifyContent="center"
                  alignSelf="stretch">
                  {index !== expenses.length - 1 && (
                    <View
                      position="absolute"
                      left="30px"
                      top="50%"
                      borderLeftWidth={1}
                      borderColor={expense.color}
                      height="100%"
                      zIndex={1}
                    />
                  )}

                  <View
                    width="12px"
                    height="12px"
                    borderWidth="3px"
                    borderRadius={9999}
                    zIndex={9}
                    borderColor={expense.color}
                    position={"relative"}
                    backgroundColor={COLORS.MUTED[50]}
                  />
                </View>

                <HStack
                  padding="12px"
                  alignItems="center"
                  justifyContent="center"
                  flexGrow={1}
                  flexShrink={1}
                  flexBasis={0}>
                  <View flexGrow={1} flexShrink={1} flexBasis={0}>
                    <Text fontSize={17} fontFamily="SourceBold" color="muted.700">
                      # {index + 1}
                    </Text>

                    <Text>{expense.description}</Text>

                    <Text fontSize={14} fontFamily="SourceSansPro" color="muted.500">
                      {formattedDate}
                    </Text>
                  </View>
                  <View>
                    <Text fontSize={18} fontFamily="SourceBold">
                      {expense.amount.toFixed(2)} $
                    </Text>
                  </View>
                </HStack>
              </HStack>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CategoryExpensesScreen;
