import { useWindowDimensions, Animated, StyleSheet } from "react-native";
import React from "react";
import { HStack, View } from "native-base";

const Paginator: React.FC<any> = ({ steps, scrollX }) => {
  const { width: windowWidth } = useWindowDimensions();

  const AnimatedView = Animated.createAnimatedComponent(View);

  return (
    <HStack space="2px">
      {steps.map((_: any, index: number) => {
        const inputRange = [
          windowWidth * (index - 1),
          windowWidth * index,
          windowWidth * (index + 1),
        ];

        const width = scrollX.interpolate({
          inputRange,
          outputRange: [9, 18, 9],
          extrapolate: "clamp",
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.4, 1, 0.4],
          extrapolate: "clamp",
        });

        return (
          <AnimatedView
            h="9px"
            mx="4px"
            borderRadius="4px"
            bg="purple.700"
            key={index.toString()}
            style={{ width, opacity }}
          />
        );
      })}
    </HStack>
  );
};

export default Paginator;
