import { Link, useFocusEffect } from "expo-router";
import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useCallback, useState } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import VideoPlayer from "react-native-video-player";
import useGetPosts, { getPosts } from "./utils/hooks/useGetPosts";
import EditModal from "./components/EditModal";

import { videosample } from "../assets/images/videoplayback.mp4";

export default function Index() {
  // const { data: postData, isLoading } = useGetPosts();
  const [postData, setPostData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editModal, setEditModal] = useState(false);
  const [editModalData, setEditModalData] = useState([]);
  const [playingVideoId, setPlayingVideoId] = useState(null);

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

  const handlePlayVideo = (id) => {
    setPlayingVideoId((prevId) => (prevId === id ? null : id));
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-2xl font-bold">Loading...</Text>
      </View>
    );
  }

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

              {/* Media Wrapper */}
              <Pressable
                className="w-full h-52 bg-gray-400 border relative"
                onPress={() => handlePlayVideo(post.id)}
              >
                {/* {playingVideoId === post.id ? (
                  <VideoPlayer
                    source={{ uri: videosample }}
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                    }}
                    resizeMode="cover"
                    useNativeControls
                    onError={(error) => console.error("Video Error:", error)}
                  />
                ) : (
                  <Image
                    source={{ uri: post.thumbnail_link }}
                    className="size-full"
                    resizeMode="cover"
                  />
                )} */}
                <VideoPlayer
                  source={{ uri: videosample }}
                  endWithThumbnail
                  thumbnail={{
                    uri: post.thumbnail_link,
                  }}
                  onError={(e) => console.log(e)}
                  showDuration={true}
                />
              </Pressable>
              {/* ------------------------- */}

              {/* FOOTER CONTAINER */}
              {/* Thumbnail Link Display */}
              <Text className="">{post.thumbnail_link}</Text>
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
                      // borderRightWidth: 1,: 1,
                      // paddingLeft: 15,
                      // paddingRight: 15, // paddingRight: 15,
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
