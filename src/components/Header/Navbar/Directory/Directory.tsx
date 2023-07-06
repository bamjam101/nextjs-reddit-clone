import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuList,
  Text,
} from "@chakra-ui/react";
import Communities from "./Communities";
import useDirectory from "@/hooks/useDirectory";

const Directory: React.FC = () => {
  const { directoryState, toggleMenuOpen } = useDirectory();
  return (
    <Menu isOpen={directoryState.isOpen}>
      <MenuButton
        cursor={"pointer"}
        padding={"0px 6px"}
        borderRadius={4}
        mr={2}
        ml={{ base: 0, md: 2 }}
        _hover={{ oultine: "1px solid", outlineColor: "gray.200" }}
        onClick={toggleMenuOpen}
      >
        <Flex
          align={"center"}
          justifyContent={"space-between"}
          width={{ base: "auto", lg: "200px" }}
        >
          <Flex align={"center"}>
            {directoryState.selectedMenuItem.imageURL ? (
              <Image
                src={directoryState.selectedMenuItem.imageURL}
                borderRadius={"full"}
                height={"24px"}
                alt="Community Profile"
              />
            ) : (
              <Icon
                fontSize={24}
                mr={{ base: 1, md: 2 }}
                as={directoryState.selectedMenuItem.icon}
                color={directoryState.selectedMenuItem.iconColor}
              />
            )}
            <Flex
              ml={{ base: 1, md: 2 }}
              display={{ base: "none", lg: "flex" }}
            >
              <Text fontWeight={600} fontSize={"10pt"}>
                {directoryState.selectedMenuItem.displayText}
              </Text>
            </Flex>
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        <Communities />
      </MenuList>
    </Menu>
  );
};

export default Directory;
