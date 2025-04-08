import { View, Text, Pressable } from "react-native";
import { useState } from "react";

import { SlideModal } from "./base/modals";
import Ionicons from "@expo/vector-icons/Ionicons";

const CardSettingsModal = ({
  setEditModal,
  editModal,
  setDeleteDialog,
  setUpdateDialog,
  data,
}) => {
  
  const handleOpenDeleteDialog = () => {
    setEditModal(false);
    setDeleteDialog(true);
  };

  const handleOpenUpdateDialog = () => {
    setEditModal(false);
    setUpdateDialog(true);
  };

  return (
    <SlideModal onClick={setEditModal} isOpen={editModal}>
      <Text style={{ fontSize: 18 }}>
        {data?.description ?? "No Description!"}
      </Text>
      <View style={{ width: "100%" }}>
        {/* Delete Option */}
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

        {/* Edit Option */}
        <Pressable
          className="flex-row items-center gap-2"
          style={{
            paddingHorizontal: 10,
            backgroundColor: "white",
            width: "100%",
          }}
          onPress={() => handleOpenUpdateDialog()}
          android_ripple={{ color: "grey" }}
        >
          <Ionicons name="create-outline" size={30} />
          <Text>Edit post</Text>
        </Pressable>
      </View>
    </SlideModal>
  );
};

export default CardSettingsModal;
