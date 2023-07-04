import { Community } from "@/atoms/communityAtom";
import CreatePostLink from "@/components/Community/CreatePostLink";
import CommunityNotFound from "@/components/Community/NotFound";
import CommunityHeader from "@/components/Header/CommunityHeader/CommunityHeader";
import PageLayout from "@/components/Layout/PageLayout";
import Posts from "@/components/Posts/Posts";
import { firestore } from "@/firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import safeJsonStringify from "safe-json-stringify";

type CommunityPage = {
  communityData: Community;
};
const CommunityPage: React.FC<CommunityPage> = ({ communityData }) => {
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
          <div>RHS</div>
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
