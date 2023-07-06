import { communityState } from "@/atoms/communityAtom";
import About from "@/components/Community/About";
import PageLayout from "@/components/Layout/PageLayout";
import NewPostForm from "@/components/Posts/NewPostForm";
import { auth } from "@/firebase/clientApp";
import useCommunityData from "@/hooks/useCommunityData";
import { Box, Text } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";

type SubmitPostPageProps = {};
const SubmitPostPage: React.FC<SubmitPostPageProps> = () => {
  const [user] = useAuthState(auth);
  // const communityStateValue = useRecoilValue(communityState);
  const { communityStateValue } = useCommunityData();

  return (
    <PageLayout>
      <>
        <Box p={"14px 0px"} borderBottom={"1px solid"} borderColor={"white"}>
          <Text>Create a post</Text>
          {user && (
            <NewPostForm
              user={user}
              communityImageURL={communityStateValue.currentCommunity?.imageURL}
            />
          )}
        </Box>
      </>
      <>
        {communityStateValue.currentCommunity && (
          <About communityData={communityStateValue.currentCommunity} />
        )}
      </>
    </PageLayout>
  );
};

export default SubmitPostPage;
