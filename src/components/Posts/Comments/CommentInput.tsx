import AuthButtons from "@/components/Header/Navbar/RightContent/AuthButtons";
import { Button, Flex, Text, Textarea } from "@chakra-ui/react";
import { User } from "firebase/auth";
import React from "react";
type CommentInputProps = {
  commentText: string;
  setCommentText: (value: string) => void;
  user: User;
  createLoading: boolean;
  onCreateComment: (commentText: string) => void;
};
const CommentInput: React.FC<CommentInputProps> = ({
  commentText,
  onCreateComment,
  user,
  setCommentText,
  createLoading,
}) => {
  return (
    <Flex direction={"column"} position={"relative"}>
      {user ? (
        <>
          <Text mb={1}>
            Comment as{" "}
            <span style={{ color: "#3182CE" }}>
              {user?.displayName || user?.email?.split("@")[0]}
            </span>
          </Text>
          <Textarea
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
            placeholder="What are your thoughts?"
            fontSize={"10pt"}
            minHeight={"150px"}
            resize={"none"}
            borderRadius={4}
            pb={10}
            _placeholder={{ color: "gray.500" }}
            _focus={{
              outline: "none",
              bg: "white",
              border: "1px solid black",
            }}
          ></Textarea>
          <Flex
            position={"absolute"}
            left={"1px"}
            right={"1px"}
            bottom={"1px"}
            zIndex={"999"}
            justify={"flex-end"}
            bg={"gray.100"}
            p={"6px 8px"}
            borderRadius={"0px 0px 4px 4px"}
          >
            <Button
              height={"26px"}
              disabled={!commentText.length}
              isLoading={createLoading}
              onClick={() => onCreateComment(commentText)}
            >
              {" "}
              Comment
            </Button>
          </Flex>
        </>
      ) : (
        <>
          <Flex
            align={"center"}
            justify={"space-between"}
            borderRadius={2}
            border={"1px solid"}
            borderColor={"gray.100"}
            p={4}
          >
            <Text fontWeight={600}>Log in or Sign up to leave a comment</Text>
            <AuthButtons />
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default CommentInput;
