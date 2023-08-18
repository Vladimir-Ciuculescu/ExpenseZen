import React, { ForwardedRef, forwardRef } from "react";
import { KeyboardTypeOptions, ReturnKeyTypeOptions } from "react-native";
import { FormControl, Input, Text, useTheme } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import COLORS from "../../colors";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

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
  formHeight?: number | string;
  label?: string;
}

interface EZInputStylesProp {
  [key: string]: any;
}

type Props = EZInputProps & EZInputStylesProp;

const EZInput = forwardRef<any, Props>((props: Props, ref: ForwardedRef<any>) => {
  const {
    colors: { muted },
  } = useTheme();
  const user = useSelector((state: RootState) => state.user);

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
    formHeight,
    label,
  } = props;
  return (
    <FormControl
      height={formHeight || "auto"}
      flex={flex || "auto"}
      isInvalid={error !== undefined}
      justifyContent="center"
      alignItems={alignItems || "flex-start"}
      style={{ gap: 5 }}>
      {label && (
        <Text fontSize={17} color={muted[900]} fontFamily="SourceBold">
          {label}
        </Text>
      )}

      <Input
        bg={user.theme === "dark" ? "muted.50" : "muted.200"}
        //backgroundColor="muted.100"
        color={user.theme === "dark" ? "muted.900" : "purple.700"}
        borderWidth={"0.5"}
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
        _focus={{ backgroundColor: "inherit" }}
        focusOutlineColor={error ? "error.400" : "inherit"}
      />
      <FormControl.ErrorMessage
        _text={{ fontSize: 14, fontFamily: "SourceBold" }}
        leftIcon={<FontAwesome name="close" size={20} color={COLORS.DANGER[400]} />}>
        {error}
      </FormControl.ErrorMessage>
    </FormControl>
  );
});

export default EZInput;
