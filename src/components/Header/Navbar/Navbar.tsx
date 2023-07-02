import { Flex, Image } from "@chakra-ui/react";
import Directory from "./Directory/Directory";
import SearchBar from "./SearchBar";
import RightContent from "./RightContent/RightContent";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";

const Navbar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <Flex
      bg={"white"}
      height={"44px"}
      padding={"6px 12px"}
      justifyContent={{ md: "space-between" }}
    >
      <Flex align={"center"} gap={"0.5rem"} mr={{ base: 0, md: 2 }}>
        <Image
          src="/images/redditFace.svg"
          alt="Reddit Face Icon"
          height={"30px"}
        />
        <Image
          src="/images/redditText.svg"
          height={"20px"}
          alt="Reddit Title"
          display={{
            base: "none",
            md: "unset",
          }}
        />
      </Flex>
      {user && <Directory />}
      <SearchBar user={user} />
      <RightContent user={user} />
    </Flex>
  );
};

export default Navbar;
