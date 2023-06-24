import React, { useState, useEffect } from "react";
import { VStack, Text, Input, Pressable, Icon, Button } from "native-base";
import { Feather } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/userReducer";
import { RootState } from "../redux/store";

const LoginForm: React.FC<any> = () => {
  const [passwordVisilble, setPasswordVisible] = useState<boolean>(false);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const togglePasswordVisible = () => {
    setPasswordVisible((prevValue) => !prevValue);
  };

  useEffect(() => {
    console.log(user);
  }, []);

  const login = () => {
    dispatch(
      setUser({
        firstName: "vladi",
        lastName: "Ciuculescu",
        email: "vladi@gmail.com",
      })
    );
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
          color="purple.700"
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
        onPress={login}
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