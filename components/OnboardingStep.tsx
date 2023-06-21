import React from "react";
import { useWindowDimensions } from "react-native";
import { Text, View, VStack } from "native-base";
import { Step } from "../interfaces/Step";

interface OnboardingStepProps {
  step: Step;
}

const OnboardingStep: React.FC<OnboardingStepProps> = ({ step }) => {
  const { width } = useWindowDimensions();

  const { title, description, image } = step;
  return (
    <VStack flex={1} justifyContent="center" alignItems="center" width={width}>
      <VStack space={5} alignItems="center">
        {image}
        <VStack space={2} alignItems="center" mx={10}>
          <Text
            fontFamily="SourceBold"
            fontSize={28}
            color="purple.700"
            textAlign="center"
          >
            {title}
          </Text>
          <Text
            fontFamily="SourceSansPro"
            textAlign="center"
            color="muted.900"
            fontSize={16}
          >
            {description}
          </Text>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default OnboardingStep;
