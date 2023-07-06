import { useState } from "react";

import { Alert, AlertIcon, Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import { BiPoll } from "react-icons/bi";
import TabItem from "./TabItem";
import TextInputs from "./PostForm/TextInputs";
import ImageUpload from "./PostForm/ImageUpload";
import { User } from "firebase/auth";
import { Post } from "@/atoms/postsAtom";
import { useRouter } from "next/router";
import {
  Timestamp,
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { firestore, storage } from "@/firebase/clientApp";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import useSelectFile from "@/hooks/useSelectFile";

const formTabs = [
  {
    title: "Post",
    icon: IoDocumentText,
  },
  { title: "Images & Video", icon: IoImageOutline },
  {
    title: "Link",
    icon: BsLink45Deg,
  },
  {
    title: "Poll",
    icon: BiPoll,
  },
  {
    title: "Talk",
    icon: BsMic,
  },
];

export type TabItemType = {
  title: string;
  icon: typeof Icon.arguments;
};

type NewPostFormProps = {
  user: User;
  communityImageURL?: string;
};

const NewPostForm: React.FC<NewPostFormProps> = ({
  user,
  communityImageURL,
}) => {
  const router = useRouter();

  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const [textInputs, setTextInputs] = useState({
    title: "",
    body: "",
  });
  const { selectedFile, setSelectedFile, onSelectFile } = useSelectFile();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreatePost = async () => {
    if (error) setError("");
    const { communityId } = router.query;
    // create new post object of type Post
    const newPost: Post = {
      communityId: communityId as string,
      communityImageURL: communityImageURL || "",
      creatorId: user.uid,
      creatorDisplayName: user.email!.split("@")[0],
      title: textInputs.title,
      body: textInputs.body,
      numberOfComments: 0,
      voteStatus: 0,
      createdAt: serverTimestamp() as Timestamp,
    };
    setLoading(true);
    try {
      // store the new post in db -> firebase storage
      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);

      // check for selectedFile
      if (selectedFile) {
        // store in storage => getDownloadURL (return imageURL)
        const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
        await uploadString(imageRef, selectedFile, "data_url");

        const downloadURL = await getDownloadURL(imageRef);
        // update post doc by adding imageURL
        await updateDoc(postDocRef, {
          imageURL: downloadURL,
        });
      }
      //redirect the user back to the communityPage when post is published successfully
      router.back();
    } catch (error: any) {
      console.log("ERROR__HANDLECREATEPOST", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = event;

    setTextInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <Flex direction={"column"} bg={"white"} borderRadius={4} mt={2}>
      <Flex width={"100%"}>
        {formTabs.map((item) => (
          <TabItem
            key={item.title}
            item={item}
            selected={item.title === selectedTab}
            setSelectedTab={setSelectedTab}
          />
        ))}
      </Flex>
      <Flex p={4}>
        {selectedTab === "Post" && (
          <TextInputs
            textInputs={textInputs}
            handleCreatePost={handleCreatePost}
            onChange={onTextChange}
            loading={loading}
          />
        )}
        {selectedTab === "Images & Video" && (
          <ImageUpload
            selectedFile={selectedFile}
            onSelectImage={onSelectFile}
            setSelectedTab={setSelectedTab}
            setSelectedFile={setSelectedFile}
          />
        )}
      </Flex>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <Text>Error occurred while creating post</Text>
        </Alert>
      )}
    </Flex>
  );
};

export default NewPostForm;
