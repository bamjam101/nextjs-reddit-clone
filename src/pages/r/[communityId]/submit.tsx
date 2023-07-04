import PageLayout from "@/components/Layout/PageLayout";
import NewPostForm from "@/components/Posts/NewPostForm";
import { auth } from "@/firebase/clientApp";
import { Box, Text } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";

type SubmitPostPageProps = {};
const SubmitPostPage: React.FC<SubmitPostPageProps> = () => {
  const [user] = useAuthState(auth);
  return (
    <PageLayout>
      <>
        <Box p={"14px 0px"} borderBottom={"1px solid"} borderColor={"white"}>
          <Text>Create a post</Text>
          {user && <NewPostForm user={user} />}
        </Box>
      </>
      <></>
    </PageLayout>
  );
};

export default SubmitPostPage;
