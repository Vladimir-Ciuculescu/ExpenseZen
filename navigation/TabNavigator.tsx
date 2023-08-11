import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Fragment, useRef, useEffect } from "react";
import COLORS from "../colors";
import { TAB_BAR_HEIGHT } from "../constants/NavigationConstants";
import HomeScreen from "../screens/HomeScreen";
import { Ionicons } from "@expo/vector-icons";
import GraphScreen from "../screens/GraphScreen";
import CategoriesScreen from "../screens/CategoriesScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { Animated, useWindowDimensions } from "react-native";
import EZHeaderBackground from "../components/shared/EZHeaderBackground";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Tab = createBottomTabNavigator();

const TabNavigator: React.FC<any> = () => {
  const { width } = useWindowDimensions();
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  const user = useSelector((state: RootState) => state.user);

  const tabWidth = width / 4;

  const animateTabOffset = (index: number) => {
    Animated.spring(tabOffsetValue, {
      toValue: tabWidth * index,
      speed: 20,
      useNativeDriver: true,
    }).start();
  };

  const resetOffset = () => {
    Animated.spring(tabOffsetValue, {
      toValue: 0,
      speed: 0,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    resetOffset();
  }, [user.id]);

  return (
    <Fragment>
      <Tab.Navigator
        screenOptions={{
          unmountOnBlur: true,
          tabBarActiveTintColor: COLORS.PURPLE[700],
          tabBarInactiveTintColor: COLORS.MUTED[500],

          tabBarLabelStyle: {
            fontFamily: "SourceBold",
          },
          tabBarStyle: {
            height: TAB_BAR_HEIGHT,
          },
          headerBackground: () => <EZHeaderBackground />,
        }}>
        <Tab.Screen
          component={HomeScreen}
          name="Home"
          options={{
            title: "Home",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={24}
                color={focused ? COLORS.PURPLE[700] : COLORS.MUTED[500]}
              />
            ),
          }}
          listeners={() => ({
            tabPress: () => animateTabOffset(0),
          })}
        />
        <Tab.Screen
          component={GraphScreen}
          name="Graph"
          options={{
            title: "Graph",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "md-pie-chart" : "md-pie-chart-outline"}
                size={24}
                color={focused ? COLORS.PURPLE[700] : COLORS.MUTED[500]}
              />
            ),
          }}
          listeners={() => ({
            tabPress: () => animateTabOffset(1),
          })}
        />
        <Tab.Screen
          component={CategoriesScreen}
          name="Categories"
          options={{
            title: "Categories",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "ios-grid" : "ios-grid-outline"}
                size={24}
                color={focused ? COLORS.PURPLE[700] : COLORS.MUTED[500]}
              />
            ),
          }}
          listeners={() => ({
            tabPress: () => animateTabOffset(2),
          })}
        />
        <Tab.Screen
          component={SettingsScreen}
          name="Settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "settings" : "settings-outline"}
                size={24}
                color={focused ? COLORS.PURPLE[700] : COLORS.MUTED[500]}
              />
            ),
          }}
          listeners={() => ({
            tabPress: () => animateTabOffset(3),
          })}
        />
      </Tab.Navigator>
      <Animated.View
        style={{
          width: tabWidth,
          height: 2,
          backgroundColor: COLORS.PURPLE[700],
          position: "absolute",
          borderRadius: 50,
          bottom: 78,
          transform: [{ translateX: tabOffsetValue }],
        }}
      />
    </Fragment>
  );
};

export default TabNavigator;
