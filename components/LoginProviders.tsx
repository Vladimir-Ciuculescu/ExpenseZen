import React, { useEffect, useState } from "react";
import { makeRedirectUri, startAsync } from "expo-auth-session";
import { Google, Facebook } from "../assets/SVG";
import { HStack, Pressable, Text } from "native-base";
import { supabase } from "../database/supabase";
import { SUPABASE_URL } from "@env";

const LoginProviders: React.FC<any> = () => {
  useEffect(() => {
    const logOUt = async () => {
      const { data } = await supabase.auth.getSession();
      console.log(data.session?.access_token);
    };
    logOUt();
  }, []);

  const googleSignIn = async () => {
    const redirectUrl = makeRedirectUri({
      path: "/auth/callback",
    });

    const authResponse = await startAsync({
      authUrl: `${SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${redirectUrl}`,
      returnUrl: redirectUrl,
    });

    if (authResponse.type === "success") {
      supabase.auth.setSession({
        access_token: authResponse.params.access_token,
        refresh_token: authResponse.params.refresh_token,
      });
    }
  };

  return (
    <HStack justifyContent="space-evenly">
      <Pressable
        onPress={googleSignIn}
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
