import { SearchIcon } from "@chakra-ui/icons";
import { Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";

type SearchBarProps = {
  user?: string;
};

const SearchBar: React.FC<SearchBarProps> = ({ user }) => {
  return (
    <Flex flexGrow={1} mr={2} align={"center"}>
      <InputGroup display={"flex"} alignItems={"center"}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" mb={1} />
        </InputLeftElement>
        <Input
          type="texl"
          placeholder="Search Reddit"
          fontSize={"10pt"}
          _placeholder={{ color: "gray.500" }}
          _hover={{
            background: "white",
            border: "1px solid",
            borderColor: "blue.300",
          }}
          _focus={{
            outline: "none",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          height={"34px"}
          bg={"gray.50"}
        />
      </InputGroup>
    </Flex>
  );
};

export default SearchBar;
