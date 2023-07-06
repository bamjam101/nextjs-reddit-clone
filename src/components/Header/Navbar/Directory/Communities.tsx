import { useState } from "react";
import CreateCommunityModal from "@/components/Modals/Auth/CreateCommunity/CreateCommunityModal";
import { Box, Flex, Icon, MenuItem, Text } from "@chakra-ui/react";
import React from "react";
import { GrAdd } from "react-icons/gr";
import { useRecoilValue } from "recoil";
import { communityState } from "@/atoms/communityAtom";
import MenuListItem from "./MenuListItem";
import { FaReddit } from "react-icons/fa";

const Communities = () => {
  const [open, setOpen] = useState(false);
  const mySnippets = useRecoilValue(communityState).mySnippets;
  return (
    <>
      <CreateCommunityModal open={open} handleClose={() => setOpen(false)} />
      <Box mt={3} mb={4}>
        <Text
          pl={3}
          mb={1}
          fontSize={"7pt"}
          fontWeight={500}
          color={"gray.500"}
        >
          Moderating
        </Text>
        {mySnippets
          .filter((snippet) => snippet.isModerator)
          .map((snippet) => (
            <MenuListItem
              key={snippet.communityId}
              icon={FaReddit}
              displayText={`r/${snippet.communityId}`}
              link={`/r/${snippet.communityId} `}
              iconColor="blue.500"
              imageURL={snippet.imageURL}
            />
          ))}
      </Box>
      <Box mt={3} mb={4}>
        <Text
          pl={3}
          mb={1}
          fontSize={"7pt"}
          fontWeight={500}
          color={"gray.500"}
        >
          My Communities
        </Text>
        <MenuItem
          width={"100%"}
          fontSize={"10pt"}
          _hover={{ bg: "gray.100" }}
          onClick={() => setOpen(true)}
        >
          <Flex align={"center"}>
            <Icon as={GrAdd} fontSize={20} mr={2} />
            Create Community
          </Flex>
        </MenuItem>
        {mySnippets.map((snippet) => (
          <MenuListItem
            key={snippet.communityId}
            icon={FaReddit}
            displayText={`r/${snippet.communityId}`}
            link={`/r/${snippet.communityId} `}
            iconColor="blue.500"
            imageURL={snippet.imageURL}
          />
        ))}
      </Box>
    </>
  );
};

export default Communities;
