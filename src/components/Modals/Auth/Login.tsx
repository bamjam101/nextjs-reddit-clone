import { useState } from "react";

import { authModalState } from "@/atoms/authModalAtoms";
import { useSetRecoilState } from "recoil";

import { Button, Flex, Input, Text } from "@chakra-ui/react";

export interface ILoginProps {}

const Login: React.FC<ILoginProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setLoginForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));

  const onSubmit = () => {};
  return (
    <form onSubmit={onSubmit}>
      <Input
        name="email"
        placeholder="Email"
        type="email"
        mb={2}
        onChange={onChange}
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
      <Input
        name="password"
        placeholder="Password"
        type="password"
        mb={2}
        onChange={onChange}
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
      <Button width={"100%"} height={"36px"} my={2} type="submit">
        Log In
      </Button>
      <Flex fontSize={"9pt"} justifyContent={"center"}>
        <Text mr={1}>New here?</Text>
        <Text
          color={"blue.500"}
          fontWeight={700}
          cursor={"pointer"}
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: "signup",
            }))
          }
        >
          SIGN UP
        </Text>
      </Flex>
    </form>
  );
};

export default Login;
