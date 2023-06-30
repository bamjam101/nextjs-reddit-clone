import { Flex } from "@chakra-ui/react";
import AuthButtons from "./AuthButtons";
import AuthModal from "@/components/Modals/Auth/AuthModal";

type RightContentProps = {
  user?: string;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {
  return (
    <>
      <AuthModal />
      <Flex justify={"center"} align={"center"}>
        <AuthButtons />
      </Flex>
    </>
  );
};

export default RightContent;
