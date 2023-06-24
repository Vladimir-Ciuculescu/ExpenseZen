import React from "react";
import { FormControl, Input, WarningOutlineIcon } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import COLORS from "../../colors";
import { InterfaceInputProps } from "native-base/lib/typescript/components/primitives/Input/types";

type inputType = "text" | "password" | undefined;

interface EZInputProps {
  placeholder: string;
  value: string;
  onChangeText: (e: string) => void;
  error?: any;
  type: inputType;
  textContentType?: any;
  InputRightElement?: JSX.Element;
}

interface EZInputStylesProp {
  [key: string]: any;
}

const EZInput: React.FC<EZInputProps & EZInputStylesProp> = (props) => {
  const {
    placeholder,
    error,
    value,
    onChangeText,
    type,
    textContentType,
    InputRightElement,
  } = props;
  return (
    <FormControl isInvalid={error !== undefined} justifyContent="center">
      <Input
        textContentType={textContentType}
        {...props}
        type={type}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        InputRightElement={InputRightElement}
      />
      <FormControl.ErrorMessage
        _text={{ fontSize: 14, fontFamily: "SourceSansPro" }}
        leftIcon={
          <FontAwesome name="close" size={20} color={COLORS.DANGER[500]} />
        }
      >
        {error}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};

export default EZInput;
