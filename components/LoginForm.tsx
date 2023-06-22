import React, { useState } from "react";
import { VStack, Text, Input, Pressable, Icon, Button } from "native-base";
import { Feather } from "@expo/vector-icons";

const LoginForm: React.FC<any> = () => {
  const [passwordVisilble, setPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisible = () => {
    setPasswordVisible((prevValue) => !prevValue);
  };

  return (
    <VStack space={10}>
      <VStack space={2}>
        <Text fontFamily="SourceBold" fontSize={30} textAlign="center">
          Welcome to ExpenseZen
        </Text>
        <Text textAlign="center" fontFamily="SourceSansPro" fontSize={17}>
          Please sign in to track your expenses and stay on top of your finances
        </Text>
      </VStack>
      <VStack space={6}>
        <Input
          color="purple.700"
          placeholder="Enter your email"
          fontSize={15}
          pl={5}
          fontFamily="SourceSansPro"
          borderRadius={8}
          focusOutlineColor="purple.700"
          height="55px"
          borderColor="purple.700"
          _focus={{ backgroundColor: "transparent" }}
        />
        <Input
          type={passwordVisilble ? "text" : "password"}
          placeholder="Password"
          fontSize={15}
          pl={5}
          fontFamily="SourceSansPro"
          borderRadius={8}
          focusOutlineColor="purple.700"
          height="55px"
          borderColor="purple.700"
          _focus={{ backgroundColor: "transparent" }}
          InputRightElement={
            <Pressable mr={4} onPress={togglePasswordVisible}>
              <Icon
                size={5}
                color="purple.700"
                as={<Feather name={passwordVisilble ? "eye" : "eye-off"} />}
              />
            </Pressable>
          }
        />
      </VStack>
      <Button
        bg="purple.700"
        borderRadius={8}
        height="55px"
        _text={{ fontFamily: "SourceSansPro", fontSize: 17 }}
      >
        Sign In
      </Button>
    </VStack>
  );
};

export default LoginForm;
