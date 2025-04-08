import React from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";

export default function CreatePostModal({
  postDescription,
  setPostDescription,
  postMedia,
  setPostMedia,
  postThumbnail,
  setPostThumbnail,
  handleCreatePost,
  editModal
}) {
  return (
    <View
      className="justify-center items-center bg-gray-700/10 border-b p-4"
      style={{ borderBottomWidth: 1 }}
    >
      <View
        style={{
          gap: 15,
          transform: editModal ? "scale(.95)" : "scale(1)",
          filter: editModal ? "blur(3)" : "blur(0)",
        }}
      >
        {/* Profile and Description */}
        <View className="flex-row gap-2 w-full">
          {/* Image Wrapper */}
          <View className="size-16 rounded-full overflow-hidden">
            <Image
              resizeMode="cover"
              className="w-full h-full absolute bg-black"
            />
          </View>
          <TextInput
            style={{
              borderWidth: 1,
              padding: 10,
              flex: 1,
              borderRadius: 10,
            }}
            onChangeText={setPostDescription}
            value={postDescription}
            placeholder="What's on your mind?"
          />
        </View>

        {/* Media and Thumbnail Link */}
        <View className="flex-row gap-2 w-full">
          <TextInput
            style={{
              borderWidth: 1,
              padding: 10,
              flex: 1,
              borderRadius: 10,
            }}
            onChangeText={setPostMedia}
            value={postMedia}
            placeholder="Media link"
          />
          <TextInput
            style={{
              borderWidth: 1,
              padding: 10,
              flex: 1,
              borderRadius: 10,
            }}
            onChangeText={setPostThumbnail}
            value={postThumbnail}
            placeholder="Thumbnail link"
          />
        </View>
        <Pressable
          className="justify-center items-center bg-blue-500 border rounded-md py-3"
          android_ripple={{ color: "black" }}
          onPress={() => {
            handleCreatePost();
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Post</Text>
        </Pressable>
      </View>
    </View>
  );
}
