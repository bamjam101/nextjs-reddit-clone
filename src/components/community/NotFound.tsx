import { Button, Flex } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const CommunityNotFound = () => {
  return (
    <Flex
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      minHeight={"60svh"}
    >
      Sorry, that community does not exist or has been banned
      <Link href={"/"}>
        <Button mt={4} variant={"solid"}>
          Go to Reddit Homepage
        </Button>
      </Link>
    </Flex>
  );
};

export default CommunityNotFound;
