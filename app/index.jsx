import {
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useState } from "react";


import useGetPosts from "./utils/hooks/posts/useGetPosts";
import usePostPosts from "./utils/hooks/posts/usePostPosts";

import CardSettingsModal from "./components/CardSettingsModal";
import CardDeleteDialog from "./components/CardDeleteDialog";
import CardPatchDialog from "./components/CardPatchDialog";
import PostCard from "./components/PostCard";
import CreatePostModal from "./components/CreatePostModal";

export default function Index() {
  // Query Data
  const { data: postData, isLoading } = useGetPosts();

  // Create Post States
  const [postDescription, setPostDescription] = useState("");
  const [postMedia, setPostMedia] = useState("");
  const [postThumbnail, setPostThumbnail] = useState("");

  // Card Settings States
  const [editModal, setEditModal] = useState(false);
  const [editModalData, setEditModalData] = useState([]);

  // Delete Card States
  const [deleteDialog, setDeleteDialog] = useState(false);

  // Update Card States
  const [updateDialog, setUpdateDialog] = useState(false);

  // Hooks
  const createPostMutation = usePostPosts();

  const handleOpenEditModal = (data) => {
    setEditModalData(data);
    setEditModal(true);
  };

  const handleCreatePost = async () => {
    if (!postDescription || !postMedia || !postThumbnail) {
      console.log("Please fill all fields!");
      alert("Please fill all fields!");
      return;
    }

    const data = {
      description: postDescription,
      media_link: postMedia,
      thumbnail_link: postThumbnail,
      created_by: 1,
    };

    createPostMutation.mutate(data, {
      onSuccess: () => {
        setPostDescription("");
        setPostMedia("");
        setPostThumbnail("");
      },
    });
  };

  // Renders if loading state is on going (true)
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-2xl font-bold">Loading...</Text>
      </View>
    );
  }

  // Renders if no data is available
  if (postData == null || postData.length == 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-2xl font-bold">NO DATA!</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      {/* Modals */}
      {/* Card Settings Modal */}
      <CardSettingsModal
        setEditModal={setEditModal}
        setDeleteDialog={setDeleteDialog}
        setUpdateDialog={setUpdateDialog}
        editModal={editModal}
        data={editModalData}
      />

      {/* Delete Card Dialog */}
      <CardDeleteDialog
        onOpenChange={setDeleteDialog}
        isOpen={deleteDialog}
        item={editModalData}
      />

      {/* Update Card Dialog */}
      <CardPatchDialog
        onOpenChange={setUpdateDialog}
        isOpen={updateDialog}
        item={editModalData}
      />

      <ScrollView>
        {/* CREATE POST WRAPPER */}
        <CreatePostModal
          postDescription={postDescription}
          setPostDescription={setPostDescription}
          postMedia={postMedia}
          setPostMedia={setPostMedia}
          postThumbnail={postThumbnail}
          setPostThumbnail={setPostThumbnail}
          handleCreatePost={handleCreatePost}
          editModal={editModal}
        />
        {/* ------------------------- */}

        {/* CARD WRAPPER */}
        <PostCard
          postData={postData}
          editModal={editModal}
          handleOpenEditModal={handleOpenEditModal}
        />
      </ScrollView>

      {/* <Link href={"/(tabs)"}>To Tabs</Link> */}
    </View>
  );
}
