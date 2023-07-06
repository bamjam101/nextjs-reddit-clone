import Head from "next/head";
import { Inter } from "next/font/google";
import PageLayout from "@/components/Layout/PageLayout";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/firebase/clientApp";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import usePosts from "@/hooks/usePosts";
import { Post, PostVote } from "@/atoms/postsAtom";
import PostLoader from "@/components/Posts/PostLoader";
import { Stack } from "@chakra-ui/react";
import CreatePostLink from "@/components/Community/CreatePostLink";
import PostItem from "@/components/Posts/PostItem";
import useCommunityData from "@/hooks/useCommunityData";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [user, loadingUser] = useAuthState(auth);
  const {
    setPostStateValue,
    postStateValue,
    onDeletePost,
    onSelectPost,
    onVote,
  } = usePosts();
  const { communityStateValue } = useCommunityData();

  const [loading, setLoading] = useState(false);
  const buildUserHomeFeed = async () => {
    // get posts from the communities that the user is part of
    setLoading(true);
    try {
      if (communityStateValue.mySnippets.length) {
        const joinedCommunityIds = communityStateValue.mySnippets.map(
          (snippet) => snippet.communityId
        );

        const postsFromCommunitiesQuery = query(
          collection(firestore, "posts"),
          where("communityId", "in", joinedCommunityIds),
          limit(10)
        );
        const postDocs = await getDocs(postsFromCommunitiesQuery);
        const posts = postDocs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPostStateValue((prev) => ({
          ...prev,
          posts: posts as Post[],
        }));
      } else {
        buildNoUserHomeFeed();
      }
    } catch (error) {
      console.log("ERROR__BUILDUSERHOMEPAGE", error);
    } finally {
      setLoading(false);
    }
  };

  const buildNoUserHomeFeed = async () => {
    setLoading(true);
    try {
      const postQuery = query(
        collection(firestore, "posts"),
        orderBy("voteStatus", "desc"),
        limit(10)
      );

      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
      }));
    } catch (error) {
      console.log("ERROR__BUILDNOUSERHOMEFEED", error);
    } finally {
      setLoading(false);
    }
  };

  const getUserPostVotes = async () => {
    try {
      const postIds = postStateValue.posts.map((post) => post.id);
      const postVotesQuery = query(
        collection(firestore, `users/${user?.uid}/postVotes`),
        where("postId", "in", postIds)
      );

      const postVoteDocs = await getDocs(postVotesQuery);
      const postVotes = postVoteDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPostStateValue((prev) => ({
        ...prev,
        postVotes: postVotes as PostVote[],
      }));
    } catch (error) {
      console.log("ERROR_GETUSERPOSTVOTES", error);
    }
  };

  useEffect(() => {
    if (communityStateValue.snippetsFetched) {
      buildUserHomeFeed();
    }
  }, [communityStateValue.snippetsFetched]);

  useEffect(() => {
    if (!user && !loadingUser) {
      buildNoUserHomeFeed();
    }
  }, [user, loadingUser]);

  useEffect(() => {
    if (user && postStateValue.posts.length) getUserPostVotes();

    return () => {
      setPostStateValue((prev) => ({
        ...prev,
        postVotes: [],
      }));
    };
  }, [user, postStateValue.posts]);
  return (
    <>
      <Head>
        <title>Reddit Clone | Home Page</title>
        <meta
          name="description"
          content="A fullstack Reddit implementation using NextJS Framework"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        <>
          <CreatePostLink />
          {loading ? (
            <PostLoader />
          ) : (
            <Stack>
              {postStateValue?.posts.map((post) => (
                <PostItem
                  key={post.id}
                  post={post}
                  onVote={onVote}
                  onSelectPost={onSelectPost}
                  onDeletePost={onDeletePost}
                  userVoteValue={
                    postStateValue.postVotes.find(
                      (vote) => vote.postId === post.id
                    )?.voteValue
                  }
                  userIsCreator={user?.uid === post.creatorId}
                  homePage
                />
              ))}
            </Stack>
          )}
        </>
        <></>
      </PageLayout>
    </>
  );
}
