import { StatusBar } from "expo-status-bar";
import { HStack, Text, VStack, View } from "native-base";
import React, { useLayoutEffect } from "react";
import { ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

//         <Ionicons name="chevron-back-sharp" size={30} color="black" />

interface AboutScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

const AboutScreen: React.FC<AboutScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView>
      <StatusBar style="dark" />
      <ScrollView>
        <VStack space={10} px={5} paddingTop={10}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-sharp" size={30} color="black" />
          </TouchableOpacity>
          <VStack space={4}>
            <Text fontSize={30} fontFamily="SourceBold">
              About ExpenseZen
            </Text>
            <Text fontSize={17} fontFamily="SourceSansPro">
              Welcome to ExpenseZen, your go-to solution for effortless expense tracking and budget
              management.
            </Text>
          </VStack>
          <VStack space={4}>
            <Text fontSize={30} fontFamily="SourceBold">
              Key Features:
            </Text>
            <Text fontSize={20} fontFamily="SourceSansPro">
              {`\u2022`}{" "}
              <Text fontSize={17} fontFamily="SourceBold">
                Easy Expense Tracking:{" "}
              </Text>
              <Text fontSize={17} fontFamily="SourceSansPro" flexWrap="wrap">
                Record your daily expenses quickly and hassle-free.
              </Text>
            </Text>
          </VStack>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutScreen;
