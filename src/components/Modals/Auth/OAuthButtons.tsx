import React from "react";

import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";

import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { FIREBASE_ERRORS } from "@/firebase/errors";

function OAuthButtons() {
  const [signInWithGoogle, user, loading, hookError] =
    useSignInWithGoogle(auth);
  return (
    <Flex direction={"column"} width={"100%"} mb={4}>
      <Button
        variant={"oauth"}
        mb={2}
        isLoading={loading}
        onClick={() => signInWithGoogle()}
      >
        <Image
          src="/images/googleLogo.svg"
          alt="Google Logo"
          height={"20px"}
          mr={4}
        />
        Continue with Google
      </Button>
      <Text textAlign={"center"} color={"red"} fontSize={"10pt"}>
        {FIREBASE_ERRORS[hookError?.message as keyof typeof FIREBASE_ERRORS]}
      </Text>
    </Flex>
  );
}

export default OAuthButtons;
