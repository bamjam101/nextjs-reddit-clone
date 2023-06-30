import { Flex } from "@chakra-ui/react";
type RightContentProps = {
  user?: string;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {
  return (
    <>
      {/* <AuthModal /> */}
      <Flex justify={"center"} align={"center"}>
        {/* <AuthButtons /> */}
      </Flex>
    </>
  );
};

export default RightContent;
