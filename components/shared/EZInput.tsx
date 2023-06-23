import React from "react";
import { FormControl, Input, WarningOutlineIcon } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import COLORS from "../../colors";

type inputType = "text" | "password" | undefined;

interface EZInputProps {
  placeholder: string;
  value: string;
  onChangeText: (e: string) => void;
  error?: any;
  type: inputType;
}

interface EZInputStylesProp {
  [key: string]: any;
}

const EZInput: React.FC<EZInputProps & EZInputStylesProp> = (props) => {
  const { placeholder, error, value, onChangeText, type } = props;
  console.log(error);
  return (
    <FormControl isInvalid={error !== undefined} justifyContent="center">
      <Input
        {...props}
        type={type}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
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
