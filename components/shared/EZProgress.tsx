import React, { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";
import { View } from "native-base";

interface EZProgresssProps {
  height: string | number;
  value: number;
  maxValue: number;
  color: string | undefined;
}

const EZProgress: React.FC<EZProgresssProps> = ({
  height,
  value,
  maxValue,
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
    let progressValue: number;
    if (value >= maxValue) {
      progressValue = 1;
    } else {
      progressValue = -width + (width * value) / maxValue;
    }
    reactive.setValue(progressValue);
  }, [value, width, maxValue]);

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
