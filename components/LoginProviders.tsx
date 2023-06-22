import React from "react";
import { Google, Facebook } from "../assets/SVG";
import { HStack, Pressable } from "native-base";

const LoginProviders: React.FC<any> = () => {
  return (
    <HStack justifyContent="space-evenly">
      <Pressable
        width={"100px"}
        height={"60px"}
        borderColor="muted.400"
        borderWidth={1}
        borderRadius={10}
        justifyContent="center"
        alignItems="center"
      >
        <Google width={35} height={35} />
      </Pressable>
      <Pressable
        width={"100px"}
        height={"60px"}
        borderColor="muted.400"
        borderWidth={1}
        borderRadius={10}
        justifyContent="center"
        alignItems="center"
      >
        <Facebook width={35} height={35} />
      </Pressable>
    </HStack>
  );
};

export default LoginProviders;
