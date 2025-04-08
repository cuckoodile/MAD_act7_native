import React from "react";
import { Image, Linking, Pressable, Text, View } from "react-native";
import { Link, router } from "expo-router";

import { dateSanitizer } from "../utils/functions";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function PostCard({ postData, editModal, handleOpenEditModal }) {
  return (
    <View
      className="gap-6 p-4"
      style={{
        transform: editModal ? "scale(.95)" : "scale(1)",
        filter: editModal ? "blur(3)" : "blur(0)",
      }}
    >
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
              <Link
                href={{
                  pathname: `/(tabs)/[id]`,
                  params: { id: post.userprofile.id },
                }}
              >
                <Text className="text-lg text-blue-700">
                  {post?.userprofile?.first_name ?? "User"}
                </Text>
              </Link>
              <Text className="text-md">{dateSanitizer(post.created_at)}</Text>
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
            <Text className="text-lg">{post.description ?? "Description"}</Text>
          </View>

          {/* Image Wrapper */}
          <Pressable
            className="w-full h-52 bg-gray-400 border overflow-hidden"
            onPress={() => Linking.openURL(post.media_link)}
            delayLongPress={200}
            onLongPress={() => handleOpenEditModal(post)}
          >
            <Image
              source={{ uri: post.thumbnail_link }}
              style={{ filter: "brightness(0.9) blur(1px)" }}
              className="size-full"
              resizeMode="cover"
            />
            <Ionicons
              name="play-circle-outline"
              color={"white"}
              size={70}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
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
  );
}
