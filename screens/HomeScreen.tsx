import React, { useState } from "react";
import { SafeAreaView, useWindowDimensions } from "react-native";
import { View, Text, Card, Box, Progress } from "native-base";

const HomeScreen: React.FC<any> = () => {
  const { width } = useWindowDimensions();
  const [value, setValue] = useState(10);

  return (
    <View flex={1}>
      <SafeAreaView style={{ flex: 1, alignItems: "center", marginTop: 100 }}>
        <Box
          bg="muted.50"
          width={"80%"}
          // height={50}
          shadow={2}
          borderRadius={10}
          px={5}
          py={3}
        >
          <Text fontFamily="SourceSansPro" color="muted.400">
            Monthly costs
          </Text>
          <Text fontFamily="SourceBold" color="muted.900" fontSize={35}>
            $ 4,578.00
          </Text>
          <Progress value={value} />
        </Box>
      </SafeAreaView>
    </View>
  );
};
export default HomeScreen;
