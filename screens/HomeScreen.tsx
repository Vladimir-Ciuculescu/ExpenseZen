import React, { useLayoutEffect } from "react";
import { View, Text, Box, Progress, VStack, Fab, Icon } from "native-base";
import {
  NavigationProp,
  ParamListBase,
  useIsFocused,
} from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { TAB_BAR_HEIGHT } from "../constants";

interface HomeScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const isFocused = useIsFocused();

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
          Today : $180.75
        </Text>
      ),
    });
  }, [navigation]);

  const openAddExpenseModal = () => {
    navigation.navigate("AddExpense");
  };

  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });

  return (
    <View flex={1} pt={10} px={7}>
      {/* <SafeAreaView style={{ flex: 1, alignItems: "center", marginTop: 100 }}> */}
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
          <Progress value={10} />
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
      {/* </SafeAreaView> */}
    </View>
  );
};
export default HomeScreen;
