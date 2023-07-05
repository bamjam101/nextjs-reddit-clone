import { useRef } from "react";

import { Button, Flex, Image, Stack } from "@chakra-ui/react";

type ImageUploadProps = {
  selectedFile?: string;
  onSelectImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedTab: (value: string) => void;
  setSelectedFile: (value: string) => void;
};
const ImageUpload: React.FC<ImageUploadProps> = ({
  selectedFile,
  onSelectImage,
  setSelectedFile,
  setSelectedTab,
}) => {
  const selectedFileRef = useRef<HTMLInputElement | null>(null);
  return (
    <Flex
      direction={"column"}
      justify={"center"}
      align={"center"}
      width={"100%"}
    >
      {selectedFile ? (
        <>
          <Image
            src={selectedFile}
            maxWidth={"400px"}
            maxHeight={"400px"}
            alt="Selected Image"
          />
          <Stack direction={"row"} mt={4}>
            <Button height={"28px"} onClick={() => setSelectedTab("Post")}>
              Back to Post
            </Button>
            <Button
              variant={"outline"}
              height={"28px"}
              onClick={() => setSelectedFile("")}
            >
              Remove
            </Button>
          </Stack>
        </>
      ) : (
        <Flex
          justify={"center"}
          align={"center"}
          p={20}
          border={"1px dashed"}
          borderColor={"gray.200"}
          width={"100%"}
          borderRadius={4}
        >
          <Button
            variant={"outline"}
            height={"28px"}
            onClick={() => selectedFileRef?.current?.click()}
          >
            Upload
          </Button>
          <input
            type="file"
            id="file-upload"
            accept="image/x-png,image/gif,image/jpeg,image/jpg"
            hidden
            ref={selectedFileRef}
            onChange={onSelectImage}
          />
          <Image alt="Community Post Image" src={selectedFile} />
        </Flex>
      )}
    </Flex>
  );
};

export default ImageUpload;
