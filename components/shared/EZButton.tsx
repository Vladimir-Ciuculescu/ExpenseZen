import { Button } from "native-base";
import { ResponsiveValue } from "native-base/lib/typescript/components/types";
import React from "react";

interface EZButtonProps {
  children: any;
  onPress: () => void;
  isLoading?: boolean;
  variant?: ResponsiveValue<
    "link" | "subtle" | "solid" | "ghost" | "outline" | "unstyled"
  >;
  leftIcon?: JSX.Element;
}

interface EZButtonStypeProp {
  [key: string]: any;
}

const EZButton: React.FC<EZButtonProps & EZButtonStypeProp> = (props) => {
  const { children, onPress, isLoading, variant, leftIcon } = props;

  return (
    <Button
      {...props}
      onPress={onPress}
      isLoading={isLoading}
      variant={variant || "solid"}
      leftIcon={leftIcon || undefined}
    >
      {children}
    </Button>
  );
};

export default EZButton;
