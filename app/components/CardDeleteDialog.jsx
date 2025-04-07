import { View, Text } from "react-native";
import React from "react";

import { PopupModal } from "./base/modals";
import useDeletePosts from "../utils/hooks/useDeletePosts";

export default function CardDeleteDialog() {
  const deleteProductMutation = useDeletePosts();

  const handleDeleteProducts = (id) => {
    deleteProductMutation.mutate(id);
    setEditModal(false);
  };

  //   handleDeleteProducts(data?.id)

  return (
    <PopupModal>
      <Text>CardDeleteDialog</Text>
    </PopupModal>
  );
}
