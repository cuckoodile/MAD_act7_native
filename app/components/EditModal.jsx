import { View, Text } from "react-native";
import React from "react";

import BaseModal from "./base/baseModal";

const EditModal = ({ setEditModal, editModal, data }) => {
//   console.log("Selected data: ", data);

  return (
    <BaseModal onClick={setEditModal} isOpen={editModal}>
      {Array.isArray(data) ? (
        data.map((item, index) => (
          <View>
              <Text key={index} style={{fontSize: 5}}>
                {item.description ?? "No Description!"}
              </Text>
              <Text key={index} style={{fontSize: 5}}>
                {item.created_by ?? "No User!"}
              </Text>
          </View>
        ))
      ) : (
        <Text style={{ fontSize: 40 }}>
          {data?.description ?? "No Description!"}
        </Text>
      )}
    </BaseModal>
  );
};

export default EditModal;
