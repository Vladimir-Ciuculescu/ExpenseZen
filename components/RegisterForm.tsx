import React, { useState } from "react";
import { VStack, Text, Input, Pressable, Icon, Button } from "native-base";
import { Feather } from "@expo/vector-icons";

const RegisterForm: React.FC<any> = () => {
  return (
    <VStack space={10}>
      <VStack space={2}>
        <Text fontFamily="SourceBold" fontSize={30} textAlign="center">
          Register account
        </Text>
        <Text textAlign="center" fontFamily="SourceSansPro" fontSize={17}>
          Fill your information
        </Text>
      </VStack>
      <VStack space={6}>
        <Input
          placeholder="Enter your email"
          fontSize={15}
          color="purple.700"
          pl={5}
          fontFamily="SourceSansPro"
          borderRadius={8}
          focusOutlineColor="purple.700"
          height="55px"
          borderColor="purple.700"
          _focus={{ backgroundColor: "transparent" }}
        />
        <Input
          type="password"
          placeholder="Password"
          color="purple.700"
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
          type="password"
          placeholder="Repeat password"
          color="purple.700"
          fontSize={15}
          pl={5}
          fontFamily="SourceSansPro"
          borderRadius={8}
          focusOutlineColor="purple.700"
          height="55px"
          borderColor="purple.700"
          _focus={{ backgroundColor: "transparent" }}
        />
      </VStack>
      <Button
        bg="purple.700"
        borderRadius={8}
        height="55px"
        _text={{ fontFamily: "SourceSansPro", fontSize: 17 }}
      >
        Register
      </Button>
    </VStack>
  );
};

export default RegisterForm;
