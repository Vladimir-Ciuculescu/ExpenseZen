import React, { useCallback, useRef, useState } from "react";
import {
  FlatList,
  Animated,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { Button, HStack, VStack } from "native-base";

import { PieChart, Progress, Savings } from "../assets/SVG";
import { Step } from "../interfaces/Step";
import OnboardingStep from "./OnboardingStep";
import Paginator from "./Paginator";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../colors";

enum Direction {
  Back = "Back",
  Next = "Next",
}

const steps: Step[] = [
  {
    id: 1,
    title: "Track Your Savings",
    description:
      "Start your financial journey by tracking your savings. Set goals, monitor your progress, and watch your savings grow over time",
    image: <Savings width={300} height={300} />,
  },
  {
    id: 2,
    title: "Visualize Your Expenses",
    description:
      "Gain insights into your spending habits with our interactive pie charts. See where your money is going and make informed decisions to manage your expenses effectively",
    image: <PieChart width={300} height={300} />,
  },
  {
    id: 3,
    title: "Stay on Top of Your Financial Goals",
    description:
      "Keep track of your financial goals with our intuitive progress bars. Set milestones, track your achievements, and stay motivated on your path to financial success.",
    image: <Progress width={300} height={300} />,
  },
];

const Onboarding: React.FC<any> = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width } = useWindowDimensions();

  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList<any>>(null);

  const viewConfigRef = React.useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  const onChangeViewableItem = useCallback(({ viewableItems }: any) => {
    setCurrentIndex(viewableItems[0].index);
  }, []);

  const goDirection = (direction: Direction) => {
    flatListRef.current?.scrollToIndex({
      index: direction === Direction.Back ? currentIndex - 1 : currentIndex + 1,
    });
  };

  const isFirstStep = currentIndex === 0;
  const isLastStep = currentIndex === steps.length - 1;

  return (
    <VStack alignItems="center">
      <FlatList
        scrollEnabled={false}
        ref={flatListRef}
        renderItem={({ item }) => <OnboardingStep step={item} />}
        pagingEnabled={true}
        bounces={false}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={steps}
        keyExtractor={(step: Step) => step.id.toString()}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={1}
        onViewableItemsChanged={onChangeViewableItem}
        viewabilityConfig={viewConfigRef.current}
      />
      <VStack alignItems="center" space={4}>
        <Paginator steps={steps} scrollX={scrollX} />
        <HStack justifyContent="space-between" w={width} px={5}>
          <Button
            onPress={() => goDirection(Direction.Back)}
            variant="unstyled"
            disabled={isFirstStep}
            opacity={isFirstStep ? 0.4 : 1}
            _text={{
              color: "purple.700",
              fontFamily: "SourceBold",
              fontSize: 20,
            }}
            startIcon={
              <Ionicons
                name="md-arrow-back-outline"
                size={24}
                color={COLORS.PURPLE[700]}
              />
            }
          >
            Back
          </Button>
          <Button
            variant="unstyled"
            _text={{
              color: "purple.700",
              fontFamily: "SourceBold",
              fontSize: 20,
            }}
            onPress={() => goDirection(Direction.Next)}
            disabled={isLastStep}
            opacity={isLastStep ? 0.4 : 1}
            endIcon={
              <Ionicons
                name="md-arrow-forward-outline"
                size={24}
                color={COLORS.PURPLE[700]}
              />
            }
          >
            Next
          </Button>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default Onboarding;
