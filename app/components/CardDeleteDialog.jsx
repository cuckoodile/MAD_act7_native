import { View, Text, Pressable } from "react-native";
import React from "react";

import { PopupModal } from "./base/modals";
import useDeletePosts from "../utils/hooks/posts/useDeletePosts";

export default function CardDeleteDialog({ onOpenChange, isOpen, item }) {
  const deleteProductMutation = useDeletePosts();

  const handleDeleteProducts = (id) => {
    deleteProductMutation.mutate(id);
    onOpenChange(false);
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
              marginTop: "-15%"
            }}
          >
            Are you sure you want to delete post id {item?.id}?
          </Text>
          <Text
            style={{ fontSize: 16, fontWeight: "bold", textAlign: "center" }}
          >
            {item?.description}
          </Text>
        </View>

        {/* Controll Buttons */}
        <View className="flex-row gap-4">
          <Pressable
            style={{
              backgroundColor: "lightcoral",
              borderWidth: 1,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 10,
            }}
            android_ripple={{ color: "grey" }}
            onPress={() => handleDeleteProducts(item?.id)}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Delete</Text>
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
