import { Link, useFocusEffect } from "expo-router";
import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useCallback, useState } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import useGetPosts, { getPosts } from "./utils/hooks/useGetPosts";
import EditModal from "./components/EditModal";

export default function Index() {
  // const { data: postData, isLoading } = useGetPosts();
  const [postData, setPostData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editModal, setEditModal] = useState(false);
  const [editModalData, setEditModalData] = useState([]);

  // Create Post States
  const [postDescription, setPostDescription] = useState("");
  const [postMedia, setPostMedia] = useState("");
  const [postThumbnail, setPostThumbnail] = useState("");

  useFocusEffect(
    useCallback(() => {
      refreshPost();
    }, [])
  );

  // Handler Functions
  const refreshPost = async () => {
    try {
      const posts = await getPosts()
        .then((res) => setPostData(res))
        .then(() => setIsLoading(false));
    } catch (error) {
      console.error("Error fetching posts:", error);
      setIsLoading(false);
    }
  };

  const dateSanitizer = (data) => {
    return new Date(data).toLocaleString("en-US", {
      year: "numeric",
      day: "2-digit",
      month: "long",
    });
  };

  const handleOpenEditModal = (data) => {
    setEditModalData(data);
    setEditModal(true);
  };

  const handleCreatePost = () => {
    if (!postDescription || !postMedia || !postThumbnail) {
      return console.log("Please fill all fields!");
    }

    console.log(postDescription + postMedia + postThumbnail);
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
      {/* Edit Modal */}
      <EditModal
        setEditModal={setEditModal}
        editModal={editModal}
        data={editModalData}
      />

      <ScrollView
        style={{
          transform: editModal ? "scale(.95)" : "scale(1)",
          filter: editModal ? "blur(3)" : "blur(0)",
        }}
      >
        {/* CREATE POST WRAPPER */}
        <View
          className="justify-center items-center bg-gray-700/10 border p-4 gap-4"
          style={{ borderBottomWidth: 1 }}
        >
          <View className="flex-row gap-2 w-full">
            {/* Image Wrapper */}
            <View className="size-16 rounded-full overflow-hidden">
              <Image
                resizeMode="cover"
                className="w-full h-full absolute bg-black"
              />
            </View>
            <TextInput
              style={{ borderWidth: 1, padding: 10, flex: 1, borderRadius: 10 }}
              onChangeText={setPostDescription}
              value={postDescription}
              placeholder="What's on your mind?"
            />
          </View>

          <View className="flex-row gap-2">
            <TextInput
              style={{ borderWidth: 1, padding: 10, flex: 1, borderRadius: 10 }}
              onChangeText={setPostMedia}
              value={postMedia}
              placeholder="Media link"
            />
            <TextInput
              style={{ borderWidth: 1, padding: 10, flex: 1, borderRadius: 10 }}
              onChangeText={setPostThumbnail}
              value={postThumbnail}
              placeholder="Thumbnail link"
            />
          </View>

          <Pressable
            className="flex-1 justify-center items-center bg-blue-500 border rounded-md py-3 w-full"
            android_ripple={{ color: "black" }}
            onPress={() => {
              handleCreatePost();
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Post</Text>
          </Pressable>
        </View>
        {/* ------------------------- */}

        {/* CARD WRAPPER */}
        <View className="gap-6 p-4">
          {postData?.map((post) => (
            <View
              key={post.id}
              className="bg-gray-700/10 border rounded-md p-4 gap-4 h-fit"
            >
              {/* HEADER CONTAINER */}
              <View className=" flex-row h-fit justify-between items-center gap-4">
                {/* User Profile Wrapper */}
                <View className="size-16 rounded-full bg-black">
                  {/* <Image /> */}
                </View>

                {/* Text Wrapper */}
                <View className="flex-1 justify-center flex-nowrap overflow-hidden">
                  <Link href={""} className="text-lg">
                    User name
                  </Link>
                  <Text className="text-md">
                    {dateSanitizer(post.created_at)}
                  </Text>
                </View>

                {/* Option Wrapper */}
                <View className="h-14 w-10 justify-center items-center">
                  <Pressable
                    android_ripple={{ color: "black" }}
                    onPress={() => handleOpenEditModal(post)}
                  >
                    <Ionicons name="ellipsis-vertical" size={26} />
                  </Pressable>
                </View>
              </View>
              {/* ------------------------- */}

              {/* BODY CONTAINER */}
              {/* Text Wrapper */}
              <View>
                <Text className="text-lg">
                  {post.description ?? "Description"}
                </Text>
              </View>
              {/* Image Wrapper */}
              <Pressable
                className="w-full h-52 bg-gray-400 border"
                onPress={() => Linking.openURL(post.media_link)}
                delayLongPress={200}
                onLongPress={() => handleOpenEditModal(post)}
              >
                <Image
                  source={{ uri: post.thumbnail_link }}
                  className="size-full"
                  resizeMode="cover"
                />
              </Pressable>
              {/* ------------------------- */}

              {/* FOOTER CONTAINER */}
              {/* Thumbnail Link Display */}
              <Text className="">{post.thumbnail_link}</Text>

              {/* Post Status Counter Wrapper */}
              <View className="flex-row justify-between">
                {/* Like Wrapper */}
                <Pressable
                  className="gap-4 flex-row justify-center items-center"
                  android_ripple={{ color: "black" }}
                >
                  <Ionicons name="thumbs-up-outline" size={32} />
                  <Text>Like</Text>
                </Pressable>

                {/* Comment Wrapper */}
                <Pressable
                  className="gap-4 flex-row justify-center items-center "
                  style={
                    {
                      // borderLeftWidth: 1,
                      // borderRightWidth: 1,
                      // paddingLeft: 15,
                      // paddingRight: 15,
                    }
                  }
                  android_ripple={{ color: "black" }}
                >
                  <Ionicons name="chatbubbles-outline" size={32} />
                  <Text>Comment</Text>
                </Pressable>

                {/* Share Wrapper */}
                <Pressable
                  className="gap-4 flex-row justify-center items-center"
                  android_ripple={{ color: "black" }}
                >
                  <Ionicons name="arrow-redo-outline" size={32} />
                  <Text>Share</Text>
                </Pressable>
              </View>
              {/* ------------------------- */}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* <Link href={"/(tabs)"}>To Tabs</Link> */}
    </View>
  );
}
