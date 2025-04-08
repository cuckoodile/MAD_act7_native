import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

import useShowUsers from "../utils/hooks/users/useShowUsers";

export default function Profile() {
  const { id } = useLocalSearchParams();
  const showUser = useShowUsers();

  const {data, isLoading} = showUser(id);
  console.log("user data", data);

  return (
    <View>
      <Text>profile user id: {id}</Text>
    </View>
  );
}
