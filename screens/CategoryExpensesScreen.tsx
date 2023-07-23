import React, { useLayoutEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
} from "react-native";
import { Pressable, Text } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from "@react-navigation/native";
import { useLayout } from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";
import { ExpenseService } from "../api/services/ExpenseService";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface CategoryExpenseScreenProps {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<
    { params: { category: string; categoryId: number } },
    "params"
  >;
}

const CategoryExpensesScreen: React.FC<CategoryExpenseScreenProps> = ({
  navigation,
  route,
}) => {
  const {
    params: { categoryId },
  } = route;

  const user = useSelector((state: RootState) => state.user);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        borderBottomWidth: 0,
      },
      headerShadowVisible: false,
      headerTitle: () => (
        <Text fontFamily="SourceBold" fontSize={24}>
          Travelling
        </Text>
      ),
      headerLeft: () => (
        <Pressable onPress={() => navigation.goBack()}>
          <FontAwesome5 name="arrow-left" size={24} color="black" />
        </Pressable>
      ),
    });

    getMonthlyCategoryExpenses();
  }, [navigation]);

  const getMonthlyCategoryExpenses = async () => {
    const data = await ExpenseService.getMonthlyCategoryExpenses(
      user.id,
      categoryId
    );

    console.log(data);
  };

  const items = [
    {
      icon: "figma",
      label: "Pr",
      company: "Figma",
      start: new Date(2021, 3, 1),
      end: null,
    },
    {
      icon: "twitch",
      label: "Lead Designer",
      company: "Twitch",
      start: new Date(2020, 12, 1),
      end: new Date(2021, 3, 1),
    },
    {
      icon: "github",
      label: "Senior Designer",
      company: "GitHub",
      start: new Date(2017, 8, 1),
      end: new Date(2020, 12, 1),
    },
    {
      icon: "gitlab",
      company: "GitLab",
      label: "Mid-level Designer",
      start: new Date(2016, 4, 1),
      end: new Date(2017, 8, 1),
    },
    {
      icon: "figma",
      label: "Principal Designer",
      company: "Figma",
      start: new Date(2021, 3, 1),
      end: null,
    },
    {
      icon: "twitch",
      label: "Lead Designer",
      company: "Twitch",
      start: new Date(2020, 12, 1),
      end: new Date(2021, 3, 1),
    },
    {
      icon: "github",
      label: "Senior Designer",
      company: "GitHub",
      start: new Date(2017, 8, 1),
      end: new Date(2020, 12, 1),
    },
    {
      icon: "gitlab",
      company: "GitLab",
      label: "Mid-level Designer",
      start: new Date(2016, 4, 1),
      end: new Date(2017, 8, 1),
    },
    {
      icon: "figma",
      label: "Principal Designer",
      company: "Figma",
      start: new Date(2021, 3, 1),
      end: null,
    },
    {
      icon: "twitch",
      label: "Lead Designer",
      company: "Twitch",
      start: new Date(2020, 12, 1),
      end: new Date(2021, 3, 1),
    },
    {
      icon: "github",
      label: "Senior Designer",
      company: "GitHub",
      start: new Date(2017, 8, 1),
      end: new Date(2020, 12, 1),
    },
    {
      icon: "gitlab",
      company: "GitLab",
      label: "Mid-level Designer",
      start: new Date(2016, 4, 1),
      end: new Date(2017, 8, 1),
    },
    {
      icon: "twitter",
      company: "Twitter",
      label: "Mid-level Designer",
      start: new Date(2014, 2, 1),
      end: new Date(2016, 4, 1),
    },
    {
      icon: "codepen",
      label: "Junior Designer",
      company: "Codepen",
      start: new Date(2013, 8, 1),
      end: new Date(2014, 2, 1),
    },
    {
      icon: "codesandbox",
      label: "Junior Designer",
      company: "CodeSandbox",
      start: new Date(2012, 1, 1),
      end: new Date(2013, 8, 1),
    },
    {
      icon: "dribbble",
      label: "Entry-level Designer",
      company: "Dribbble",
      start: new Date(2008, 11, 1),
      end: new Date(2012, 1, 1),
    },
  ];

  return (
    <SafeAreaView style={{ backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={styles.container}>
        {items.map(({ icon, label, company, start, end }, index) => {
          return (
            <View
              key={index}
              //style={styles.cardWrapper}
            >
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
              >
                <View style={styles.card}>
                  <View style={styles.cardIcon}>
                    <MaterialCommunityIcons
                      name="airplane"
                      size={24}
                      //   color={COLORS.MUTED[700]}
                    />
                  </View>

                  <View style={styles.cardDelimiter}>
                    {index !== items.length - 1 && (
                      <View style={styles.cardDelimiterLine} />
                    )}

                    <View
                      style={[
                        styles.cardDelimiterInset,
                        { backgroundColor: "#ffcb05" },
                      ]}
                    />
                  </View>

                  <View style={styles.cardBody}>
                    <View style={styles.cardBodyContent}>
                      <Text style={styles.cardTitle}>{label}</Text>

                      {/* <Text style={styles.cardSubtitle}>{company}</Text> */}

                      <Text style={styles.cardDates}>{`${start.toLocaleString(
                        "en-US",
                        {
                          month: "short",
                          year: "numeric",
                        }
                      )} - ${
                        end
                          ? end.toLocaleString("en-US", {
                              month: "short",
                              year: "numeric",
                            })
                          : "Present"
                      }`}</Text>
                    </View>
                    <View style={styles.cardBodyAction}>
                      {/* <MaterialCommunityIcons
                        color="#181818"
                        name="airplane"
                        size={16}
                      /> */}
                      <Text>50$</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CategoryExpensesScreen;

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1d1d1d",
    marginBottom: 12,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    // borderColor: "red",
    // borderWidth: 2,
  },
  cardDelimiter: {
    position: "relative",
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
  },
  cardDelimiterInset: {
    width: 12,
    height: 12,
    borderWidth: 3,
    borderRadius: 9999,
    backgroundColor: "#fff",
    borderColor: "#ffcb05",
    zIndex: 9,
    position: "relative",
  },
  cardDelimiterLine: {
    position: "absolute",
    left: 30,
    top: "50%",
    borderLeftWidth: 1,
    borderColor: "#eee",
    height: "100%",
    zIndex: 1,
  },
  cardBody: {
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  cardBodyContent: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  cardBodyAction: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    maxWidth: 28,
    alignItems: "flex-end",
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#2a2a2a",
    marginBottom: 3,
  },
  cardSubtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#464646",
    marginBottom: 3,
  },
  cardDates: {
    fontSize: 14,
    fontWeight: "500",
    color: "#ababab",
  },
});
