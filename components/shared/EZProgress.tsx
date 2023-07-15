import React, { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";
import { Text, View } from "native-base";

interface EZProgresssProps {
  height: string | number;
  steps: number;
  step: number;
  color: string | undefined;
}

const EZProgress: React.FC<EZProgresssProps> = ({
  height,
  step,
  steps,
  color,
}) => {
  const animatedValue = useRef(new Animated.Value(-1000)).current;
  const reactive = useRef(new Animated.Value(-1000)).current;
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactive,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    reactive.setValue(-width + (width * step) / steps);
  }, [step, width]);

  const AnimatedView = Animated.createAnimatedComponent(View);

  return (
    <View
      onLayout={(e) => {
        const width = e.nativeEvent.layout.width;
        setWidth(width);
      }}
      bg="muted.200"
      borderRadius={height}
      overflow="hidden"
      height={height}
    >
      <AnimatedView
        style={{
          transform: [{ translateX: animatedValue }],
          backgroundColor: color,
        }}
        width="100%"
        height={height}
        borderRadius={height}
        position="absolute"
        left={0}
        top={0}
      />
    </View>
  );
};

export default EZProgress;
