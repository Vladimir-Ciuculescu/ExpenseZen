import { Button } from "native-base";
import React from "react";

interface EZButtonProps {
  children: any;
  onPress: () => void;
  isLoading?: boolean;
}

interface EZButtonStypeProp {
  [key: string]: any;
}

const EZButton: React.FC<EZButtonProps & EZButtonStypeProp> = (props) => {
  const { children, onPress, isLoading } = props;

  return (
    <Button {...props} onPress={onPress} isLoading={isLoading}>
      {children}
    </Button>
  );
};

export default EZButton;
