import { View, Text, Pressable } from "react-native";
import { useState } from "react";

import { SlideModal } from "./base/modals";
import Ionicons from "@expo/vector-icons/Ionicons";

const CardSettingsModal = ({
  setEditModal,
  editModal,
  setDeleteDialog,
  data,
}) => {
  
  const handleOpenDeleteDialog = () => {
    setEditModal(false);
    setDeleteDialog(true);
  };

  return (
    <SlideModal onClick={setEditModal} isOpen={editModal}>
      <Text style={{ fontSize: 18 }}>
        {data?.description ?? "No Description!"}
      </Text>
      <View style={{ width: "100%" }}>
        <Pressable
          className="flex-row items-center gap-2"
          style={{
            paddingHorizontal: 10,
            backgroundColor: "white",
            width: "100%",
          }}
          onPress={() => handleOpenDeleteDialog()}
          android_ripple={{ color: "grey" }}
        >
          <Ionicons name="trash-outline" size={30} />
          <Text>Delete post</Text>
        </Pressable>
      </View>
    </SlideModal>
  );
};

export default CardSettingsModal;
