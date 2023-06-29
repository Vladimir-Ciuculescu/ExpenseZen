import React from "react";
import { KeyboardTypeOptions } from "react-native";
import { FormControl, Input } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import COLORS from "../../colors";

type inputType = "text" | "password" | undefined;

interface EZInputProps {
  placeholder?: string;
  value: string | undefined;
  onChangeText: (e: string) => void;
  error?: any;
  type: inputType;
  textContentType?: any;
  InputRightElement?: JSX.Element;
  keyboardType?: KeyboardTypeOptions | undefined;
  multiline?: boolean;
  numberOfLines?: number;
  onFocus?: any;
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
    keyboardType,
    multiline,
    numberOfLines,
    onFocus,
  } = props;
  return (
    <FormControl isInvalid={error !== undefined} justifyContent="center">
      <Input
        onFocus={onFocus}
        multiline={multiline}
        numberOfLines={numberOfLines}
        textContentType={textContentType}
        keyboardType={keyboardType}
        {...props}
        type={type}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        InputRightElement={InputRightElement}

        //placeholderTextColor="red.900"
      />
      <FormControl.ErrorMessage
        _text={{ fontSize: 14, fontFamily: "SourceBold" }}
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
