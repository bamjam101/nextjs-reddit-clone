import PageLayout from "@/components/Layout/PageLayout";
import NewPostForm from "@/components/Posts/NewPostForm";
import { Box, Text } from "@chakra-ui/react";

type SubmitPostPageProps = {};
const SubmitPostPage: React.FC<SubmitPostPageProps> = () => {
  return (
    <PageLayout>
      <>
        <Box p={"14px 0px"} borderBottom={"1px solid"} borderColor={"white"}>
          <Text>Create a post</Text>
          <NewPostForm />
        </Box>
      </>
      <></>
    </PageLayout>
  );
};

export default SubmitPostPage;
