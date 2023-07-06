import { useEffect } from "react";

import { Community, communityState } from "@/atoms/communityAtom";
import About from "@/components/community/About";
import CreatePostLink from "@/components/community/CreatePostLink";
import CommunityNotFound from "@/components/community/NotFound";
import CommunityHeader from "@/components/header/community-header/CommunityHeader";
import PageLayout from "@/components/layout/PageLayout";
import Posts from "@/components/posts/Posts";
import { firestore } from "@/firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import { useSetRecoilState } from "recoil";
import safeJsonStringify from "safe-json-stringify";

type CommunityPage = {
  communityData: Community;
};
const CommunityPage: React.FC<CommunityPage> = ({ communityData }) => {
  const setCommunityStateValue = useSetRecoilState(communityState);

  useEffect(() => {
    setCommunityStateValue((prev) => ({
      ...prev,
      currentCommunity: communityData,
    }));
  }, [communityData]);

  if (!communityData) {
    return <CommunityNotFound />;
  }

  return (
    <>
      <CommunityHeader communityData={communityData} />;
      <PageLayout>
        <>
          <CreatePostLink />
          <Posts communityData={communityData} />
        </>
        <>
          <About communityData={communityData} />
        </>
      </PageLayout>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // get community data and pass it to client
  try {
    const communityDocRef = doc(
      firestore,
      "communities",
      context.query.communityId as string
    );

    const communityDoc = await getDoc(communityDocRef);

    return {
      props: {
        communityData: communityDoc.exists()
          ? JSON.parse(
              safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })
            )
          : "",
      },
    };
  } catch (error) {
    console.log(error, "ERROR__GETSERVERSIDEPROPS");
  }
}

export default CommunityPage;
