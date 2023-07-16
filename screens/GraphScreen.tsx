import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text } from "native-base";
import React, { useLayoutEffect } from "react";
import PieChart from "react-native-pie-chart";

interface GraphScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

const GraphScreen: React.FC<GraphScreenProps> = ({ navigation }) => {
  const widthAndHeight = 250;
  const series = [123, 321, 123, 789, 537];
  const sliceColor = ["#fbd203", "#ffb300", "#ff9100", "#ff6c00", "#ff3c00"];
  const data = {
    dataSets: [
      {
        values: [
          { value: 30, label: "30%" },
          { value: 20, label: "20%" },
          { value: 50, label: "50%" },
          // Add more values for additional pie segments
        ],
        label: "Pie Chart",
        config: {
          colors: ["#ff6347", "#32cd32", "#6495ed"],
          valueTextSize: 14,
          valueTextColor: "white",
          sliceSpace: 2,
          selectionShift: 13,
        },
      },
    ],
  };

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
  }, [navigation]);

  return (
    <View>
      <Text>Graph</Text>
      <PieChart
        widthAndHeight={200}
        series={series}
        sliceColor={sliceColor}
        coverRadius={0.65}
        coverFill={"#FFF"}

        // width={200}
        // height={200}
        //chartConfig={{ color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})` }}
        //accessor="value"
        //backgroundColor="transparent"
        //paddingLeft="15"
        //absolute
      />
    </View>
  );
};
export default GraphScreen;
