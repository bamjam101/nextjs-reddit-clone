import { Community } from "@/atoms/communityAtom";
import { Box, Button, Flex, Icon, Image, Text } from "@chakra-ui/react";

import useCommunityData from "@/hooks/useCommunityData";

import { FaReddit } from "react-icons/fa";

type CommunityHeaderProps = {
  communityData: Community;
};
const CommunityHeader: React.FC<CommunityHeaderProps> = ({ communityData }) => {
  const { communityStateValue, onJoinOrLeaveCommunity, loading } =
    useCommunityData();

  const isJoined = !!communityStateValue.mySnippets.find(
    (item) => item.communityId === communityData.id
  );
  return (
    <Flex
      direction={"column"}
      width={"100%"}
      alignItems={"center"}
      height={"146px"}
    >
      <Box width={"100%"} height={"50%"} bg={"blue.400"} />
      <Flex width={"100%"} justify={"center"} bg={"white"} flexGrow={1}>
        <Flex width={"95%"} maxWidth={"850px"} align={"center"}>
          {communityStateValue.currentCommunity?.imageURL ? (
            <Image
              src={communityStateValue.currentCommunity.imageURL}
              borderRadius={"full"}
              boxSize={"60px"}
              position={"relative"}
              top={-3}
              bg={"white"}
              color={"blue.500"}
              border={"4px solid white"}
              alt="Community Profile"
            />
          ) : (
            <Icon
              as={FaReddit}
              fontSize={64}
              position={"relative"}
              top={-3}
              border={"4px solid white"}
              borderRadius={"50%"}
              color={"blue.500"}
            />
          )}
          <Flex>
            <Flex direction={"column"} mr={6}>
              <Text fontWeight={700} fontSize={"16pt"}>
                {communityData.id}
              </Text>
              <Text fontWeight={600} fontSize={"10pt"} color={"gray.400"}>
                r/{communityData.id}
              </Text>
            </Flex>
            <Button
              variant={isJoined ? "outline" : "solid"}
              height={"30px"}
              px={6}
              onClick={() => onJoinOrLeaveCommunity(communityData, isJoined)}
              isLoading={loading}
            >
              {isJoined ? "Joined" : "Join"}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CommunityHeader;
