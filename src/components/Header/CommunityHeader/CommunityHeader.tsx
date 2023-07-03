import { Community } from "@/atoms/communityAtom";
import { Box, Button, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { FaReddit } from "react-icons/fa";

type CommunityHeaderProps = {
  communityData: Community;
};
const CommunityHeader: React.FC<CommunityHeaderProps> = ({ communityData }) => {
  const isJoined = false;
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
          {communityData?.imageURL ? (
            <Image alt="Community Profile" />
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
              onClick={() => {}}
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
