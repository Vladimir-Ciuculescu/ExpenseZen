import { StatusBar } from "expo-status-bar";
import { Text, useTheme, VStack } from "native-base";
import React, { Fragment } from "react";
import { ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface AboutScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

interface textInfo {
  title: string;
  content: JSX.Element;
}

const paragraphs: textInfo[] = [
  {
    title: " About ExpenseZen",
    content: (
      <Text fontSize={17} fontFamily="SourceSansPro">
        Welcome to ExpenseZen, your go-to solution for effortless expense tracking and budget
        management.
      </Text>
    ),
  },
  {
    title: " Key Features:",
    content: (
      <Fragment>
        <Text fontSize={20} fontFamily="SourceSansPro">
          {`\u2022`}{" "}
          <Text fontSize={17} fontFamily="SourceBold">
            Easy Expense Tracking:{" "}
          </Text>
          <Text fontSize={17} fontFamily="SourceSansPro" flexWrap="wrap">
            Record your daily expenses quickly and hassle-free.
          </Text>
        </Text>
        <Text fontSize={20} fontFamily="SourceSansPro">
          {`\u2022`}{" "}
          <Text fontSize={17} fontFamily="SourceBold">
            Smart Budgets:{" "}
          </Text>
          <Text fontSize={17} fontFamily="SourceSansPro" flexWrap="wrap">
            Set up monthly budgets for various spending categories.
          </Text>
        </Text>
        <Text fontSize={20} fontFamily="SourceSansPro">
          {`\u2022`}{" "}
          <Text fontSize={17} fontFamily="SourceBold">
            Clear Visuals:{" "}
          </Text>
          <Text fontSize={17} fontFamily="SourceSansPro" flexWrap="wrap">
            Gain insights with a simple pie chart that illustrates your spending distribution.
          </Text>
        </Text>
      </Fragment>
    ),
  },
  {
    title: " Why ExpenseZen:",
    content: (
      <Text fontSize={17} fontFamily="SourceSansPro" flexWrap="wrap">
        Tracking your expenses shouldn't be complicated. ExpenseZen keeps it simple, focusing on
        what truly matters - helping you stay on top of your finances.
      </Text>
    ),
  },
  {
    title: " Goal:",
    content: (
      <Text fontSize={17} fontFamily="SourceSansPro" flexWrap="wrap">
        ExpenseZen has the goal is aiming to simplify expense management, allowing you to make
        informed financial decisions without the fuss.
      </Text>
    ),
  },
];

const AboutScreen: React.FC<AboutScreenProps> = ({ navigation }) => {
  const {
    colors: { muted },
  } = useTheme();
  const { theme } = useSelector((state: RootState) => state.user);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack space={10} px={5} paddingTop={10}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-sharp" size={30} color={muted[900]} />
          </TouchableOpacity>
          {paragraphs.map((item, key) => (
            <VStack space={4} key={key}>
              <Text fontSize={30} fontFamily="SourceBold">
                {item.title}
              </Text>
              {item.content}
            </VStack>
          ))}
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutScreen;
