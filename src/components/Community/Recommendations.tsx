import { Community } from "@/atoms/communityAtom";
import { firestore } from "@/firebase/clientApp";
import useCommunityData from "@/hooks/useCommunityData";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useState, useEffect } from "react";

const Recommendations = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(false);
  const { communityStateValue, onJoinOrLeaveCommunity } = useCommunityData();
  const getCommunityRecommendations = async () => {
    try {
      const communityQuery = query(
        collection(firestore, "communities"),
        orderBy("numberOfMembers", "desc"),
        limit(10)
      );
      const communityDocs = await getDocs(communityQuery);
      const communities = communityDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCommunities(communities as Community[]);
    } catch (error) {
      console.log("ERROR__GETCOMMUNITYRECOMMENDATIONS", error);
    }
  };

  useEffect(() => {
    getCommunityRecommendations();
  }, []);
  return <div>Recommendations</div>;
};

export default Recommendations;
