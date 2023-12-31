import { Post } from "@/atoms/postsAtom";
import {
  Alert,
  AlertIcon,
  Flex,
  Icon,
  Image,
  Skeleton,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import { useState } from "react";
import { BsChat, BsDot } from "react-icons/bs";
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline,
} from "react-icons/io5";

import { AiOutlineDelete } from "react-icons/ai";
import { useRouter } from "next/router";
import { FaReddit } from "react-icons/fa";
import Link from "next/link";

export interface IPostItemProps {
  post: Post;
  userIsCreator: boolean;
  userVoteValue?: number;
  onVote: (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    post: Post,
    vote: number,
    communityId: string
  ) => void;
  onDeletePost: (post: Post) => Promise<boolean>;
  onSelectPost?: (post: Post) => void;
  homePage?: boolean;
}

const PostItem = ({
  post,
  userIsCreator,
  userVoteValue,
  onDeletePost,
  onSelectPost,
  onVote,
  homePage,
}: IPostItemProps) => {
  const router = useRouter();
  const singlePostPage = !onSelectPost;

  const [loadingImage, setLoadingImage] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();

    if (error) setError("");
    setLoadingDelete(true);
    try {
      const success = await onDeletePost(post);

      if (!success) {
        throw new Error("Failed to delete post");
      }
      console.log("Post was successfully deleted!");
      if (singlePostPage) {
        router.push(`/r/${post.communityId}`);
      }
    } catch (error: any) {
      console.log("ERROR__HANDLEDELETE", error.message);
      setError(error.message);
    } finally {
      setLoadingDelete(false);
    }
  };
  return (
    <Flex
      border={"1px solid"}
      bg={"white"}
      borderColor={singlePostPage ? "white" : "gray.300"}
      borderRadius={singlePostPage ? "4px 4px 0px 0px" : "4px"}
      _hover={{ borderColor: singlePostPage ? "none" : "gray.500" }}
      cursor={singlePostPage ? "unset" : "pointer"}
      onClick={() => onSelectPost && onSelectPost(post)}
    >
      <Flex
        direction={"column"}
        align={"center"}
        bg={singlePostPage ? "none" : "gray.100"}
        p={2}
        width={"40px"}
        borderRadius={singlePostPage ? "0" : "3px 0px 0px 3px"}
      >
        <Icon
          as={
            userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline
          }
          color={userVoteValue === 1 ? "brand.100" : "gray.400"}
          cursor={"pointer"}
          fontSize={22}
          onClick={(event) => onVote(event, post, 1, post.communityId)}
        />
        <Text fontSize={"9pt"}>{post.voteStatus}</Text>
        <Icon
          as={
            userVoteValue === -1
              ? IoArrowDownCircleSharp
              : IoArrowDownCircleOutline
          }
          color={userVoteValue === -1 ? "#4379ff" : "gray.400"}
          cursor={"pointer"}
          fontSize={22}
          onClick={(event) => onVote(event, post, -1, post.communityId)}
        />
      </Flex>

      <Flex direction={"column"} width={"100%"}>
        {error && (
          <Alert status="error">
            <AlertIcon />
            <Text>{error}</Text>
          </Alert>
        )}
        <Stack spacing={1} p={"10px"}>
          <Stack
            direction={"row"}
            spacing={0.6}
            align={"center"}
            fontSize={"9pt"}
          >
            {/* check whether on homepage or not  */}
            {homePage && (
              <>
                {post.communityImageURL ? (
                  <Image
                    src={post.communityImageURL}
                    alt="Community Profile"
                    boxSize={"10px"}
                    mr={2}
                    borderRadius={"full"}
                  />
                ) : (
                  <Icon
                    as={FaReddit}
                    fontSize={"10pt"}
                    mr={1}
                    colorRendering={"blue.500"}
                  />
                )}
                <Link href={`/r/${post.communityId}`}>
                  <Text
                    fontWeight={700}
                    _hover={{ textDecoration: "underline" }}
                    onClick={(event) => event.stopPropagation()}
                  >
                    {`r/${post.communityId}`}
                  </Text>
                </Link>
                <Icon as={BsDot} color={"gray.500"} fontSize={4} />
              </>
            )}
            <Text>
              Posted by u/{post.creatorDisplayName}{" "}
              {moment(new Date(post.createdAt?.seconds * 1000)).fromNow()}
            </Text>
          </Stack>
          <Text fontSize={"12pt"} fontWeight={600}>
            {post.title}
          </Text>
          <Text fontSize={"11pt"} mb={2} color={"gray.500"}>
            {post.body}
          </Text>
          {post.imageURL && (
            <Flex justify={"center"}>
              {loadingImage && (
                <Skeleton height={"200px"} width={"100%"} borderRadius={4} />
              )}
              <Image
                src={post.imageURL}
                display={loadingImage ? "none" : "unset"}
                maxHeight={"460px"}
                alt="Post Image"
                onLoad={() => setLoadingImage(false)}
              />
            </Flex>
          )}
        </Stack>
        <Flex ml={1} mb={0.5} color={"gray.500"}>
          <Flex
            align={"center"}
            p={"0px 10px"}
            borderRadius={4}
            _hover={{
              bg: "gray.200",
            }}
            cursor={"pointer"}
          >
            <Icon as={BsChat} mr={2} />
            <Text fontSize={"9pt"}>{post.numberOfComments}</Text>
          </Flex>
          <Flex
            align={"center"}
            p={"0px 10px"}
            borderRadius={4}
            _hover={{
              bg: "gray.200",
            }}
            cursor={"pointer"}
          >
            <Icon as={IoArrowRedoOutline} mr={2} />
            <Text fontSize={"9pt"}>Share</Text>
          </Flex>
          <Flex
            align={"center"}
            p={"8px 10px"}
            borderRadius={4}
            _hover={{
              bg: "gray.200",
            }}
            cursor={"pointer"}
          >
            <Icon as={IoBookmarkOutline} mr={2} />
            <Text fontSize={"9pt"}>Save</Text>
          </Flex>
          {userIsCreator && (
            <Flex
              align={"center"}
              p={"0px 10px"}
              borderRadius={4}
              _hover={{
                bg: "gray.200",
              }}
              cursor={"pointer"}
              onClick={(event) => handleDelete(event)}
            >
              {loadingDelete ? (
                <Spinner size={"sm"} />
              ) : (
                <>
                  <Icon as={AiOutlineDelete} mr={2} />
                  <Text fontSize={"9pt"}>Delete</Text>
                </>
              )}
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PostItem;
