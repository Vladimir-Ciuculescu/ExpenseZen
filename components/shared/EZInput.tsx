import React, { ForwardedRef, forwardRef } from "react";
import { KeyboardTypeOptions, ReturnKeyTypeOptions } from "react-native";
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
  returnKeyType?: ReturnKeyTypeOptions | undefined;
  multiline?: boolean;
  numberOfLines?: number;
  onFocus?: any;
  ref?: any;
  onSubmitEditing?: () => void;
  alignItems: string;
  flex?: number | string;
  height?: number | string;
}

interface EZInputStylesProp {
  [key: string]: any;
}

type Props = EZInputProps & EZInputStylesProp;

const EZInput = forwardRef<any, Props>(
  (props: Props, ref: ForwardedRef<any>) => {
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
      returnKeyType,
      onSubmitEditing,
      alignItems,
      flex,
      height,
    } = props;
    return (
      <FormControl
        height={height || "auto"}
        flex={flex || "auto"}
        isInvalid={error !== undefined}
        justifyContent="center"
        alignItems={alignItems || "flex-start"}
      >
        <Input
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          ref={ref}
          onFocus={onFocus}
          multiline={multiline}
          numberOfLines={numberOfLines}
          textContentType={textContentType}
          autoComplete="off"
          keyboardType={keyboardType}
          {...props}
          type={type}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          InputRightElement={InputRightElement}
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
  }
);

export default EZInput;
