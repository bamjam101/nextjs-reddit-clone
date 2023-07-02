import { useState } from "react";

import { authModalState } from "@/atoms/authModalAtoms";
import { useSetRecoilState } from "recoil";

import { Button, Flex, Icon, Input, Text } from "@chakra-ui/react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import { FIREBASE_ERRORS } from "@/firebase/errors";

import { BsReddit } from "react-icons/bs";

export interface ILoginProps {}

const ResetPassword: React.FC<ILoginProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await sendPasswordResetEmail(email);
    setSuccess(true);
  };
  return (
    <Flex direction={"column"} alignItems={"center"} width={"100%"}>
      <Icon as={BsReddit} color={"brand.100"} fontSize={48} mb={2} />
      <Text fontWeight={700} mb={2}>
        Reset your password
      </Text>
      {success ? (
        <Text mb={2}>Please Check Your Email</Text>
      ) : (
        <>
          <Text fontSize={"sm"} textAlign={"center"} mb={2}>
            Enter the email associated with your account and we&apos;ll send you
            an password reset link
          </Text>
          <form onSubmit={onSubmit} style={{ width: "100%" }}>
            <Input
              name="email"
              placeholder="Email"
              type="email"
              mb={2}
              onChange={(event) => setEmail(event.target.value)}
              required
              fontSize={"10pt"}
              _placeholder={{ color: "gray.500" }}
              _hover={{
                bg: "white",
                border: "1px solid",
                borderColor: "blue.500",
              }}
              _focus={{
                outline: "none",
                bg: "white",
                border: "1px solid",
                borderColor: "blue.500",
              }}
              bg={"gray.50"}
            />
            <Text textAlign={"center"} color={"red"} fontSize={"10pt"}>
              {FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}
            </Text>
            <Button
              width={"100%"}
              height={"36px"}
              my={2}
              type="submit"
              isLoading={sending}
            >
              Reset Password
            </Button>
            <Flex fontSize={"9pt"} justifyContent={"center"} mt={1}>
              <Text
                position={"relative"}
                display={"flex"}
                color={"blue.500"}
                fontWeight={700}
                gap={2}
                cursor={"pointer"}
                onClick={() =>
                  setAuthModalState((prev) => ({
                    ...prev,
                    view: "login",
                  }))
                }
              >
                Log In
                <hr
                  style={{
                    height: "100%",
                    width: "1px",
                    backgroundColor: "lightblue",
                    opacity: "0.75",
                  }}
                />
              </Text>
              <Text
                color={"blue.500"}
                fontWeight={700}
                ml={2}
                cursor={"pointer"}
                onClick={() =>
                  setAuthModalState((prev) => ({
                    ...prev,
                    view: "signup",
                  }))
                }
              >
                Sign Up
              </Text>
            </Flex>
          </form>
        </>
      )}
    </Flex>
  );
};

export default ResetPassword;
