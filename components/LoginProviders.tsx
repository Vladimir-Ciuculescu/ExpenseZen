import React, { useEffect } from "react";
import { makeRedirectUri, startAsync } from "expo-auth-session";
import { Google, Facebook } from "../assets/SVG";
import { HStack, Pressable } from "native-base";
import { supabase } from "../api/supabase";
import { SUPABASE_URL } from "@env";
import * as WebBrowser from "expo-web-browser";

const LoginProviders: React.FC<any> = () => {
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

  const extractParamsFromUrl = (url: string) => {
    const params = new URLSearchParams(url.split("#")[1]);
    const data = {
      access_token: params.get("access_token"),
      expires_in: parseInt(params.get("expires_in") || "0"),
      refresh_token: params.get("refresh_token"),
      token_type: params.get("token_type"),
      provider_token: params.get("provider_token"),
    };

    return data;
  };

  useEffect(() => {
    WebBrowser.warmUpAsync();

    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);

  // const doSmth = async () => {
  //   //const url = (await googleSignIn()) as string;

  //   console.log(url);
  //   const returnUrl = makeRedirectUri({
  //     path: "/", // This were missing if you use react-navigation linking
  //     useProxy: false,
  //   });

  //   const result = await WebBrowser.openAuthSessionAsync(url, returnUrl, {
  //     showInRecents: true,
  //   });

  //   if (result.type === "success") {
  //     const data = extractParamsFromUrl(result.url);
  //     console.log(data);
  //   }
  // };

  // const googleSignIn = async () => {
  //   const result = await supabase.auth.signInWithOAuth({
  //     provider: "google",
  //     options: {
  //       redirectTo: "wwphlzjxrnbilstgyzge://google-auth",
  //     },
  //   });
  //   return result.data.url;
  // };

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
        alignItems="center">
        <Google width={35} height={35} />
      </Pressable>

      <Pressable
        width={"100px"}
        height={"60px"}
        borderColor="muted.400"
        borderWidth={1}
        borderRadius={10}
        justifyContent="center"
        alignItems="center">
        <Facebook width={35} height={35} />
      </Pressable>
    </HStack>
  );
};

export default LoginProviders;
