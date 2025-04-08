import { View, Text, Pressable, TextInput } from "react-native";
import React, { useEffect, useState } from "react";

import { PopupModal } from "./base/modals";
import useUpdatePosts from "../utils/hooks/posts/useUpdatePosts";

export default function CardPatchDialog({ onOpenChange, isOpen, item }) {
  const [patchDescription, setPatchDescription] = useState("");
  const [patchMedia, setPatchMedia] = useState("");
  const [patchThumbnail, setPatchThumbnail] = useState("");

  useEffect(() => {
    setPatchDescription(item.description);
    setPatchMedia(item.media_link);
    setPatchThumbnail(item.thumbnail_link);
  }, [item]);

  const updateProductMutation = useUpdatePosts();

  const handleUpdateProducts = (id) => {
    const data = {
      description: patchDescription,
      media_link: patchMedia,
      thumbnail_link: patchThumbnail,
    };

    updateProductMutation.mutate([id, data], {
      onSuccess: () => {
        setPatchDescription("");
        setPatchMedia("");
        setPatchThumbnail("");
        onOpenChange(false);
      },
    });
  };

  return (
    <PopupModal onClick={onOpenChange} isOpen={isOpen}>
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          flex: 1,
        }}
      >
        {/* Text Wrapper */}
        <View
          style={{
            justifyContent: "space-evenly",
            height: "85%",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              marginTop: "-7%",
            }}
          >
            Editing post id {item?.id}
          </Text>

          {/* Inputs Wrapper */}
          <View style={{ width: "100%", gap: 15 }}>
            {/* Description Wrapper */}
            <View
              style={{
                flexDirection: "row",
                width: "90%",
                alignItems: "center",
                gap: 20,
              }}
            >
              <Text>Description</Text>
              <TextInput
                style={{ borderWidth: 1, flex: 1, maxHeight: 40 }}
                onChangeText={setPatchDescription}
                value={patchDescription}
                placeholder="What's on your mind?"
              />
            </View>

            {/* Media Link Wrapper */}
            <View
              style={{
                flexDirection: "row",
                width: "90%",
                alignItems: "center",
                gap: 20,
              }}
            >
              <Text>Media Link</Text>
              <TextInput
                style={{ borderWidth: 1, flex: 1, maxHeight: 40 }}
                onChangeText={setPatchMedia}
                value={patchMedia}
                placeholder="Valid URL link"
              />
            </View>

            {/* Thumbnail Link Wrapper */}
            <View
              style={{
                flexDirection: "row",
                width: "90%",
                alignItems: "center",
                gap: 20,
              }}
            >
              <Text>Thumbnail Link</Text>
              <TextInput
                style={{ borderWidth: 1, flex: 1, maxHeight: 40 }}
                onChangeText={setPatchThumbnail}
                value={patchThumbnail}
                placeholder="Valid URL link"
              />
            </View>
          </View>
        </View>

        {/* Controll Buttons */}
        <View className="flex-row gap-4">
          <Pressable
            style={{
              backgroundColor: "lightblue",
              borderWidth: 1,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 10,
            }}
            android_ripple={{ color: "grey" }}
            onPress={() => handleUpdateProducts(item?.id)}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Update</Text>
          </Pressable>
          <Pressable
            style={{
              backgroundColor: "lightgreen",
              borderWidth: 1,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 10,
            }}
            android_ripple={{ color: "grey" }}
            onPress={() => onOpenChange(false)}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </PopupModal>
  );
}
